FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml uv.lock ./

# Instal·lem uv i sincronitzem dependències
RUN pip install --no-cache-dir uv \
    && uv sync --frozen --no-cache \
    && uv add --no-cache-dir passlib[bcrypt] fastapi uvicorn[standard] pytest httpx motor python-jose python-multipart


RUN uv add --no-cache-dir trio
    
COPY . .

EXPOSE 4000

CMD ["uv", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "4000"]
