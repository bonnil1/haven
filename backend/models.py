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
    
class Property(Base):
    __tablename__ = "properties"
    property_id = Column(Integer, primary_key=True, autoincrement=True)
    # owner_id = Column(Integer, ForeignKey('userImportant.user_id'), nullable=False)
    property_type = Column(String(20), nullable=True)
    title = Column(String(255), nullable=True)
    description = Column(String(1000), nullable=True)
    fee = Column(String(10), nullable=True)
    street_address = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    state = Column(String(2), nullable=False)
    postal_code = Column(String(10), nullable=True)
    country = Column(String(100), nullable=False)
    bedrooms = Column(Integer, nullable=False)
    bathrooms = Column(Integer, nullable=False)
    pets = Column(Integer, nullable=False)
    guests_allowed = Column(Integer, nullable=True)
    pet_friendly = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())

    availability = relationship("Availability", back_populates="property")
    amenities = relationship("Amenities", back_populates="property")

    def __repr__(self):
        return f"<Property(id={self.property_id})>"
    
class Availability(Base):
    __tablename__ = "availability"
    id = Column(Integer, primary_key=True, autoincrement=True)
    property_id = Column(Integer, ForeignKey('properties.property_id'))
    start_date = Column(Date)
    end_date = Column(Date)

    property = relationship("Property", back_populates="availability")

    def __repr__(self):
        return f"<Availability(id={self.id}, property_id={self.property_id})>"
    
class Amenities(Base):
    __tablename__ = "amenities"
    id = Column(Integer, primary_key=True, autoincrement=True)
    property_id = Column(Integer, ForeignKey('properties.property_id'))
    type = Column(String(100), nullable=True)

    property = relationship("Property", back_populates="amenities")

    def __repr__(self):
        return f"<Amenities(id={self.id}, property_id={self.property_id})>"