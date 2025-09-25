from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import db
from app.database.models import Users
from .routers import auth, courses, abc, hora
from app.lib import serializes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.50.16:3000","http://localhost:3000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)



@app.post("/")
async def root():

    users_cursor = db.users.find()
    
    # Convertim a llista i serialitzem ObjectIds
    users: List[dict] = [serializes(user) async for user in users_cursor]

    
    abcedaris_abc = db.abcedaris_abc.find()
    courses = db.courses.find()
    print(courses)

    courses_all = [serializes(cour) async for cour in courses]
    abcedaris = [serializes(abcedari) async for abcedari in abcedaris_abc]
    return {"message": "Hello from FastAPI + MongoDB", "user" : users, "courses" : courses_all, "abcedaris" : abcedaris} 


app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(abc.router)
app.include_router(hora.router)