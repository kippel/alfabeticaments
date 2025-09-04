import pytest
import asyncio
from httpx import AsyncClient, ASGITransport
from motor.motor_asyncio import AsyncIOMotorClient
from app.main import app

@pytest.fixture(scope="function")
def event_loop():
    """Create an instance of the default event loop for each test."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="session")
def mongo_url():
    # conecta al servicio Mongo ya levantado por docker-compose
    return "mongodb://mongo:27017/testdb"

@pytest.fixture(autouse=True)
async def mock_db(monkeypatch, mongo_url):
    client = AsyncIOMotorClient(mongo_url)
    db = client.get_default_database()
    monkeypatch.setattr("app.database.database.db", db)
    yield db
    client.close()

@pytest.fixture
async def async_client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        yield client