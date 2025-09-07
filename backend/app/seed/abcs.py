import json, os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


async def abcs(db):

    await db.user_abc_list.delete_many({})
    await db.abcedaris_abc.delete_many({})
    await db.abc_list.delete_many({})

    with open(os.path.join(BASE_DIR, 'code/abc.json'), 'r') as file:
        data = json.load(file)
 
    await db.abcedaris_abc.insert_many(data['abc_bar'])
    await db.abc_list.insert_many(data['abc_list'])

async def courser(db):

    await db.courses.delete_many({})

    with open(os.path.join(BASE_DIR, 'code/courses.json'), 'r') as file:
        data = json.load(file)
 
    await db.courses.insert_many(data)