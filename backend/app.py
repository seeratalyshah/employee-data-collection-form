from flask import Flask
from config import Config
from db import db
import logging
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for all routes and origins
CORS(app)

db.init_app(app)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import models and routes
with app.app_context():
    from models import *
    from routes import *
    # Create tables
    db.create_all()
    logger.info("Database connected and tables created.")

if __name__ == '__main__':
    app.run(debug=True)
