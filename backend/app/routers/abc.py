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
          "abc_courses": payload.abc_courses,
          "user_id": str(user["id"])
        }
    )

    abcedaris = [serializes(abcedari) async for abcedari in abcedaris_cursor]
    
    return {"abcedaris": abcedaris}



@router.post('/abcedaris_list')
async def get_abced_list(user: user_dependency, db: db_dependency, payload: AbcListRequest):
    '''
    monosillabs
    '''
    
    abcedaris_cursor = await db.abcedaris_abc.find_one(
        {
            "abc_courses": payload.abcedaris_courses,
            "abc_palabras": payload.abcedaris_palabras,
            "abc_list.abc_id": payload.abcedaris_list,
            "user_id": user["id"]
        },
        {
            "abc_list.$": 1  # Només retorna l’element de l’array que fa match
        }
    )

    if not abcedaris_cursor or "abc_list" not in abcedaris_cursor:
         return {"error": "No s'ha trobat l'element"}
    

    #print(abcedaris_cursor)

    abc_list = serializes(abcedaris_cursor)
    
    abc_item = abc_list["abc_list"][0]

    ''''
    "abcedaris_id" : 0,                       # abcedaris_list
    "abcedaris_courses": "ca",                # abcedaris_courses
    "abcedaris_palabras" : "monosillabs",     # abcedaris_palabras
    
    
    '''
    
    abc_lists = await db.abc_list.find_one(
        {
            "abcedaris_id": payload.abcedaris_list,
            "abcedaris_courses": payload.abcedaris_courses,
            "abcedaris_palabras": payload.abcedaris_palabras,
            "user_id": user["id"]
            
        }
    )
    
    abc_list = serializes(abc_lists)

    red = [e for e in abc_list['abcedaris_list'] if e['abcedaris_list_id'] == abc_item['abc_lists']]
    #print(abc_list)
    
    return {"abc_list" :abc_list['abcedaris_list']}

 

