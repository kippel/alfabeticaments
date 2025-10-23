import pytest
from tests.conftest import create_test_token


def test_blue_courses_route(test_client):
    """Test GET /courses/blue endpoint"""
        
    token = create_test_token()
    headers = {"Authorization": f"Bearer {token}"}
    response = test_client.get("/courses/blue", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "courses" in data
    assert isinstance(data["courses"], list)

    # Exemple d'assertió addicional
    assert len(data["courses"]) == 2 
    
    if data["courses"]:  # Només comprovem si hi ha cursos

        assert data["courses"][0]["title"] == "Catala"
        assert data["courses"][0]["image_src"] == "/flag/Catala.svg"
        assert data["courses"][0]["courses"] == "ca"

        assert data["courses"][1]["title"] == "Español"
        assert data["courses"][1]["image_src"] == "/flag/Espanol.svg"
        assert data["courses"][1]["courses"] == "es"
        
     