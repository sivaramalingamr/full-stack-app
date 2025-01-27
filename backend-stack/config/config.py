import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:admin$12345@localhost:5432/python_integration')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'siva-test'
    JWT_ACCESS_TOKEN_EXPIRES= timedelta(minutes=20)