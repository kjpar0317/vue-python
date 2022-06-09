FROM python:3.10.3-slim-buster as build-backend

RUN apt-get update && \
  apt-get -y install gcc libmariadb-dev

RUN python -m pip install --upgrade pip
RUN pip install poetry

WORKDIR /app/backend
ENV POETRY_VIRTUALENVS_IN_PROJECT=true

COPY backend/pyproject.toml backend/poetry.lock ./

# RUN poetry config virtualenvs.create true
RUN poetry install --no-dev
COPY backend/app ./app


FROM node:latest as build-frontend

WORKDIR /app/frontend

COPY frontend/package.json frontend/*.config.js frontend/index.html ./
RUN npm install

COPY frontend/src src/
COPY frontend/public public/

RUN npm run build


FROM nginx/unit:1.26.1-python3.10

WORKDIR /app

COPY --from=build-backend /app/backend backend
COPY --from=build-frontend /app/frontend/dist frontend

COPY docker/config.json /docker-entrypoint.d/config.json