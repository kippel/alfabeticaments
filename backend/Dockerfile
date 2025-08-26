FROM python:3.12-slim

WORKDIR /app

# Copiem fitxers de dependències
COPY pyproject.toml uv.lock ./

# Instal·lem uv i les dependències
RUN pip install --no-cache-dir uv
RUN uv sync --frozen --no-cache

# Instal·lem FastAPI, Uvicorn, Pytest i HTTPX
RUN uv add --no-cache-dir passlib[bcrypt] fastapi uvicorn[standard] pytest httpx motor python-jose python-multipart


# Copiem tot el codi
COPY . .

EXPOSE 4000

CMD ["uv", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "4000", "--reload"]
