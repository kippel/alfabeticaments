from fastapi import FastAPI

from app.database.database import db
from app.database.models import Users
from .routers import auth, courses, abc
from app.lib import serializes

app = FastAPI()


''' 
def serialize_user(user: dict) -> dict:
    """Converteix l'_id de MongoDB a string per JSON."""
    return {**user, "_id": str(user["_id"])}
'''

@app.post("/")
async def root():

    users_cursor = db.users.find()
    
    # Convertim a llista i serialitzem ObjectIds
    users: List[dict] = [serializes(user) async for user in users_cursor]

    
    #abcedaris_abc = db.abcedaris_abc.find()
    courses = db.courses.find()
    print(courses)

    courses_all = [serializes(cour) async for cour in courses]
    #abcedaris = [serialize_user(abcedari) async for abcedari in abcedaris_abc]
    return {"message": "Hello from FastAPI + MongoDB", "user" : users, "courses" : courses_all} 


app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(abc.router)