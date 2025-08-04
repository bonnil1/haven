from fastapi import FastAPI, APIRouter, Depends, HTTPException, Request, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
import uvicorn
from database import get_db
from models import User, Profile
from tokens import create_email_token, verify_token
from email_func import send_verification_email
from password import hash_password, verify_password
from contact_func import send_contactus_email
from search_routes import router as search_router
from listing import router as listing_router

app = FastAPI()

# CORS set up
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

# New user sign up
@api_router.post("/new-user")
async def create_user(request: Request, db: Session = Depends(get_db)):
    print("in new user sign up in backend")
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

# Resend email verification
@api_router.post("/new-user-resend")
async def resend_email(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    FirstName = data["FirstName"]
    Email = data["Email"]

    token = create_email_token(Email)

    send_verification_email(Email, FirstName, token)

    return JSONResponse(status_code=200, content={"message": "Email resent successfully!"})

# Verification Email Clicked
@api_router.get("/signup/pw")
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

@api_router.post("/signup/pw")
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
    
@api_router.post("/login")
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
            user_id = user.user_id

            if not userverified: 
                return JSONResponse(status_code=401, content={"message": "Please verify your email address to activate account."})
            
            # Compare passwords
            if not verify_password(Password, storedpw):
                return(JSONResponse(status_code=401, content={"message": "Invalid credentials."}))
            else:
                return JSONResponse(status_code=200, content={"message": "Log in successful.", "email": Email, "user_id": user_id})
        
                # jwt token function here

    except SQLAlchemyError as e:
        db.rollback()
        print(f"A SQLAlchemy error occurred: {e}")

@api_router.post('/googleuser')
async def google_user(request: Request, db: Session = Depends(get_db)):
    print("in checking google user")

    data = request.json
    FirstName = data["FirstName"]
    LastName = data["LastName"]
    Email= data["Email"]

    try:
        existing_user = db.query(User).filter(User.Email == Email).first()

        if existing_user:
            return JSONResponse(status_code=400, content={"message": "Google user already exists."})

        new_google_user = User(FirstName=FirstName, LastName=LastName, Email=Email)

        db.add(new_google_user)
        db.commit()
        db.refresh(new_google_user)
        print(new_google_user)

    except SQLAlchemyError as e:
        db.rollback()
        print(f"A SQLAlchemy error occurred: {e}")
    
    return JSONResponse(status_code=200, content={"message": "New google user created."})


@api_router.get('/id') #grabbing id to create user profile.
async def get_id(email: str, db: Session = Depends(get_db)):

    try:
        user = db.query(User).filter(User.Email == email).first()
        print(user)
        if not user:
            return JSONResponse(status_code=404, content={"message": "No account associated with the email address."})
            
        if user:
            id = user.user_id
            print(id)
            return {
                "user_id": id
            }

    except SQLAlchemyError as e:
        db.rollback()
        print(f"A SQLAlchemy error occurred: {e}")

@api_router.post("/new-profile")
async def new_profile(request: Request, db: Session = Depends(get_db)):
    print("in new user profile")

    data = await request.json()
    print(data)
    user_id = data["user_id"]
    PhoneNumber = data["PhoneNumber"]
    Gender = data["Gender"]
    DateOfBirth = data["DateOfBirth"]
    Occupation = data["Occupation"]
    # need to add agree to terms in db
    # Terms = data["Terms"]

    try:
        # Check if user id exists
        existing_userid = db.query(Profile).filter(Profile.user_id == user_id).first()

        if existing_userid:
            return JSONResponse(status_code=400, content={"message": "User id already exists."})

        # Create the new user profile
        new_user_profile = Profile(user_id=user_id, PhoneNumber=PhoneNumber, Gender=Gender, DateOfBirth=DateOfBirth, Occupation=Occupation)

        db.add(new_user_profile)
        db.commit()
        db.refresh(new_user_profile)

    except SQLAlchemyError as e:
        db.rollback()
        print(f"A SQLAlchemy error occurred: {e}")


    print(new_user_profile)
    
    return JSONResponse(status_code=200, content={"message": "New user profile created."})

@api_router.get("/profile")
async def get_profile(email: str, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.Email == email).first()
        print(user)
        if not user:
            return JSONResponse(status_code=404, content={"message": "No user associated with the email address."})
            
        userid = user.user_id
        FirstName = user.FirstName
        LastName = user.LastName

        user_profile = db.query(Profile).filter(Profile.user_id == userid).first()
        print(user_profile)
        if not user_profile:
            return JSONResponse(status_code=404, content={"message": "No profile associated with the email address."})

        PhoneNumber = user_profile.PhoneNumber
        Gender = user_profile.Gender
        DateOfBirth = user_profile.DateOfBirth
        Occupation = user_profile.Occupation

        return {
            "message": "Fetched user info successfully!",
            "FirstName": FirstName,
            "LastName": LastName,
            "PhoneNumber": PhoneNumber,
            "Gender": Gender,
            "DateOfBirth": DateOfBirth,
            "Occupation": Occupation
        }

    except SQLAlchemyError as e:
        db.rollback()
        print(f"A SQLAlchemy error occurred: {e}")

@api_router.post("/contactus")
async def contactus(
    FirstName: str = Form(...),
    LastName: str = Form(...),
    Email: str = Form(...),
    Issue: str = Form(...),
    Description: str = Form(...),
    Attachment: UploadFile = File(None)
):
    print("in contact us in backend")

    file_data = None

    if Attachment: 
        file_data = await Attachment.read()

    send_contactus_email(Email, FirstName, LastName, Issue, Description, Attachment.filename if Attachment else None, file_data)

    return JSONResponse(status_code=200, content={"message": "Customer support email sent successfully!"})

api_router.include_router(search_router)
api_router.include_router(listing_router)
app.include_router(api_router)


#for route in app.routes:
#    print(route.path, route.methods)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)