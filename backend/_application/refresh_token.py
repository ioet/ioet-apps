# import typing

# from .. import _environments
# from .. import _domain
# from .. import _persistance


# class RefreshTokenUseCase:
#     def __init__(self, credentials_service: _domain.CredentialsService, user_repository: _domain.UserRepository):
#         self.credentials_service = credentials_service
#         self.user_repository = user_repository
    
#     def __call__(self, token: str) -> typing.Tuple[typing.Dict, int]:
#         credential = self.credentials_service.parse(token)

#         if not credential:
#             return ({'error': 'invalid token'}, 500)
        
#         if not credential.is_valid:
#             return ({'error': 'invalid token'}, 500)

#         if not credential.expired:
#             return ({'idToken': token}, 200)

#         user = self.user_repository.get(credential.user_id)

#         if not user:
#             return ({'error': 'no refresh token found'}, 500)
        
#         return ({'idToken': self.credentials_service.refresh_credentials(user.refresh_token)}, 200)

#     @classmethod
#     def create(cls):
#         config = _environments.Config.create_config()
#         credentials_service = _domain.CredentialsService(config)
#         users_respository = _persistance.JsonUsersRepository() # if config.ENV == 'local' else _domain.UserRepository()

#         return cls(credentials_service, users_respository)
