import React from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
	return (
        <div className="container">
            <h1 className="text-center mt-3">Sing up</h1>
            <form className ="form" >
                <label for="inputPassword5" className="form-label">Email:</label>
                <input type="email" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                <br />
                <label for="inputPassword5" className="form-label">Password:</label>
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                <br />
                <Link to="/login">
                    <button type="submit" className="btn btn-danger mb-3">Sign up</button>
                </Link>
            </form>
        </div>
	);
};
