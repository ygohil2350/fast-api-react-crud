from fastapi import FastAPI
import models
from routes import router
from config import engine
from loguru import logger

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router, prefix="/personal", tags=["personal"])

# Launch for local development
if __name__ == "__main__":
    import uvicorn

    logger.info("Listening on 0.0.0.0:8001")
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
