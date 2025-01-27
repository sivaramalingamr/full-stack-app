from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request, decode_token
from flask_bcrypt import Bcrypt
from model.model import db, User

auth = Blueprint('auth', __name__)
bycrypt = Bcrypt()

# test api 
@auth.route('/test/', methods=['GET'])
def test():
    return jsonify({'msg': 'test api siva'}), 200

# user signup
@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    address1 = data.get('address1')
    address2 = data.get('address2')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')
    user = User.query.filter_by(username=username, email=email).first()
    print(f"{user}")

    if user:
        return jsonify({'msg': 'Email id or user id is already exists!'})
        
    new_user = User(username=username, first_name=first_name, last_name=last_name, address1=address1, address2=address2, email=email, phone=phone, password=bycrypt.generate_password_hash(password).decode('utf-8'))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'User created successfully!'}), 201

# user login 
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and bycrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
        decode_token1 = decode_token(access_token)
        print(f"{decode_token1}")
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'msg': 'Invalid user or credentials'}), 401

# debug api 
# @auth.route('/debug', methods=['GET'])
# # @jwt_required()
# def debug_headers():
#     return {"headers": dict(request.headers)}, 200 

# @auth.errorhandler(422)
# def handle_unprocessable_entity(err):
#     return jsonify({"error": "Unprocessable entity", "message": str(err)}), 422

# user list 
@auth.route('/users/list', methods=['GET'])
@jwt_required()
def user_list():
    try: 
        verify_jwt_in_request()
        current_user = get_jwt_identity()
        user = User.query.filter_by(email=current_user, is_deleted=False).first()
        if not user:
            return jsonify({'msg': 'token expired! please login agin'}), 401
        else: 
            users = user.query.all()
            return [user.to_dict() for user in users], 200
    except Exception as e:
        return jsonify({'error': e}), 401

# userlist edit
@auth.route('/users/edit/<int:id>', methods=['PUT'])
@jwt_required()
def user_edit(id):
    try:
        verify_jwt_in_request()
        current_user = get_jwt_identity()
        user = User.query.filter_by(email=current_user).first()
        if not user:
            return jsonify({'msg': 'token expired! please login agin'}), 401
        else:
            edit_user = User.query.get(id)
            if not edit_user:
                return jsonify({'error': 'User not found'}), 200

            data = request.get_json()
            edit_user, error = update_user(edit_user, data)

            if error: 
                return jsonify({'error': error}), 401
            
            return jsonify({'info': edit_user.to_dict(), 'msg':"User edit successfully!"}), 200

    except Exception as e:
        return jsonify({'error': e}), 401
            

# user delete list 
@auth.route('/users/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def user_delete(id):
    try:
        verify_jwt_in_request()
        current_user = get_jwt_identity()
        user = User.query.filter_by(email=current_user).first()
        if not user:
            return jsonify({'msg': 'token expired! please login agin'}), 401
        else:
            user = User.query.get(id)
            if not user:
                return jsonify({'error': 'User not found'}), 200
            
            user.is_deleted = True
            db.session.commit()
            return jsonify({'msg': 'User deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': e}), 401

def update_user(user, data):
    try:
        if data.get('username'):
            user.username = data.get('username')
        if data.get('first_name'):
            user.first_name = data.get('first_name')
        if data.get('last_name'):
            user.last_name = data.get('last_name')
        if data.get('address1'):
            user.address1 = data.get('address1')
        if data.get('address2'):
            user.address2 = data.get('address2')
        if data.get('email'):
            user.email = data.get('email')
        if data.get('phone'):
            user.phone = data.get('phone')
        if data.get('password'):
            user.password = bycrypt.generate_password_hash(data.get('password')).decode('utf-8')

        db.session.commit()
        return user, None
    
    except Exception as e:
        return None, e
