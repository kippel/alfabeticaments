import pytest
from motor.motor_asyncio import AsyncIOMotorClient
from api import database
from api.main import app
from fastapi.testclient import TestClient

@pytest.fixture(scope="session")
def mongo_url():
    # conecta al servicio Mongo ya levantado por docker-compose
    return "mongodb://mongo:27017/testdb"

@pytest.fixture(autouse=True)
async def mock_db(monkeypatch, mongo_url):
    client = AsyncIOMotorClient(mongo_url)
    db = client.get_default_database()
    monkeypatch.setattr(database, "db", db)

    #await db_bar(db)

    yield db
    client.close()

@pytest.fixture
def test_app():


    with TestClient(app) as client:
        yield client