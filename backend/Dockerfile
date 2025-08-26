# Imatge oficial de Python 3.12 amb slim
FROM python:3.12-slim

# Instal·lem uv per gestionar dependències ràpid
RUN pip install --no-cache-dir uv

# Definim el directori de treball
WORKDIR /app

# Copiem els fitxers de dependències primer
COPY pyproject.toml uv.lock ./

# Instal·lem dependències
RUN uv sync --frozen --no-cache

# Copiem el codi del backend
COPY . .

# Exposem el port
EXPOSE 4000

# Comanda per arrencar FastAPI amb Uvicorn
CMD ["uv", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "4000", "--reload"]
