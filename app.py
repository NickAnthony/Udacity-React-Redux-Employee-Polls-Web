from api.api import create_app
from api.models import setup_db

app = create_app()
setup_db(app)

# Gunicorn doesn't set the name to __main__ so this
# won't run with gunicorn, but it's here for convienence.
if __name__ == "__main__":
    app.run()
