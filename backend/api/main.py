from fastapi import FastAPI

from api.database import db
from api.schemas import User
from api.models import Users
from .routers import auth

app = FastAPI()




@app.post("/")
async def root():
    cursor = db.user.find()
    
    n = Users()
    print("red")
    users = await n.usersEntity(cursor)   
    return {"user": users}




app.include_router(auth.router)
