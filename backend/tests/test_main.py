import pytest
#from tests.conftest import create_test_token

'''     
def test_pill_route_with_auth(test_client):
    """Ruta protegida: acceso con token válido"""
        
    token = create_test_token()
    headers = {"Authorization": f"Bearer {token}"}
    response = test_client.get("/pills/", headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "List of pills"

def test_pill_route_without_auth(test_client):
    """Ruta protegida: acceso sin token"""
    response = test_client.get("/pills/")
    assert response.status_code == 401
    # Check that we get an authentication error (exact message may vary)
    assert "detail" in response.json()
'''
    
def test_read_root(test_client):
    """Test root endpoint - should return user list"""
    response = test_client.get("/")
    print(response.json())
    assert response.status_code == 200
    assert response.json() == {"message": "Hello from FastAPI + MongoDB"}