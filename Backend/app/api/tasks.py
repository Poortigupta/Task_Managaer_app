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

# PUT route to edit a task (e.g., mark as completed)
@tasks_bp.route('/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json()
    # Update fields if they are provided in the request
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'is_completed' in data:
        task.is_completed = data['is_completed']

    db.session.commit()
    return jsonify({"message": "Task updated!", "task": task.to_dict()}), 200

# DELETE route to remove a task
@tasks_bp.route('/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully!"}), 200