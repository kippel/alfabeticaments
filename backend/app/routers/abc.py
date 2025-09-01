from fastapi import APIRouter
from app.schemas import AbcRequest
from app.database.deps import db_dependency, user_dependency
from app.lib import serializes


router = APIRouter(prefix="/abc", tags=["abc"])

@router.post("/")
async def get_abcedaris(user: user_dependency, db: db_dependency, payload: AbcRequest):
    
    abcedaris_abc = db.abcedaris_abc.find({"courses": payload.coursesId})
    
    abcedaris = [serializes(abcedari) async for abcedari in abcedaris_abc]
    
    return { "abcedaris" : abcedaris}