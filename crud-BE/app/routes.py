from fastapi import APIRouter, HTTPException, Path
from fastapi import Depends
from config import SessionLocal
from sqlalchemy.orm import Session
from schemas import PersonalSchema, Request, Response, RequestPersonal

import crud

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create")
async def create_personal_service(
    request: RequestPersonal, db: Session = Depends(get_db)
):
    crud.create_personal(db, personal=request.parameter)
    return Response(
        status="Ok", code="200", message="Personal created successfully"
    ).dict(exclude_none=True)


@router.get("/")
async def get_personals(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    _personals = crud.get_personal(db, skip, limit)
    return Response(
        status="Ok", code="200", message="Success fetch all data", result=_personals
    )


@router.patch("/update")
async def update_personal(request: RequestPersonal, db: Session = Depends(get_db)):
    _personal = crud.update_personal(
        db,
        personal_id=request.parameter.id,
        first_name=request.parameter.first_name,
        last_name=request.parameter.last_name,
        age=request.parameter.age,
    )
    return Response(
        status="Ok", code="200", message="Success update data", result=_personal
    )


@router.delete("/delete")
async def delete_personal(request: RequestPersonal, db: Session = Depends(get_db)):
    crud.remove_personal(db, personal_id=request.parameter.id)
    return Response(status="Ok", code="200", message="Success delete data").dict(
        exclude_none=True
    )
