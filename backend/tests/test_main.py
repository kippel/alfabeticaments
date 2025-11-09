import pytest
#from tests.conftest import create_test_token
    
def test_read_root(test_client):
    """Test root endpoint - should return user list"""
    response = test_client.get("/")
    
    assert response.status_code == 200
    #assert response.json() == {"message": "Hello from FastAPI + MongoDB"}

    data = response.json()
    assert "message" in data
    assert isinstance(data["message"], list)