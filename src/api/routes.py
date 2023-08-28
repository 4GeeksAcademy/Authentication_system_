"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

#create flask app
api = Blueprint('api', __name__)

@api.route('/hello', methods=['GET'])
# to make it private. Only the people that already have a token can get acess
@jwt_required()
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#Create a route to authenticate your users and return JWTs.
#Create_acess_token() function is used to actually generate the JWT.
@api.route('/token', methods=['POST'])
def handle_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    new_token = User.query.filter_by(email=email, password=password).first()
    if new_token is None:
        return jsonify({"msg": " This email or password is incorrect"}), 401

    acess_token = create_access_token(identity=email)
    return jsonify(access_token=acess_token)

# Crearte users
@api.route('/create-user', methods=['POST'])
def create_user():
    
    user = User()
    user.email = request.json.get("email", None)
    user.password = request.json.get("password", None)
    new_user = User.query.filter_by(email=user.email, password=user.password).first()
    if new_user is None:
        return jsonify({"msg": " This email or password is incorrect"}), 401
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize())
