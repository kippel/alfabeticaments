# Alfabeticaments


```
docker compose up --build

docker compose exec backend uv run pytest -v

docker compose exec backend uv run python -m app.cli
```




## .env

```
AUTH_SECRET_KEY=<your_secret_key_here>
AUTH_ALGORITHM=HS256
API_URL=http://0.0.0.0:3000

NEXT_PUBLIC_BACKEND_URL=http://0.0.0.0:3000

```

# frontend/.env

```
NEXTAUTH_URL=http://0.0.0.0:3000
```

# frontend/.env.local

```
NEXTAUTH_SECRET=<foo>

NEXT_PUBLIC_BACKEND_URL=http://0.0.0.0:4000
```
