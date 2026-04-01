from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initialize the database extension
# We do NOT bind it to the app here. That happens later in the App Factory.
db = SQLAlchemy()

# Initialize the migration extension to handle PostgreSQL table updates
migrate = Migrate()