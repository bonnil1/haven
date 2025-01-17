from fastapi import FastAPI, Form, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, String, Boolean, Integer, Date, Enum, TIMESTAMP, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import uvicorn
import smtplib
import os

load_dotenv()

DATABASE_URL = "mysql://root:liupassword@mysql:3306/userdb"

# SQLAlchemy engine that connects to MySQL db
engine = create_engine(DATABASE_URL)

# Create a session to handle db sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
Base = declarative_base()

# Create tables in the database
Base.metadata.create_all(bind=engine) 

# SQLAlchemy Model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True) 
    FirstName = Column(String(100), nullable=False)
    LastName = Column(String(100), nullable=False)
    Email = Column(String(255), unique=True, nullable=False, index=True)
    EmailVerified = Column(Boolean, default=False)
    CreatedAt = Column(TIMESTAMP, default=func.now())
    UpdatedAt = Column(TIMESTAMP, default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<User(id={self.id}, first_name={self.FirstName}, last_name={self.LastName}, Email={self.Email})>"
"""
# SQLAlchemy Model
class User(Base):
    __tablename__ = "users"
    id = Column(String(22), primary_key=True) 
    FirstName = Column(String(100), nullable=False)
    LastName = Column(String(100), nullable=False)
    Email = Column(String(255), unique=True, nullable=False, index=True)
    EmailVerified = Column(Boolean, default=False)
    Password = Column(String(255), nullable=False) 
    PhoneNumber = Column(String(10), nullable=False)
    Gender = Column(String(100), nullable=False)
    DateOfBirth = Column(Date, nullable=False) #YYYY-MM-DD
    Occupation = Column(String(100), nullable=False)
    Role = Column(Enum("admin", "renter", "owner"), nullable=False)
    created_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")
    updated_at = Column(
        TIMESTAMP, default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP"
    )
"""

app = FastAPI()

# CORS set up
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,  
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# Dependency that yields a session for each request
def get_db():
    try:
        db = SessionLocal()
        yield db
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database connection error: {str(e)}"
        )
    finally:
        db.close()

# Email verification 
def send_verification_email(user_email, name):
    sender_email = os.getenv("GMAIL_UN")
    sender_password = os.getenv("GMAIL_PW")

    print(f"Email: {sender_email}, Password: {sender_password}")

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = user_email
    msg['Subject'] = "Verify Your Email - Haven App"

    verification_url = f"http://localhost:3000/signup/pw?email={user_email}"

    body = f"""
    Hello {name},

    Welcome to Haven!
    Please verify your email by clicking the link: {verification_url}.

    Haven Team.
    """
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # Connect
            server.login(sender_email, sender_password)  # Log in
            server.sendmail(sender_email, user_email, msg.as_string())  # Send email
            print("Verification email sent!")
    except smtplib.SMTPException as e:
        print(f"Failed to send email: {e}")


# New user sign up step 1
@app.post("/new-user")
async def create_user(request: Request, db: Session = Depends(get_db)):

    # Retrieve data from frontend
    data = await request.json()
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

        # If user doesn't exist, raise an exception
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if user.EmailVerified:
            raise HTTPException(status_code=400, detail="Email is already verified")
        
        user.EmailVerified = True

        db.commit()

        # Return the updated user (optional)
        db.refresh(user)

        return JSONResponse(status_code=200, content={"message": "Email successfully verified!"})

    except SQLAlchemyError as e:
        db.rollback()  # Rollback in case of error
        raise HTTPException(status_code=500, detail="Error updating user")

@app.post("/signup/pw")
async def set_password(request: Request, db: Session = Depends(get_db)):

    try:
        # Query the user by email
        user = db.query(User).filter(User.Email == request.email).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found.")

        if user.Password:
            raise HTTPException(status_code=400, detail="Password already set.")

        user.Password = request.password
        db.commit()
        db.refresh(user)

        return JSONResponse(status_code=200, content={"message": "Password set successfully!"})

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error setting password.")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)