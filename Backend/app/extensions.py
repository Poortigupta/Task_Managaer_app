from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Setting these up here to avoid circular import errors. 
# They get bound to the actual Flask app later in __init__.py.
db = SQLAlchemy()
migrate = Migrate()