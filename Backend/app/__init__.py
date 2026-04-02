import os
from flask import Flask
from dotenv import load_dotenv
from app.extensions import db, migrate

# Load the .env file
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configure the database
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize tools
    db.init_app(app)
    migrate.init_app(app, db)

  # Import your models so the migration tool sees both tables
    from app.models.user_model import User
    from app.models.tasks import Task

    # Register API blueprints
    from app.api.users import users_bp
    from app.api.tasks import tasks_bp
    
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(tasks_bp, url_prefix='/api/tasks')


    @app.route('/')
    def health_check():
        return {"message": "Task Manager API is running successfully!"}, 200

    return app