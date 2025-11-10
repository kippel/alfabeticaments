from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
try:
    from passlib.context import CryptContext
except Exception as _exc:
    # Import may fail if passlib or its bcrypt backend isn't installed/configured.
    CryptContext = None
from jose import JWTError, jwt
from dotenv import load_dotenv
import os
from .database import db

load_dotenv()

SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")

# 🔹 Dependència de Mongo
def get_db():
    return db

db_dependency = Annotated[any, Depends(get_db)]

# Try to create a bcrypt CryptContext. In minimal/dev environments the
# underlying `bcrypt` library may be missing or incompatible which would
# raise during import/initialization. In that case provide a lightweight
# fallback that uses SHA256 (NOT for production, but useful for local seeding
# and tests).
if CryptContext is None:
    print("Warning: passlib not importable; using SHA256 fallback for bcrypt_context")

    class _SHA256Fallback:
        def hash(self, plain: str) -> str:
            import hashlib

            return hashlib.sha256(plain.encode()).hexdigest()

        def verify(self, plain: str, hashed: str) -> bool:
            import hashlib

            return hashlib.sha256(plain.encode()).hexdigest() == hashed

    bcrypt_context = _SHA256Fallback()
else:
    try:
        bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    except Exception as exc:
        print("Warning: bcrypt/passlib backend not available; using SHA256 fallback:", exc)

        class _SHA256Fallback:
            def hash(self, plain: str) -> str:
                import hashlib

                return hashlib.sha256(plain.encode()).hexdigest()

            def verify(self, plain: str, hashed: str) -> bool:
                import hashlib

                return hashlib.sha256(plain.encode()).hexdigest() == hashed

        bcrypt_context = _SHA256Fallback()
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/token")
oauth2_bearer_dependency = Annotated[str, Depends(oauth2_bearer)]

# 🔹 Funció que valida el token i retorna l’usuari actual
async def get_current_user(token: oauth2_bearer_dependency):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: str = payload.get("id")  # Mongo sol usar _id com string/ObjectId

        if username is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return {"username": username, "id": user_id}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

user_dependency = Annotated[dict, Depends(get_current_user)]
