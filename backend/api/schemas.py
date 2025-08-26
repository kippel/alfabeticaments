from pydantic import BaseModel


#####################################
class UserInfo(BaseModel):
    id: int
    username: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserInfo
######################################  


################################################

class UserCreateRequest(BaseModel):
    username: str
    password: str

class UserRequest(BaseModel):
    username: str
    password: str

class UserCreateRegister(BaseModel):
    username: str
    password: str
    confirmPassword: str

##############################################


class User(BaseModel):
    name: str
    pasword: str