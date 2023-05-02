from api.api import create_app
from api.models import setup_db

if __name__ == "__main__":
    app = create_app()
    setup_db(app)
    app.run()
