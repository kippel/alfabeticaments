from fastapi import APIRouter
from app.database.deps import db_dependency, user_dependency
from app.lib import serializes, serializes_list
from app.workouts.courser import user_request_id_user
from app.schemas import HoraDosType, HoraTresType

router = APIRouter(prefix="/hora", tags=["hora"])

@router.post("/hora_uns")
async def get_hora_uns(user: user_dependency, db: db_dependency ):
    
    courses = await user_request_id_user(user, db)
    
    hora_un = db.hora_uns.find(
        {
          "hora_courses": courses["courses"],
          "user_id": str(user["id"])
        }
    )

    hora_uns = await serializes_list(hora_un)
    
    return {"hora_uns" : hora_uns}

'''
 { 
      "hora_numbro_uns" : 1,
      "hora_numbro_dos" : 1,
      "hora_courses" : "ca",
      "user_id" = str(user_id)
 }
'''
@router.post("/hora_dos")
async def get_hora_dos(user: user_dependency, db: db_dependency, payload: HoraDosType ):

    courses = await user_request_id_user(user, db)

    hora_dos = db.hora_dos.find(
        {
          "hora_numbro_uns" : payload.hora_numbro_uns,
          "hora_courses": courses["courses"],
          "user_id": str(user["id"])
        }
    )

    hora = await serializes_list(hora_dos)

    return {"hora_dos": hora}


@router.post("/hora_tres")
async def get_hora_tres(user: user_dependency, db: db_dependency, payload: HoraTresType ):
    
    courses = await user_request_id_user(user, db)

    hora_dos = db.hora_tres.find({
        "hora_numbro_uns" : payload.hora_numbro_uns,
        "hora_numbro_dos" : payload.hora_numbro_dos,
        "hora_courses": courses["courses"],
        "user_id": str(user["id"])
    })

    hora = await serializes_list(hora_dos)

    


    return { "hora_tres" : hora}