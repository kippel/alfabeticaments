from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from dotenv import load_dotenv
import os
from bson import ObjectId
from app.database.deps import (
    db_dependency,
    bcrypt_context 
)
from app.schemas import Token, UserCreateRequest, UserRequest, UserCreateRegister

load_dotenv()

router = APIRouter(prefix="/auth", tags=["auth"])

SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 200

# 🔹 Autenticació usuari
async def authenticate_user(username: str, password: str, db):
    user = await db["users"].find_one({"username": username})
    if not user:
        return False
    if not bcrypt_context.verify(password, user["password"]):
        return False
    return user

# 🔹 Crear token JWT
def create_access_token(username: str, user_id: str, expires_delta: timedelta | None = None):
    to_encode = {"sub": username, "id": user_id}
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# 🔹 Register
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_register(create_registers: UserCreateRegister, db: db_dependency):
    if create_registers.password != create_registers.confirmPassword:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match",
        )

    existing_user = await db["users"].find_one({"username": create_registers.username})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )

    new_user = {
        "username": create_registers.username,
        "password": bcrypt_context.hash(create_registers.password),
    }
    result = await db["users"].insert_one(new_user)

    return {
        "id": str(result.inserted_id),
        "username": create_registers.username,
        "message": "User registered successfully",
    }

# 🔹 Crear usuari manual (similar a register però sense confirmPassword)
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: UserCreateRequest):
    existing_user = await db["users"].find_one({"username": create_user_request.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = {
        "username": create_user_request.username,
        "password": bcrypt_context.hash(create_user_request.password),
    }
    result = await db["users"].insert_one(new_user)

    return {
        "id": str(result.inserted_id),
        "username": create_user_request.username,
        "message": "User created successfully",
    }

# 🔹 Login / token
@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: db_dependency,
):
    user = await authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(
        username=user["username"],
        user_id=str(user["_id"]),
    )

    user_data = {
        "username": user["username"],
        "id": str(user["_id"]),
    }

    return {"access_token": token, "token_type": "bearer", "user": user_data}
