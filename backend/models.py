from sqlalchemy import Boolean, Column, Date, Enum, ForeignKey, Integer, SmallInteger, String, DECIMAL, TIMESTAMP, func
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
    property_id = Column(Integer, primary_key=True, autoincrement=True) #integer
    owner_id = Column(Integer, ForeignKey('userImportant.user_id'), nullable=False) #integer
    property_type = Column(
        Enum(
            "House",
            "Apartment",
            "Condo",
            "Cottage",
            "Guesthouse",
            "Hotel",
            name="property_type_enum",
        ),
        nullable=False,
        default="House",
    )
    type = Column(
        Enum(
            "Entire-Place",
            "Private-Room",
            "Shared-Room",
            name="property_rental_type_enum",
        ),
        nullable=False,
        default="Entire-Place",
    )
    guests_allowed = Column(Integer)
    bedrooms = Column(SmallInteger, nullable=True)
    beds = Column(SmallInteger, nullable=True)
    bathrooms = Column(SmallInteger, nullable=True)

    IU_laundry = Column(Boolean)
    B_laundry = Column(Boolean)
    wifi = Column(Boolean)
    heater = Column(Boolean)
    ac = Column(Boolean)
    parking = Column(Boolean)
    tv = Column(Boolean)
    kitchen = Column(Boolean)
    furnished = Column(Boolean)
    gym = Column(Boolean)
    pool = Column(Boolean)
    pet_friendly = Column(Boolean)

    stove = Column(Boolean)
    utensils = Column(Boolean)
    dishwasher = Column(Boolean)
    fridge = Column(Boolean)
    oven = Column(Boolean)
    microwave = Column(Boolean)
    potpans = Column(Boolean)
    coffee = Column(Boolean)
    toaster = Column(Boolean)

    bed = Column(Boolean)
    workspace = Column(Boolean)
    couch = Column(Boolean)
    D_table = Column(Boolean)
    B_table = Column(Boolean)
    C_table = Column(Boolean)
 
    S_detector = Column(Boolean)
    CO_detector = Column(Boolean)
    F_extinguisher = Column(Boolean)

    street_address = Column(String(255))
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    postal_code = Column(String(10))
    country = Column(String(100), nullable=False)
    extra_info = Column(String(100))

    title = Column(String(255))
    description = Column(String)  # TEXT in SQL maps to String/Text
    rent = Column(DECIMAL(10, 2))
    water_fee = Column(DECIMAL(10, 2))
    electric_fee = Column(DECIMAL(10, 2))

    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())

    availability = relationship("Availability", back_populates="property")

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
    