from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

#Docker route
#DATABASE_URL = "mysql://root:liupassword@mysql:3306/userdb"

#EC2 route
DATABASE_URL = "mysql+pymysql://root@localhost:3306/User"

# SQLAlchemy engine that connects to MySQL db
engine = create_engine(DATABASE_URL)

# Create a session to handle db sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency that yields a session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
