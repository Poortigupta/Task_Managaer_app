from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.tasks import Task

tasks_bp = Blueprint('tasks', __name__)

# GET route to see all tasks
@tasks_bp.route('/', methods=['GET'])
def get_all_tasks():
    tasks = Task.query.all()
    # Convert all task objects to dictionaries and return as JSON
    return jsonify([task.to_dict() for task in tasks]), 200

# POST route to create a new task
@tasks_bp.route('/', methods=['POST'])
def create_task():
    data = request.get_json()

    # Simple validation
    if not data or not data.get('title') or not data.get('user_id'):
        return jsonify({"error": "Title and user_id are required"}), 400

    # Create the new task
    new_task = Task(
        title=data.get('title'),
        description=data.get('description', ''),
        user_id=data.get('user_id')
    )

    # Save to the PostgreSQL database
    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        "message": "Task created successfully!",
        "task": new_task.to_dict()
    }), 201