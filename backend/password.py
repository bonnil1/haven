import bcrypt

# Hash password
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt(5) #generates a random string
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt) #combines salt and pw and applies bcrypt
    return hashed.decode("utf-8")

# Password verification
def verify_password(password: str, storedpw: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), storedpw.encode("utf-8"))