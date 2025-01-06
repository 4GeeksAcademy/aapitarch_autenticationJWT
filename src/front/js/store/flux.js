const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
		},
		actions: {
			signup: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, 
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({email, password})
						}
					);

					if (response.ok) {
						const data = await response.json();
						console.log("User registered:", data);
						return true; // Indicar éxito
					} else {
						const errorData = await response.json();
						console.error("Signup error:", errorData.msg);
						return false;
					}
				} catch (error) {
					console.error("Error during signup:", error);
					return false;
				}
			},

			login: async (email, password) => {
				try {
					const token = await fetch(`${process.env.BACKEND_URL}/api/login`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ email, password })
						}
					);

					if (token.ok) {
            			const data = await token.json();
            			sessionStorage.setItem("access_token", data.access_token); // Guardamos el token
            			console.log("User logged in:", data);
            			return true; // Inicio de sesión exitoso
        			} else {
            			const errorData = await token.json();
            			console.error("Login error:", errorData.msg);
            			return false; // Error de autenticación
        			}

				} catch {
					console.log('error')
				}
			},

			logout: () => {
				sessionStorage.removeItem("access_token"); // Eliminar el token
				console.log("User logged out");
			},

			getUser: async() => {
				const token = localStorage.getItem('token');
				try {
					const user = await fetch(`${process.env.BACKEND_URL}/api/user`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`
							}
						}
					)

					if(!user.ok) return Throw('error get user') 

					return await user.json()
				} catch {
					console.log('error')
				}
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
