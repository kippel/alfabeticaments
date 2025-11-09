from pydantic import BaseModel


#####################################
class UserInfo(BaseModel):
    id: str
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

#############################################
## courses

class CoursesRequest(BaseModel):
    coursesId: str

#######################################
# abc

class AbcRequest(BaseModel):
    abc_courses: str


class AbcListRequest(BaseModel):
    abcedaris_courses: str
    abcedaris_list: int
    abcedaris_palabras: str

########################################

class HoraDosType(BaseModel):
    hora_numbro_uns: int


class HoraTresType(BaseModel):
    hora_numbro_uns: int
    hora_numbro_dos: int