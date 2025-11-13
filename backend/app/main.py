from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import db
from app.database.models import Users
from app.lib import serializes_list, serializes
from typing import List
from .routers import auth, courses, hora
#from app.lib import serializes
import logging

logging.basicConfig(
    level=logging.DEBUG,  # Mostra DEBUG, INFO, WARNING, ERROR i CRITICAL
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.50.16:3000","http://localhost:3000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)


#@app.get("/health")
#async def health_check():
#    return {"status": "ok"}


@app.get("/")
async def root():
      
    user = db.users.find()
    
    users: List[dict] = await serializes_list(user)

    
    return {"message": users} 


app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(hora.router)