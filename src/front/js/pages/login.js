import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClick = (event) => {
        // prevent the default form submission behavior
        event.preventDefault();
        actions.login(email, password)
    };

    if(store.token !== null && store.token !== "" && store.token !== undefined) navigate("/")
	return (
        <div className="container">
            <h1 className="text-center">Login</h1>
            {(store.token !== null && store.token !== "" && store.token !== undefined) ? "you are logged in with this " + store.token :
                <form onSubmit={handleClick}>
                    <div className="form-outline my-4">
                        <label className="form-label" >Email:</label>
                        <input type="text" id="form2Example1" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" >Password:</label>
                        <input type="password" id="form2Example2" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                <button onClick={handleClick} type="submit" className="btn btn-danger btn-block mb-4">Login</button>
            </form>
            }
        </div>
	);
};
