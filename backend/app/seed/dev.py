from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
from app.database.deps import bcrypt_context
from .abcs import abcs, courser, hora

async def seed_user(db):
    await db.users.delete_many({})
    # Exemple de col·lecció i documents

    qwerty = bcrypt_context.hash("qwerty")

    users = {"username": "admin", "password": qwerty}
    
    #await db.users.insert_many(users)
    user = await db.users.insert_one(users)
    
    return user.inserted_id


MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:27017/mydatabase")
async def seed_db():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client.get_default_database()
    
    user_id = await seed_user(db)
    
    await abcs(db, user_id)    
    await hora(db, user_id)
    await courser(db)
    

    


    print("Seed completat!")
    client.close()  # tancar la connexió

def seed():
    asyncio.run(seed_db())
