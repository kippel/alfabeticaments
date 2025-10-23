import pytest
from tests.conftest import create_test_token


'''
def test_register_user(test_client):
    """Test POST /auth/register endpoint"""
    user_data = {
        "username": "testuser",
        "password": "testpassword",
        "confirmPassword": "testpassword"
    }
    response = test_client.post("/auth/register", json=user_data)
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "testuser"
    assert "id" in data
    assert data["message"] == "User registered successfully"
'''