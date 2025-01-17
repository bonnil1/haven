from sqlalchemy import create_engine, Column, String, Boolean, Date, Enum, TIMESTAMP
from sqlalchemy.orm import relationship
from main import Base

# SQLAlchemy Model
class User(Base):
    __tablename__ = "users"
    id = Column(String(22), primary_key=True) 
    FirstName = Column(String(100), nullable=False)
    LastName = Column(String(100), nullable=False)
    Email = Column(String(255), unique=True, nullable=False, index=True)
    EmailVerified = Column(Boolean, default=False)
    CreatedAt = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")
    UpdatedAt = Column(
        TIMESTAMP, default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP"
    )

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