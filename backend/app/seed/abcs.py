import json, os
from app.lib import serializes


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


async def abcs(db, user_id):

    #await db.user_abc_list.delete_many({})
    await db.abcedaris_abc.delete_many({})
    await db.abc_list.delete_many({})

    with open(os.path.join(BASE_DIR, 'code/abc.json'), 'r') as file:
        data = json.load(file)
    
    print(user_id)
    for red in data['abc_bar']:
        red["user_id"] = str(user_id)
    print(data['abc_bar'])
    await db.abcedaris_abc.insert_many(data['abc_bar'])
    
    for red in data['abc_list']:
        red["user_id"] = str(user_id)
    
    await db.abc_list.insert_many(data['abc_list'])

async def courser(db):

    await db.courses.delete_many({})

    with open(os.path.join(BASE_DIR, 'code/courses.json'), 'r') as file:
        data = json.load(file)
 
    await db.courses.insert_many(data)