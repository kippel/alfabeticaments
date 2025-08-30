from fastapi import APIRouter, HTTPException
from api.database.deps import db_dependency, user_dependency
from api.schemas import CoursesRequest
from api.workouts.courser import UserRequestId, UserCreateUpdate

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("/red")
async def courses_red(user: user_dependency, db: db_dependency): 
    courses_all = [doc async for doc in db["courses"].find()]

    return { "courses" : courses_all}


'''
    GET /courses
'''
@router.get("/")
async def courses(user: user_dependency, db: db_dependency):
    courses_all = [doc async for doc in db["courses"].find()]

    n = UserRequestId(user, db)
    courses = await n.courses()
    data = n.courses_data(courses)

    return {"languages": courses_all, "user_courses": data}


'''
    POST /courses
    { "coursesId": "ca" }
'''
@router.post("/")
async def courses_post(payload: CoursesRequest, user: user_dependency, db: db_dependency):
    courses_all = await db["courses"].find_one({"courses": payload.coursesId})

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
