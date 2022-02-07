# from .. import _environments
# from .. import _domain


# class VerifyTokenUseCase:
#     def __init__(self, credentials_service: _domain.CredentialsService):
#         self.credentials_service = credentials_service
    
#     def __call__(self, token: str) -> bool:
#         credential = self.credentials_service.parse(token)

#         if not credential:
#             return ({'error': 'invalid token'}, 500)

#         if not credential.is_valid:
#             return ({'error': 'invalid credential'}, 500)

#         if credential.expired:
#             return ({'error': 'credential expired'}, 500)

#         return ({'isValid': True}, 200)
        

#     @classmethod
#     def create(cls):
#         config = _environments.Config.create_config()
#         credentials_service = _domain.CredentialsService(config)
#         return cls(credentials_service)
