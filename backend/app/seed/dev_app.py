import os
import asyncio
import hashlib
from app.database.deps import bcrypt_context


MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:27017/mydatabase")


async def seed_user(db):
    await db.users.delete_many({})
    # Exemple de col·lecció i documents

    #raw_pw = "qwerty"
    #short_pw = hashlib.sha256(raw_pw.encode()).hexdigest()

    qwerty = bcrypt_context.hash("qwerty")

    users = {"username": "admin", "password": qwerty}
    
    #await db.users.insert_many(users)
    user = await db.users.insert_one(users)
    
    return user.inserted_id


async def dev_app():
    """Seed development data.

    This does a lazy import of motor so importing this module doesn't fail
    in environments that don't have the `motor` package installed (for
    example when running unit tests that don't need Mongo).
    """
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
    except Exception as exc:  # ImportError or other import-time issues
        print(
            "motor is not available; skipping DB seeding. To enable seeding,"
            " install motor (pip install motor) or set up a MongoDB client."
        )
        # Optionally re-raise if you want the failure to be fatal
        return

    client = AsyncIOMotorClient(MONGO_URI)
    
    db = client.get_default_database()
    print("dev Seeding development application data...")
   
    user_id = await seed_user(db)

    client.close()


def seed():
    asyncio.run(dev_app())