from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config.config import Config
from modules.auth import auth
from model.model import db
from modules.module import module

app = Flask(__name__)
app.config.from_object(Config)
# app.config['JWT_SECRET_KEY'] = 'user-validation'
# app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    
db.init_app(app)

with app.app_context():
    db.create_all()

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(auth, url_prefix='/api/auth')
app.register_blueprint(module, url_prefix='/api/module')
jwt = JWTManager(app)

if __name__ == '__main__':
    app.run(debug=True)
