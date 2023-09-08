import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Signup = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = (event) => {
        // prevent the default form submission behavior
        event.preventDefault();
        actions.signup(email, password)
        console.log("okkkkk")
    };
	return (
        <div className="container">
            <h1 className="text-center mt-3">Sing up</h1>
            <form className ="form" onSubmit={handleClick}>
                <label for="inputPassword5" className="form-label">Email:</label>
                <input type="email" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label for="inputPassword5" className="form-label">Password:</label>
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <Link to="/login">
                    <button type="submit" onClick={handleClick} className="btn btn-danger mb-3">Sign up</button>
                </Link>
            </form>
        </div>
	);
};
