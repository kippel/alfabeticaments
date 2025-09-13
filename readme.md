## Alfabeticaments

# docker-compose.yml

"abcedaris_world" :[
                        {"abcedaris_id" : 1, "abcedaris_world" : "pa", "abcedaris_bool" : true },
                        {"abcedaris_id" : 2, "abcedaris_world" : "nu", "abcedaris_bool" : false}],


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

docker compose exec backend uv run python -m app.cli

```


https://github.com/Pytest-with-Eric/pytest-fastapi-crud-example/blob/master/app/user.py



- bakcend /backend/app/routers/abc.py /abc/abcedaris. Siguiendo srp, quiero que me dividas los diferentes componentes por responsabilidad y los crees en /backend/app/workouts/abcs.py