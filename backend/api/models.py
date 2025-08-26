


class Users:

    def _userEntity(self, item) -> dict:
        return {
            "id" : str(item["_id"]),
            "name" : item["name"],
            "password" : item["password"]
        }

    async def usersEntity(self, cursor) -> list:
        users = []
        async for item in cursor:  
            users.append(self._userEntity(item))
        return users