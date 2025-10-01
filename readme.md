## Alfabeticaments

# docker-compose.yml

```
version: "3.9"
services:
  backend:
    build: ./backend
    container_name: backend
    env_file:
      - .env
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

## .env

```
AUTH_SECRET_KEY=your_secret_key_here
AUTH_ALGORITHM=HS256
API_URL=http://192.168.50.16:3000

NEXT_PUBLIC_BACKEND_URL=http://192.168.50.16:4000
```

## frontend/.env

```
NEXTAUTH_URL=http://localhost:3000
```
## frontend/.env.local

```
NEXTAUTH_SECRET="our_secret_key_here"

NEXT_PUBLIC_BACKEND_URL=http://192.168.50.16:4000
```

```
docker build -t backend .
docker run --rm backend pytest

docker run --rm backend pytest tests/
```

``` todo
docker compose up --build

docker compose exec backend uv run pytest -v

docker compose exec backend uv run python -m app.cli

```


https://github.com/Pytest-with-Eric/pytest-fastapi-crud-example/blob/master/app/user.py



- bakcend /backend/app/routers/abc.py /abc/abcedaris. Siguiendo srp, quiero que me dividas los diferentes componentes por responsabilidad y los crees en /backend/app/workouts/abcs.py




