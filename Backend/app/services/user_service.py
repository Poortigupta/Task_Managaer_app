from app.extensions import db
from app.models.user_model import User

def create_user(username, email):
    # Check if a user with this email already exists
    if User.query.filter_by(email=email).first():
        return None, "Email already exists"

    new_user = User(username=username, email=email)
    
    db.session.add(new_user)
    db.session.commit()
    
    return new_user, None

def get_all_users():
    return User.query.all()