from flask import Flask
from flask import request

from backend._environments.local.json_users_repository import JsonUsersRepository

# from backend import VerifyTokenUseCase
from backend import OnUserLogInUseCase
# from backend import RefreshTokenUseCase

app = Flask(__name__)


@app.route('/login', methods=['POST'])
def token_is_valid():
    login_request = OnUserLogInUseCase.Request(access_code=request.headers['Authorization'].replace('Bearer ', ''))
    user_repository = JsonUsersRepository()
    on_login = OnUserLogInUseCase(user_repository)
    login_response = on_login(login_request)

    if login_response.error:
        return ({'error': login_response.error}, 500)
    
    return ({'id_token': login_response.id_token}, 200)


app.run(host='0.0.0.0', port=8080)
