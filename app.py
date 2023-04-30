from flask import Flask, send_from_directory
from flask_restful import Resource, Api
from flask_cors import CORS #comment this on deployment

app = Flask(__name__, static_url_path='', static_folder='build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def index(path):
    return send_from_directory(app.static_folder,'index.html')
