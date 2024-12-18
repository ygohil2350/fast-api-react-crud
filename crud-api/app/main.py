from fastapi import FastAPI
import models
from routes import router
from config import engine
from datetime import datetime
from loguru import logger
import uvicorn

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router, prefix="/personal", tags=["personal"])


@app.get("/crud/healthCheck")
async def root():
    return {
        "message": "healthCheck Done at {}".format(
            datetime.utcnow().strftime("%B %d %Y - %H:%M:%S")
        )
    }


# Launch for local development
if __name__ == "__main__":
    logger.info("Listening on 0.0.0.0:8001")
    uvicorn.run("main:app", host="127.0.0.1", port=4000, reload=True)
