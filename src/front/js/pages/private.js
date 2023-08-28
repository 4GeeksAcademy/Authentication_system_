import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Private = () => {
	const { store, actions } = useContext(Context);
	const [autorise, setAutorize] = useState(false); 

		useEffect(() => {
			if(store.token && sessionStorage.token != "" && store.token != undefined) {
				setAutorize(true) 
				actions.getMessage();
			}
		}, [store.token])

	return (

		<div>{autorise == true ? <p>You are Autorize</p> : <p>You aren't Autorize --- Login</p>
		}
		</div>
	);
};
