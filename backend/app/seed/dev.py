from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
from app.database.deps import bcrypt_context
from .abcs import abcs, courser

async def user(db):
    await db.users.delete_many({})
    # Exemple de col·lecció i documents

    qwerty = bcrypt_context.hash("qwerty")

    users = [
        {"username": "kippel", "password": qwerty},
    ]
    await db.users.insert_many(users)

MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:27017/mydatabase")
async def seed_db():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client.get_default_database()
    
    await user(db)
    
    await abcs(db)    
    await courser(db)

    print("Seed completat!")
    client.close()  # tancar la connexió

def seed():
    asyncio.run(seed_db())
