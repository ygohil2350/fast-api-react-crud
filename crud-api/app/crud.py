from sqlalchemy.orm import Session
from models import Personal
from schemas import PersonalSchema


def get_personal(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Personal).offset(skip).limit(limit).all()


def get_personal_by_id(db: Session, personal_id: int):
    return db.query(Personal).filter(Personal.id == personal_id).first()


def create_personal(db: Session, personal: PersonalSchema):
    _personal = Personal(
        first_name=personal.first_name, last_name=personal.last_name, age=personal.age
    )
    db.add(_personal)
    db.commit()
    db.refresh(_personal)
    return _personal


def remove_personal(db: Session, personal_id: int):
    _personal = get_personal_by_id(db=db, personal_id=personal_id)
    db.delete(_personal)
    db.commit()


def update_personal(
    db: Session, personal_id: int, first_name: str, last_name: str, age: int
):
    _personal = get_personal_by_id(db=db, personal_id=personal_id)
    _personal.first_name = first_name
    _personal.last_name = last_name
    _personal.age = age

    db.commit()
    db.refresh(_personal)
    return _personal
