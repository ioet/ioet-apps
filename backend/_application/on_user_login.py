import typing

from .. import _domain


class OnUserLogInUseCase:

    class Request(typing.NamedTuple):
        access_code: str
    
    class Response(typing.NamedTuple):
        id_token: str
        error: str

    def __init__(self, user_repository: _domain.UserRepository):
        self.user_repository = user_repository
    
    def __call__(self, request: Request) -> Response:
        return OnUserLogInUseCase.Response(id_token='some_fetched_token', error=None)
