import pytest


def test_ping(test_app):
    response = test_app.post("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello from FastAPI + MongoDB"}



from jose import jwt

import os
SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")

def create_test_token(username="kippel", user_id="qwerty"):
    payload = {"sub": username, "id": user_id}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def test_courses_red(test_app, mock_db):
    token = create_test_token()
    headers = {"Authorization": f"Bearer {token}"}
    print(token, headers)
    response = test_app.get("/red", headers=headers)
    assert response.status_code == 200
    assert "courses" in response.json()

    #assert len(data["courses"]) == 2


''' 
@pytest.mark.anyio("asyncio")
async def test_user_request_id(fake_db):
    await fake_db["users"].insert_one({"username": "kippel"})
    user = await fake_db["users"].find_one({"username": "kippel"})
    assert user["username"] == "kippel"
'''