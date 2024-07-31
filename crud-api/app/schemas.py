from typing import List, Optional, Generic, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")


class PersonalSchema(BaseModel):
    id: Optional[int] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None

    class Config:
        from_attributes = True


class Request(BaseModel, Generic[T]):
    parameter: Optional[T] = Field(...)


class RequestPersonal(BaseModel):
    parameter: PersonalSchema = Field(...)


class Response(BaseModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T]
