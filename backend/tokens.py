from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# JWT Settings
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256" #SHA-256 symmetric key algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = 15

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_email_token(Email: str, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    data = {"subject": Email, "type": "email_verification"}  # Added a custom 'type' to distinguish from auth token
    return create_access_token(data, expires_delta)

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)

        if "exp" in payload and datetime.utcfromtimestamp(payload["exp"]) < datetime.utcnow():
            return JSONResponse(status_code=400, content={"message": "Token has expired."})

        return payload
    except JWTError:
        raise JSONResponse(status_code=403, content={"message": "Invalid token."})