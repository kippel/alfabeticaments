from fastapi import APIRouter
from app.workouts.courser import user_request_id_user
from app.database.deps import db_dependency, user_dependency
from app.lib import serializes_list
#from app.workouts.gtts_bar import hora_gtts
import logging

router = APIRouter(prefix="/tests", tags=["tests"])

@router.post("/hora")
async def test_hora(user: user_dependency, db: db_dependency):

    #courses = await user_request_id_user(user, db)

    h = db.hora_tres.find({"user_id": str(user["id"])})
    print(h)

    horas = await serializes_list(h)
    for id, r in enumerate(horas):
        logging.debug(r['hora_expressio'])
        logging.debug(r['hora_voice_mp3'])

        #hora_gtts(r['hora_expressio'],r['hora_voice_mp3']) # type: ignore
        
        if id >= 2:
            break
    
        
    return {"ok" : "bar"}