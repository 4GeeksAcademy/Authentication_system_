const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			user: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded");
				if(token != null && token != "" && token != undefined) setStore({token: token})
			},
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Log out");
				setStore({token: null})
			},
			login: async (email, password) => {
				//opts = options
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};

				try{
					const resp = await fetch('https://ubiquitous-space-rotary-phone-7jxpv6jj4j4hrvjw-3001.app.github.dev/api/token', opts)
					if(resp.status !== 200) {
						alert("There has been some error");
						return false;
					}

					const data = await resp.json();
					console.log("this came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({token: data.access_token})
					return true;
				}
				catch(error){
					console.error("There has been an error login in")
				}
			},	
			signup: async (email, password) => {
				const opts = {
				  method: 'POST',
				  headers: {
					"Content-Type": "application/json"
				  },
				  body: JSON.stringify({
					"email": email,
					"password": password
				  })
				};
			  
				try {
				  const resp = await fetch('https://ubiquitous-space-rotary-phone-7jxpv6jj4j4hrvjw-3001.app.github.dev/api/create-user', opts);
			  
				  if (resp.status === 201) {
					const data = await resp.json();
					console.log("User created successfully", data);
					// Store the authentication token or user ID in a more secure way
					// Update the UI with the logged-in user
					return true;
				  } else if (resp.status === 400) {
					const errorData = await resp.json();
					alert(`Error: ${errorData.message}`);
				  } else {
					alert("An unexpected error occurred");
				  }
				} catch (error) {
				  console.error("An error occurred while signing up", error);
				  alert("An error occurred while signing up");
				}
				return false;
			  },	
			getMessage: async () => {
				const store = getStore();
				const opts = {
					header: {
						"Autorization": "Beare " + store.token
					}
				}
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello", opts)
					.then(response.json())
					.then(data => setStore({message: data.message}))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
