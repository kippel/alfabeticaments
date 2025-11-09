from app.database.deps import db_dependency, user_dependency
from app.lib import serializes

class UserRequest:
    def __init__(self, user: user_dependency, db: db_dependency):
        self.user = user
        self.db = db
        

    def courses_data(self, user_courses: dict):
        return {
            "courses_title": user_courses.get("courses_title"),
            "image_src": user_courses.get("image_src"),
            "courses": user_courses.get("courses")
        }


async def user_request_id_user(user: user_dependency, db: db_dependency):
    n = UserRequestId(user, db)
    courses = await n.courses()
    data = n.courses_data(courses)
    
    return data




class UserRequestId(UserRequest):
    async def courses(self):
        user_courses = await self.db["user_courses"].find_one({"user_id": self.user["id"]})

        if not user_courses:
            cour_create = {
                "courses_title": "Catala",
                "image_src": "/flag/Catala.svg",
                "courses": "ca",
                "user_id": self.user["id"]
            }
            result = await self.db["user_courses"].insert_one(cour_create)
            user_courses = {**cour_create, "_id": result.inserted_id}

        return user_courses

    async def abc_list(self):
        cursor = self.db["user_abc_list"].find({"user_id": self.user["id"]})
        return [ serializes(doc) async for doc in cursor]


class UserCreateUpdate(UserRequest):
    async def courses(self, courses_all: dict):
        user_courses = await self.db["user_courses"].find_one({"user_id": self.user["id"]})

        if not user_courses:
            ## todo
            cour_new = {
                "courses_title": courses_all["courses_title"],
                "image_src": courses_all["image_src"],
                "courses": courses_all["courses"],
                "user_id": self.user["id"]
            }
            result = await self.db["user_courses"].insert_one(cour_new)
            return {**cour_new, "_id": result.inserted_id}
        else:
            
            await self.db["user_courses"].update_one(
                {"user_id": self.user["id"]},
                {"$set": {
                    "courses_title": courses_all["title"],
                    "image_src": courses_all["image_src"],
                    "courses": courses_all["courses"]
                }}
            )
            return await self.db["user_courses"].find_one({"user_id": self.user["id"]})
