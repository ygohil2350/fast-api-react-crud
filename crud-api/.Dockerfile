# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install Poetry
RUN pip install poetry
COPY ./pyproject.toml ./poetry.lock* /tmp/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes


# Copy only the Poetry dependency files first to leverage Docker layer caching
COPY pyproject.toml poetry.lock ./

# Install pip dependencies
COPY --from=requirements /app/requirements.txt /app/
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy the entire app directory into the container
COPY app ./app

# Expose the FastAPI default port
EXPOSE 8000

# Command to run the FastAPI application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
