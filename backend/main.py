from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import uvicorn
from database import get_db
from models import User
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

# New user sign up step 1
@app.post("/new-user")
async def create_user(request: Request, db: Session = Depends(get_db)):

    # Retrieve data from frontend
    data = await request.json()
    print(data)
    FirstName = data["FirstName"]
    LastName = data["LastName"]
    Email = data["Email"]

    # Check if user with this email already exists
    existing_user = db.query(User).filter(User.Email == Email).first()

    if existing_user:
        return JSONResponse(status_code=400, content={"message": "Email already exists."})

    # Create the new user
    new_user = User(FirstName=FirstName, LastName=LastName, Email=Email)

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

    except IntegrityError as e:
        db.rollback() 
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error: Unable to create user due to a constraint violation."
        )
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while creating the user."
        )

    print(new_user)
    
    # verification email code here
    send_verification_email(Email, FirstName)
    
    return JSONResponse(status_code=200, content={"message": "User created successfully!"})

# Verification Email
@app.get("/signup/pw")
async def verify_email(email: str, db: Session = Depends(get_db)):

    try:
        # Query the user by email
        user = db.query(User).filter(User.Email == email).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found.")
        
        if user.EmailVerified:
        #   raise HTTPException(status_code=400, detail="User email is already verified.") # might need to create a frontend message to capture this.
            return JSONResponse(status_code=200, content={"message": "User email is already verified."})

        user.EmailVerified = True

        db.commit()

        # Return the updated user (optional)
        db.refresh(user)

        return JSONResponse(status_code=200, content={"message": "Email successfully verified!"})

    except SQLAlchemyError as e:
        db.rollback() 
        raise HTTPException(status_code=500, detail="Error updating user as verified.")

@app.post("/signup/pw")
async def set_password(request: Request, db: Session = Depends(get_db)):

    # Retrieve data from frontend
    data = await request.json()
    Email = data["Email"]
    Password = data["Password"]

    try:
        hashedPassword = hash_password(Password)
        print(hashedPassword)

        # Query the user by email
        user = db.query(User).filter(User.Email == Email).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found.")

        user.Password = hashedPassword

        db.commit()

        db.refresh(user)

        return JSONResponse(status_code=200, content={"message": "Password set successfully."})

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error setting password.")
    
@app.post("/login")
async def log_in(request: Request, db: Session = Depends(get_db)):

    data = await request.json()
    Email = data["Email"]
    Password = data["Password"]

    try:
        # Query the user by email
        user = db.query(User).filter(User.Email == Email).first()

        if not user:
            raise JSONResponse(status_code=404, content={"message": "User not found."})
            
        if user:
            userpw = user.Password
            userverified = user.EmailVerified

            if not userverified: 
                return JSONResponse(status_code=401, content={"message": "Please verify your email address to activate account."})
            
        # Compare passwords
        if not verify_password(Password, userpw):
            return(JSONResponse(status_code=500, content={"message": "Invalid credentials."}))
        
        #token function here


        return JSONResponse(status_code=200, content={"message": "Log in successful."})

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error logging in.")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)