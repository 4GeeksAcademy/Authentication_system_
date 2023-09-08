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
    print(email, password, new_token)
    if new_token is None:
        return jsonify({"msg": " This email or password is incorrect"}), 401

    acess_token = create_access_token(identity=email)
    return jsonify(access_token=acess_token)

# Crearte users
@api.route('/create-user', methods=['POST'])
def create_user():
    user_email = request.json.get("email", None)
    user_password = request.json.get("password", None)

    # Check if a user with the same email already exists
    existing_user = User.query.filter_by(email=user_email).first()

    if existing_user is not None:
        return jsonify({"msg": "This email is already in use"}), 400

    # Create a new User object and set its attributes
    new_user = User(email=user_email, password=user_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201