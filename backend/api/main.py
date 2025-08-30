from fastapi import FastAPI

from api.database.database import db
from api.database.models import Users
from .routers import auth, courses

app = FastAPI()




@app.post("/")
async def root():
    
    return {"message": "Hello from FastAPI + MongoDB"}


app.include_router(auth.router)
app.include_router(courses.router)
