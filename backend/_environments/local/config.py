import os
import requests
import typing
import json

from jwcrypto import jwk


def _parse_env_file() -> typing.Dict[str, str]:
    with open('backend/.env', 'r') as env_file:
        return {
            line.split('=')[0]: line.split('=')[1].replace('\n','') 
            for line in env_file.readlines()
        }


class Config(typing.NamedTuple):
    WELL_KNOWN_KEYS: typing.List[typing.Dict[str, str]]
    ENV: str

    @classmethod
    def create_local_config(cls):
        _LOCAL_KEY_FILENAME = 'backend/_infrastructure/local/.local_keys.json'

        if not os.path.exists(_LOCAL_KEY_FILENAME):
            key = jwk.JWK(generate='oct', size=256)
        
            with open(_LOCAL_KEY_FILENAME, 'w') as keys_file:
                keys_file.write(key.export())

        with open(_LOCAL_KEY_FILENAME, 'r') as keys_file:
            return cls(
                WELL_KNOWN_KEYS=[json.loads(keys_file.read())],
                ENV='local',
            )
    
    @classmethod
    def create_prod_config(cls):
        credentials = []

        with open('backend/.env', 'r') as env_file:
            env_information = {
                line.split('=')[0]: line.split('=')[1].replace('\n','') 
                for line in env_file.readlines()
            }
            keys_information = requests.get(env_information['WELL_KNWON_KEYS_URL']).json()
            credentials = keys_information['keys']

        return cls(
            WELL_KNOWN_KEYS=credentials,
            ENV='prod',
        )
    
    @classmethod
    def create_config(cls):
        env_file_contents = _parse_env_file()
        if env_file_contents.get('ENV') == 'local':
            return Config.create_local_config()
        
        return Config.create_prod_config()
