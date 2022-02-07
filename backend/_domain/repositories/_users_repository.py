from .. import entities


class UserRepository:
    def get(self, user_id: str) -> entities.User:
        raise NotImplementedError()
    
    def save(self, user: str, refresh_token: str) -> entities.User:
        raise NotImplementedError()
