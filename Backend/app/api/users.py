from flask import Blueprint, request, jsonify
from app.services.user_service import create_user, get_all_users

users_bp = Blueprint('users', __name__)

@users_bp.route('/', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')

    # Basic validation
    if not username or not email:
        return jsonify({"error": "Username and email are required"}), 400

    user, error = create_user(username, email)
    
    if error:
        return jsonify({"error": error}), 409

    return jsonify({
        "message": "User successfully created", 
        "user": user.to_dict()
    }), 201

@users_bp.route('/', methods=['GET'])
def list_users():
    users = get_all_users()
    return jsonify([user.to_dict() for user in users]), 200