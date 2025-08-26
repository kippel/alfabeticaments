## Alfabeticaments

# docker-compose.yml

```
version: "3.9"
services:
  backend:
    build: ./backend
    container_name: backend
    ports:
      - "4000:4000"
    volumes:
      - ./backend:/app
    environment:
      - UVICORN_RELOAD=true
      - MONGO_URI=mongodb://mongo:27017/mydatabase
    depends_on:
      - mongo
  mongo:
    image: mongo:7.0
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=mydatabase

volumes:
  mongo_data:


```


docker build -t backend .
docker run --rm backend pytest

docker run --rm backend pytest tests/


``` todo
docker compose up --build

docker compose exec backend uv run pytest -v
```


https://github.com/Pytest-with-Eric/pytest-fastapi-crud-example/blob/master/app/user.py