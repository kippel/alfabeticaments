from fastapi.testclient import TestClient
import pytest
import os
import logging
from jose import jwt
from dotenv import load_dotenv  

from app.main import app    

# Suppress MongoDB logging during tests
logging.getLogger("pymongo").setLevel(logging.WARNING)
logging.getLogger("motor").setLevel(logging.WARNING)

load_dotenv()

# Get environment variables with fallbacks
SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")




@pytest.fixture
def test_client():
    print("Setting up Test Client")
    with TestClient(app) as client:
        yield client

def create_test_token():
    """Genera un JWT de prueba válido"""
    payload = {"sub": "testuser", "id": 1}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token