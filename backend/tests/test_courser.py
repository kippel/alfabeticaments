import pytest
from unittest.mock import AsyncMock
from api.workouts.courser import UserRequestId

@pytest.mark.anyio
async def test_user_request_id():
    # Simulamos el usuario
    user = {"id": "user123"}

    # Mock de la colección user_courses
    user_courses_collection = AsyncMock()
    user_courses_collection.find_one.return_value = None
    user_courses_collection.insert_one.return_value = AsyncMock(inserted_id="mocked_id")

    # Mock de la colección user_abc_list (aunque no la usamos en este test)
    user_abc_list_collection = AsyncMock()
    user_abc_list_collection.find.return_value = AsyncMock().__aiter__.return_value = []

    # Mock de la DB
    fake_db = {
        "user_courses": user_courses_collection,
        "user_abc_list": user_abc_list_collection
    }

    # Instanciamos la clase
    user_req = UserRequestId(user=user, db=fake_db)
    
    # Ejecutamos courses
    courses = await user_req.courses()

    # Ejecutamos courses_data
    data = user_req.courses_data(courses)

    assert data["courses_title"] == "Catala"
    assert data["image_src"] == "/flag/Catala.svg"
    assert data["courses"] == "ca"

    # Verificamos que insert_one se llamó
    user_courses_collection.insert_one.assert_awaited_once()



''' 
# Fixtures per tests
import pytest
from unittest.mock import AsyncMock
from api.workouts.courser import UserRequestId



@pytest.mark.anyio("asyncio")
async def test_user_request_id(fake_db):
    

    user_req = UserRequestId(user=user, db=fake_db)
    courses = await user_req.courses()

    data = user_req.courses_data(courses)

    assert data["courses_title"] == "Catala"
'''