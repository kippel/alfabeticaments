from fastapi import APIRouter
from app.schemas import AbcRequest
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
            r = [{"user_abc_list": 1} for _ in range(len(res["abc_list"]))]
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
            ch.update(prog)

    return {"abcedaris": abcedaris}



'''
@router.post("/abcedaris")
async def get_abcedaris(user: user_dependency, db: db_dependency, payload: AbcRequest):
    
    abcedaris_abc = db.abcedaris_abc.find({"courses": payload.coursesId})
    
    abcedaris = [serializes(abcedari) async for abcedari in abcedaris_abc]
    
    for res in abcedaris:
        
        #print(res)

        count = await db.user_abc_list.count_documents(
            {"courses": payload.coursesId,
             "user_id": user["id"],
             "title_name" : res["title_name"]  })
        if count == 0:
            
            r = [[{"user_abc_list": 1}] for _ in range(len(res["title_name"]))]

            cour_create = {
                "courses": payload.coursesId,
                "user_id": user["id"],
                "title_name" : res["title_name"],
                "numbro" : r
            }
            await db.user_abc_list.insert_one(cour_create)
        


        rect = await db.user_abc_list.find(
            {
                "courses": payload.coursesId,
                "user_id": user["id"],
                "title_name": res["title_name"],
            }
            ).to_list(length=1)
        if rect:
            for i, ch in enumerate(res["abc_list"]):
                ch.update(rect[0]['numbro'][i])
    
    return { "abcedaris" : abcedaris}
'''