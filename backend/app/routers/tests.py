from fastapi import APIRouter
from app.workouts.courser import user_request_id_user
from app.database.deps import db_dependency, user_dependency
from app.lib import serializes_list
import logging

router = APIRouter(prefix="/tests", tags=["tests"])

