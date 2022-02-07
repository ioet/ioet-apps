import os
import json

from ... import _domain

_JSON_FILE = 'backend/_environments/local/.local_storage.json'


def _get_or_create_json():
    if not os.path.exists(_JSON_FILE):
        with open(_JSON_FILE, 'w') as json_storage_file:
            json.dump({}, json_storage_file)
    
    with open(_JSON_FILE, 'r') as json_storage_file:
        return json.load(json_storage_file)


class JsonUsersRepository(_domain.UserRepository):
    def get(self, user_id: str) -> _domain.User:
        current_storage_data = _get_or_create_json()
        return _domain.User(id=user_id, refresh_token=current_storage_data.get(user_id))
    
    def save(self, user: str, refresh_token: str) -> _domain.User:
        current_storage_data = _get_or_create_json()
        current_storage_data[user] = refresh_token

        with open(_JSON_FILE, 'w') as json_storage_file:
            json.dump(current_storage_data, json_storage_file)
        
        return _domain.User(id=user, refresh_token=refresh_token)
