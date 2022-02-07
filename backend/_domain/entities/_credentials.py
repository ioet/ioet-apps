from typing import NamedTuple


class Credentials(NamedTuple):
    user_id: str
    is_valid: bool
    expired: bool
