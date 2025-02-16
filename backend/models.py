from sqlalchemy import Column, Integer, String, Boolean, Date, TIMESTAMP, func, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

# SQLAlchemy Model
class User(Base):
    __tablename__ = "userImportant"
    user_id = Column(Integer, primary_key=True, autoincrement=True) #discuss with Ripken about String vs Integer - 22 characters?
    FirstName = Column(String(100), nullable=False)
    LastName = Column(String(100), nullable=False)
    Email = Column(String(255), unique=True, nullable=False, index=True)
    EmailVerified = Column(Boolean, default=False)
    Password = Column(String(255), nullable=True)
    LicenseNumber = Column(String(13), nullable=True) 
    IssuingState = Column(String(2), nullable=True)
    ExpirationDate = Column(Date, nullable=True) #YYYY-MM-DD
    DateOfIssue = Column(Date, nullable=True) #YYYY-MM-DD
    LicenseImage = Column(String(2053), nullable=True)
    IDVerified = Column(Boolean, default=False)
    CreatedAt = Column(TIMESTAMP, default=func.now())
    UpdatedAt = Column(TIMESTAMP, default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<User(id={self.user_id}, first_name={self.FirstName}, last_name={self.LastName}, Email={self.Email})>"

class Profile(Base):
    __tablename__ = "userAdditional"
    user_id = Column(Integer, ForeignKey('userImportant.user_id'), primary_key=True)
    PhoneNumber = Column(String(100), nullable=True)
    Gender = Column(String(100), nullable=True)
    DateOfBirth = Column(Date, nullable=True)
    Occupation = Column(String(100), nullable=True)

    user = relationship('User', backref='profile', uselist=False)

    def __repr__(self):
        return f"<Profile(user_id={self.user_id}, PhoneNumber={self.PhoneNumber})>"