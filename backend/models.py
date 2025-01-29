from sqlalchemy import Column, Integer, String, Boolean, Date, TIMESTAMP, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# SQLAlchemy Model
class User(Base):
    __tablename__ = "userImportant"
    id = Column(Integer, primary_key=True, autoincrement=True) #discuss with Ripken about String vs Integer - 22 characters?
    FirstName = Column(String(100), nullable=False)
    LastName = Column(String(100), nullable=False)
    Email = Column(String(255), unique=True, nullable=False, index=True)
    EmailVerified = Column(Boolean, default=False)
    Password = Column(String(255), nullable=False)
    LicenseNumber = Column(String(13), nullable=False) 
    IssuingState = Column(String(2), nullable=False)
    ExpirationDate = Column(Date, nullable=False) #YYYY-MM-DD
    DateOfIssue = Column(Date, nullable=False) #YYYY-MM-DD
    LicenseImage = Column(String(2053), nullable=False)
    IDVerified = Column(Boolean, default=False)
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
    Password = Column(String(20), nullable=False)
    LicenseNumber = Column(String(13), nullable=False) 
    IssuingState = Column(String(2), nullable=False)
    ExpirationDate = Column(Date, nullable=False) #YYYY-MM-DD
    DateOfIssue = Column(Date, nullable=False) #YYYY-MM-DD
    LicenseImage = Column(String(2053), nullable=False)
    IDVerified = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")
    updated_at = Column(
        TIMESTAMP, default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP"
    )
"""