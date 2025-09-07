from fastapi import APIRouter
from app.schemas import (
    AbcRequest,
    AbcListRequest
)
from app.database.deps import db_dependency, user_dependency
from app.lib import serializes
from bson import ObjectId

router = APIRouter(prefix="/abc", tags=["abc"])

@router.post("/abcedaris")
async def get_abcedaris(user: user_dependency, db: db_dependency, payload: AbcRequest):
    # Get all abcedaris for the course
    abcedaris_cursor = db.abcedaris_abc.find({"courses": payload.coursesId})
    abcedaris = [serializes(abcedari) async for abcedari in abcedaris_cursor]

    # Fetch all user_abc_list entries for this course/user
    user_lists = await db.user_abc_list.find({
        "courses": payload.coursesId,
        "user_id": user["id"],
    }).to_list(length=None)

    # Index them by title_name for quick lookup
    user_map = {u["title_name"]: u for u in user_lists}

    for res in abcedaris:
        # If user progress does not exist, create it
        if res["title_name"] not in user_map:
            r = [{"user_abc_list": 1, "number_bar" : 1} for _ in range(len(res["abc_list"]))]
            cour_create = {
                "courses": payload.coursesId,
                "user_id": user["id"],
                "title_name": res["title_name"],
                "numbro": r,
            }
            await db.user_abc_list.insert_one(cour_create)
            user_map[res["title_name"]] = cour_create

        # Merge progress into abc_list
        numbro = user_map[res["title_name"]]["numbro"]
        for ch, prog in zip(res["abc_list"], numbro):
            
            red = { 'user_abc_list' :prog['user_abc_list'] }
            ch.update(red)

    return {"abcedaris": abcedaris}



@router.post('/abced_list')
async def get_abced_list(user: user_dependency, db: db_dependency, payload: AbcListRequest):
    '''
    monosillabs
    '''
    
    abcedaris_cursor = await db.abcedaris_abc.find_one(
        {
            "courses": payload.coursesId,
            "palabras": payload.palabras,
            "abc_list.abc_id": payload.id_abc
        },
        {
            "abc_list.$": 1  # Només retorna l’element de l’array que fa match
        }
    )

    if not abcedaris_cursor or "abc_list" not in abcedaris_cursor:
         return {"error": "No s'ha trobat l'element"}
    
    ## todo
    # "number": 1,
    # "number_bar": 1,
    # "abc_dos_id": 1, 
    abc_lists = await db.abc_list.find_one({
        "abc_id" : payload.id_abc,
        "courses": payload.coursesId,
        "palabras" : payload.palabras
    })

    
    abc_list = serializes(abc_lists)
   
    return {"abc_list" : abc_list}
