import pytest
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def test_root():
    response = client.post("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello from FastAPI + MongoDB"}



