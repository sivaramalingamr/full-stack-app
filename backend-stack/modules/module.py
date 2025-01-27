from flask import Blueprint, jsonify
from flask_bcrypt import Bcrypt

module = Blueprint('module', __name__)
bycrypt = Bcrypt()

@module.route('/test/', methods=['GET'])
def test():
    return jsonify({'msg': 'test api siva from module'}), 200