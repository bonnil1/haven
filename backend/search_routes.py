from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import and_
from fastapi.responses import JSONResponse
from models import Property, Availability
from database import get_db
from datetime import date as dt_date

router = APIRouter(
    prefix="/search",
    tags=["search"]
)

@router.post("/results")
async def search_request(request: Request, db: Session = Depends(get_db)):

    data = await request.json()
    print(data)
    city = data.get("city")
    state = data.get("state")
    adults = int(data.get("adults", 0))
    children = int(data.get("children", 0))
    pets = int(data.get("pets", 0))
    date = data.get("date", [])
    guests_allowed = sum([adults, children])

    try:
        query = db.query(Property)

        filters = [
            Property.city == city,
            Property.state == state,
            Property.guests_allowed >= guests_allowed
        ]

        if pets > 0:
            filters.append(Property.pets == True)

        query = query.filter(*filters)

        if len(date) == 2:
            checkin = dt_date.fromisoformat(date[0])
            checkout = dt_date.fromisoformat(date[1])
            #print(f"Checkin: {checkin} ({type(checkin)})")
            #print(f"Checkout: {checkout} ({type(checkout)})")

            query = query.join(Property.availability).filter(
                and_(
                    Availability.start_date <= checkin,
                    Availability.end_date >= checkout
                )
            )

        results = query.all()

        print(f"Results: {results}")

        properties = []
        for property in results:
            properties.append({
                "property_id": property.property_id,
                "title": property.title,
                "description": property.description,
                "fee": property.fee,
                "street_address": property.street_address,
                "city": property.city,
                "state": property.state,
                "postal_code": property.postal_code,
                "country": property.country,
                "guests_allowed": property.guests_allowed,
                "pets_allowed": property.pet_friendly,
                "bedrooms": property.bedrooms,
                "bathrooms": property.bathrooms,
                "property_type": property.property_type,
            })

        return {"results": properties, "message": "Search results returned successfully!",}

    except SQLAlchemyError as e:
            db.rollback()
            print(f"A SQLAlchemy error occurred: {e}")

@router.get("/show/{id}")
async def get_listing(id: int, db: Session = Depends(get_db)):
     
    try:
        property = db.query(Property).filter(Property.property_id == id).first()

        print(property)

        return {"results": property, "message": "Listing returned successfully!"}

    except SQLAlchemyError as e:
        db.rollback()
        print(f"A SQLAlchemy error occurred: {e}")