import pytest
from jose import jwt
import os

# This function does not need to change
SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")

def create_test_token(username="kippel", user_id="qwerty"):
    payload = {"sub": username, "id": user_id}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Mark test as asyncio, change to async def, use async_client, and await the call
@pytest.mark.asyncio
async def test_ping(async_client):
    response = await async_client.post("/")
    assert response.status_code == 200
    json_response = response.json()
    assert "message" in json_response
    assert "user" in json_response
    assert "courses" in json_response
    assert "abcedaris" in json_response

# Mark test as asyncio, change to async def, use async_client, and await the call
@pytest.mark.asyncio
async def test_courses_red(async_client):
    token = create_test_token()
    headers = {"Authorization": f"Bearer {token}"}
    print(token, headers)
    response = await async_client.get("/courses/red", headers=headers)
    assert response.status_code == 200
    assert "courses" in response.json()