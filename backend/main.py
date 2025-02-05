from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import uvicorn
from database import get_db
from models import User
from tokens import create_email_token, verify_token
from email_func import send_verification_email
from password import hash_password, verify_password

app = FastAPI()

# CORS set up
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# New user sign up
@app.post("/new-user")
async def create_user(request: Request, db: Session = Depends(get_db)):

    # Retrieve data from frontend
    data = await request.json()
    print(data)
    FirstName = data["FirstName"]
    LastName = data["LastName"]
    Email = data["Email"]

    try:
        # Check if user with this email already exists
        existing_user = db.query(User).filter(User.Email == Email).first()
        print(existing_user)

        if existing_user:
            return JSONResponse(status_code=400, content={"message": "Email already exists."})

        # Create the new user
        new_user = User(FirstName=FirstName, LastName=LastName, Email=Email)

        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    
    except SQLAlchemyError as e:
        db.rollback()
        print(f"A SQLAlchemy error occurred: {e}")

    print(new_user)
    
    token = create_email_token(Email)
    print(token)

    send_verification_email(Email, FirstName, token)
    
    return JSONResponse(status_code=200, content={"message": "User created successfully!"})

# Verification Email
@app.get("/signup/pw")
async def verify_email(token: str, db: Session = Depends(get_db)):

    try:
        payload = verify_token(token)

        if payload["type"] != "email_verification":
            raise HTTPException(status_code=400, detail="Invalid token type for email verification.")
        
        if payload:
            Email = payload["subject"] 
            user = db.query(User).filter(User.Email == Email).first()

            if not user:
                raise HTTPException(status_code=404, detail="User not found.")

            if user.EmailVerified:
                return JSONResponse(status_code=200, content={"message": "User email is already verified."})

            user.EmailVerified = True
            db.commit()

        return {
            "message": "Email successfully verified!",
            "email": Email
        }

    except SQLAlchemyError as e:
        db.rollback()
        print(f"A SQLAlchemy error occurred: {e}")

@app.post("/signup/pw")
async def set_password(request: Request, token: str, db: Session = Depends(get_db)):

    # Retrieve data from frontend
    data = await request.json()
    Password = data["Password"]

    payload = verify_token(token)
    Email = payload["subject"] 

    try:
        hashedPassword = hash_password(Password)
        print(hashedPassword)

        # Query the user by email
        user = db.query(User).filter(User.Email == Email).first()
        print(user)

        if not user:
            raise HTTPException(status_code=404, detail="User not found.")

        user.Password = hashedPassword

        db.commit()

        db.refresh(user)

        return JSONResponse(status_code=200, content={"message": "Password set successfully."})

    except SQLAlchemyError as e:
        db.rollback()
        print(f"A SQLAlchemy error occurred: {e}")
    
@app.post("/login")
async def log_in(request: Request, db: Session = Depends(get_db)):

    data = await request.json()
    print(data)
    Email = data["Email"]
    Password = data["Password"]

    try:
        user = db.query(User).filter(User.Email == Email).first()

        if not user:
            return JSONResponse(status_code=404, content={"message": "No account associated with the email address."})
            
        if user:
            storedpw = user.Password
            userverified = user.EmailVerified

            if not userverified: 
                return JSONResponse(status_code=401, content={"message": "Please verify your email address to activate account."})
            
            # Compare passwords
            if not verify_password(Password, storedpw):
                return(JSONResponse(status_code=401, content={"message": "Invalid credentials."}))
            else:
                return JSONResponse(status_code=200, content={"message": "Log in successful."})
        
                # jwt token function here

    except SQLAlchemyError as e:
        db.rollback()
        print(f"A SQLAlchemy error occurred: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)