FROM python:3.12.4-slim AS requirements
WORKDIR /tmp

# Install poetry in order to export a minimal requirements file
RUN pip install poetry
COPY ./pyproject.toml ./poetry.lock* /tmp/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.12.4-slim

# Dependencies:
#  - Install curl for container healthchecks
#  - Install gcc to support psutil on arm64 architecture
#  - Install wkhtmltopdf for publishing reports to ETMF (e.g. SQ Report & SQ Checklist)
RUN apt-get update &&  \
    apt-get install -y software-properties-common gcc curl wkhtmltopdf && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

# Install pip dependencies
COPY --from=requirements /tmp/requirements.txt /app/
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy the application
COPY ./app /app/app
COPY ./poetry.lock /app/poetry.lock
COPY ./pyproject.toml /app/pyproject.toml

# Define entrypoint
WORKDIR /app
EXPOSE 80
HEALTHCHECK \
    CMD curl --fail http://localhost/ctms/healthCheck
