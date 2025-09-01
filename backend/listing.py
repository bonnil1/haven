from fastapi import APIRouter, Depends, Request
from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi.responses import JSONResponse
from models import Property, Availability
from database import get_db
from datetime import date as dt_date
import json

router = APIRouter(
    prefix="/property", 
    tags=["property"]
)


def update_property_fields(db: Session, property_id: int, updates: dict):
    try:
        property_obj = (
            db.query(Property).filter(Property.property_id == property_id).first()
        )
        if not property_obj:
            return None

        for field, value in updates.items():
            if hasattr(property_obj, field) and value is not None:
                setattr(property_obj, field, value)

        db.commit()
        db.refresh(property_obj)
        return property_obj
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Update Error: {e}")
        return None

@router.post("/submit")
async def property_page_submit(request: Request, db: Session = Depends(get_db)):

    data = await request.form()
    
    try: 
        amenities = json.loads(data.get('amenities', '{}'))
        furniture = json.loads(data.get('furniture', '{}'))
        kitchen = json.loads(data.get('kitchen', '{}'))
        safeties = json.loads(data.get('safeties', '{}'))
        date_ranges = json.loads(data.get('dateRanges', '[]'))
        
        print({'amenities': amenities, 'furniture': furniture, 'kitchen': kitchen, 'safeties': safeties, 'date_ranges': date_ranges})
        
        new_property = Property(
            owner_id=data.get("user_id"),
            property_type=data.get("type"),
            type=data.get("space"),
            guests_allowed=data.get("guests"),
            bedrooms=data.get("bedrooms"),
            beds=data.get("beds"),
            bathrooms=data.get("bathrooms"),

            city=data.get("city"),
            country=data.get("country"),
            state=data.get("state"),
            street_address=data.get("street_address"),
            extra_info=data.get("extra_info"),
            postal_code=data.get("postal_code"),
            title=data.get("title"),
            description=data.get("description"),
            electric_fee=data.get("electric_fee"),
            water_fee=data.get("water_fee"),
            rent=data.get("rent"),
        )

        if amenities:
            new_property.IU_laundry = amenities.get("IU_laundry")
            new_property.B_laundry = amenities.get("B_laundry")
            new_property.wifi = amenities.get("wifi")
            new_property.heater = amenities.get("heater")
            new_property.ac = amenities.get("ac")
            new_property.parking = amenities.get("parking")
            new_property.tv = amenities.get("tv")
            new_property.kitchen = amenities.get("kitchen")
            new_property.furnished = amenities.get("furnished")
            new_property.gym = amenities.get("gym")
            new_property.pool = amenities.get("pool")
            new_property.pet_friendly = amenities.get("pet_friendly")

        if kitchen:
            new_property.stove = kitchen.get("stove")
            new_property.utensils = kitchen.get("utensils")
            new_property.dishwasher = kitchen.get("dishwasher")
            new_property.fridge = kitchen.get("fridge")
            new_property.oven = kitchen.get("oven")
            new_property.microwave = kitchen.get("microwave")
            new_property.potpans = kitchen.get("potpans")
            new_property.coffee = kitchen.get("coffee")
            new_property.toaster = kitchen.get("toaster")

        if furniture:
            new_property.bed = furniture.get("bed")
            new_property.workspace = furniture.get("workspace")
            new_property.couch = furniture.get("couch")
            new_property.D_table = furniture.get("D_table")
            new_property.B_table = furniture.get("B_table")
            new_property.C_table = furniture.get("C_table")

        if safeties:
            new_property.S_detector = safeties.get("S_detector")
            new_property.CO_detector = safeties.get("CO_detector")
            new_property.F_extinguisher = safeties.get("F_extinguisher")

        db.add(new_property)
        db.commit()
        db.refresh(new_property)

        property_id = new_property.property_id

        availabilities = [
            Availability(
                property_id=property_id,
                start_date=date_range["startDate"],
                end_date=date_range["endDate"]
            )
            for date_range in date_ranges
        ]

        db.add_all(availabilities)
        db.commit()

        return {
            "message": "Property listing data saved.",
            "property_id": new_property.property_id,
        }

    except SQLAlchemyError as e:
        db.rollback()
        print(f"Page 1 Insert Error: {e}")
        return JSONResponse(
            status_code=500, content={"message": "Failed to save property listing."}
        )
    
@router.post("/all_listings")
async def search_request(request: Request, db: Session = Depends(get_db)):
    print("hitting backend all listings")
    data = await request.json()
    print(data)
    owner_id = data.get("user_id")

    try:
        query = db.query(Property).filter(Property.owner_id == owner_id)

        results = query.all()

        if not results:
            raise HTTPException(status_code=404, detail="No listings found for the given user.")

        print(f"Results: {results}")

        properties = []

        for property in results:
            properties.append({
                "property_id": property.property_id,
                "title": property.title,
                "rent": property.rent,
                "bedrooms": property.bedrooms,
                "bathrooms": property.bathrooms,
            })

        return {"results": properties, "message": "All listings returned successfully!",}

    except SQLAlchemyError as e:
            db.rollback()
            print(f"A SQLAlchemy error occurred: {e}")

@router.post("/page1")
async def property_page1(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    print(data)

    try:
        new_property = Property(
            #owner_id=data.get("owner_id"),
            property_type=data.get("type"),
            type=data.get("space"),
            guests_allowed=data.get("guests"),
            bedrooms=data.get("bedrooms"),
            beds=data.get("beds"),
            bathrooms=data.get("bathrooms"),
        )

        db.add(new_property)
        db.commit()
        db.refresh(new_property)

        return {
            "message": "Page 1 data saved.",
            "property_id": new_property.property_id,
        }

    except SQLAlchemyError as e:
        db.rollback()
        print(f"Page 1 Insert Error: {e}")
        return JSONResponse(
            status_code=500, content={"message": "Failed to save page 1."}
        )


@router.post("/page2")
async def property_page2(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    property_id = data.get("property_id")
    print(data)

    updates = {
        key: data.get(key)
        for key in [
            "IU_laundry",
            "B_laundry",
            "wifi",
            "heater",
            "ac",
            "parking",
            "tv",
            "kitchen",
            "furnished",
            "gym",
            "pool",
            "pet_friendly",
            "stove",
            "utensils",
            "dishwasher",
            "fridge",
            "oven",
            "microwave",
            "potpans",
            "coffee",
            "toaster",
            "bed",
            "workspace",
            "couch",
            "D_table",
            "B_table",
            "C_table",
            "S_detector",
            "CO_detector",
            "F_extinguisher",
        ]
    }

    result = update_property_fields(db, property_id, updates)
    if result:
        return {"message": "Page 2 data saved."}
    return JSONResponse(status_code=404, content={"message": "Property not found."})


@router.post("/page3")
async def property_page3(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    property_id = data.get("property_id")
    print(data)

    updates = {
        key: data.get(key)
        for key in [
            "street_address",
            "extra_info",
            "city",
            "state",
            "postal_code",
            "country",
        ]
    }

    result = update_property_fields(db, property_id, updates)
    if result:
        return {"message": "Page 3 location details saved."}
    return JSONResponse(status_code=404, content={"message": "Property not found."})


@router.post("/page4")
async def property_page4(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    property_id = data.get("property_id")
    payload = data.get("payload", {})

    updates = {
        "rent": payload.get("rent"),
        "water_fee": payload.get("water_fee"),
        "electric_fee": payload.get("electric_fee"),
    }

    result = update_property_fields(db, property_id, updates)

    availability_data = payload.get("availabiility", [])

    for entry in availability_data:
        try:
            start_date = dt_date.fromisoformat(entry[0])
            end_date = dt_date.fromisoformat(entry[1])
            availability = Availability(
                property_id=property_id,
                start_date=start_date,
                end_date=end_date
            )
            db.add(availability)
        except Exception as e:
            print(f"Error processing availability entry: {e}")

    db.commit()

    if result:
        return {"message": "Page 4 rent and dates saved."}
    return JSONResponse(status_code=404, content={"message": "Property not found."})


@router.post("/page5")
async def property_page5(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    property_id = data.get("property_id")
    print(data)

    updates = {"title": data.get("title"), "description": data.get("description")}

    result = update_property_fields(db, property_id, updates)
    if result:
        return {"message": "Page 5 title and description saved."}
    return JSONResponse(status_code=404, content={"message": "Property not found."})
