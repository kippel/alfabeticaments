from fastapi import APIRouter, HTTPException
from app.database.deps import db_dependency, user_dependency
from app.schemas import CoursesRequest
from app.workouts.courser import UserRequestId, UserCreateUpdate
from app.lib import serializes

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("/blue")
async def courses_blue(user: user_dependency, db: db_dependency): 
    courses_all = [serializes(doc) async for doc in db["courses"].find()]
    return { "courses" : courses_all}


'''
    GET /courses

    POST /courses/1

'''
@router.post("/uns")
async def courses(user: user_dependency, db: db_dependency):
    print('oooooooooooooooooooooooo')
    courses_all = [serializes(doc) async for doc in db["courses"].find()]

    n = UserRequestId(user, db)
    courses = await n.courses()
    data = n.courses_data(courses)

    return {"languages": courses_all, "user_courses": data}


'''
    POST /courses
    { "coursesId": "ca" }
'''
@router.post("/dos")
async def courses_post(payload: CoursesRequest, user: user_dependency, db: db_dependency):
    courses_all = await db["courses"].find_one({"courses": payload.coursesId})
    print(courses_all)
    
    if not courses_all:
        raise HTTPException(status_code=404, detail="Course not found")

    n = UserCreateUpdate(user, db)
    courses = await n.courses(courses_all)
    data = n.courses_data(courses)
    
    return {"user_courses": data}


@router.get("/red")
async def courses_red(user: user_dependency, db: db_dependency):
    n = UserRequestId(user, db)
    courses = await n.courses()
    data = n.courses_data(courses)

    return {"courses": data}
