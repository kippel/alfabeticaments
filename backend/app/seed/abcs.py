import json, os
from app.lib import serializes


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


async def abcs(db, user_id):

    #await db.user_abc_list.delete_many({})
    await db.abcedaris_abc.delete_many({})
    await db.abc_list.delete_many({})

    with open(os.path.join(BASE_DIR, 'code/abc.json'), 'r') as file:
        data = json.load(file)
    
    
    for red in data['abc_bar']:
        red["user_id"] = str(user_id)

    for red in data['abc_list']:
        red["user_id"] = str(user_id)
    
    await db.abcedaris_abc.insert_many(data['abc_bar'])
    await db.abc_list.insert_many(data['abc_list'])

async def courser(db):

    await db.courses.delete_many({})

    with open(os.path.join(BASE_DIR, 'code/courses.json'), 'r') as file:
        data = json.load(file)
 
    await db.courses.insert_many(data)

async def hora(db, user_id):
    await db.hora_uns.delete_many({})
    await db.hora_dos.delete_many({})
    await db.hora_tres.delete_many({})

    with open(os.path.join(BASE_DIR, 'code/hora.json'), 'r') as file:
        data = json.load(file)

    for red in data['hora_uns']:
        red["user_id"] = str(user_id)
    
    for red in data['hora_dos']:
        red["user_id"] = str(user_id)
    
    for red in data['hora_tres']:
        red["user_id"] = str(user_id)
    
    await db.hora_uns.insert_many(data['hora_uns'])
    await db.hora_dos.insert_many(data['hora_dos'])
    await db.hora_tres.insert_many(data['hora_tres'])