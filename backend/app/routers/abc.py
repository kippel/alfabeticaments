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
                        
    abcedaris_cursor = db.abcedaris_abc.find(
        {
            "courses": payload.coursesId,
          "user_id": str(user["id"])
          
        }
    )

    abcedaris = [serializes(abcedari) async for abcedari in abcedaris_cursor]
    
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
            "abc_list.abc_id": payload.id_abc,
            "user_id": user["id"]
        },
        {
            "abc_list.$": 1  # Només retorna l’element de l’array que fa match
        }
    )

    if not abcedaris_cursor or "abc_list" not in abcedaris_cursor:
         return {"error": "No s'ha trobat l'element"}
    
    abc_item = abcedaris_cursor["abc_list"][0]
    print(abc_item['abc_list'])
    #print(abc_item)
    abc_lists = await db.abc_list.find_one(
        {
            "abc_id": payload.id_abc,
            "courses": payload.coursesId,
            "palabras": payload.palabras,
            "user_id": user["id"]
            
        }
    )
    
    abc_list = serializes(abc_lists)

    red = [e for e in abc_list['abc_list'] if e['abc_list'] == abc_item['abc_list']]
    
    return {"abc_list" : red}

 

