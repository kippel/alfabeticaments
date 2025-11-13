
import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


''''
def db_dependency(db=SessionLocal()):

    pass
'''

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