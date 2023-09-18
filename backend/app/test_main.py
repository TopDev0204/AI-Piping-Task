import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_recommendations():
    # Test valid season
    response = client.get("/recommendations?country=Spain&season=spring")
    assert response.status_code == 200
    data = response.json()
    assert "country" in data
    assert "season" in data
    assert "recommendations" in data

    # Test invalid season
    response = client.get("/recommendations?country=Spain&season=invalid")
    assert response.status_code == 200
    data = response.json()
    assert "recommendations" in data
    assert len(data["recommendations"]) == 1
    assert data["recommendations"][0] == "season must be spring, summer, autumn or winter"

