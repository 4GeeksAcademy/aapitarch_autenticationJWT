import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions } = useContext(Context); // Usamos el contexto para acceder a las acciones
	const navigate = useNavigate(); // Para redirigir al usuario

	const handleLogout = () => {
		actions.logout(); // Llamamos a la acción logout (elimina el token del sessionStorage)
		navigate("/login"); // Redirigimos al login
	};

	// Verificamos si el usuario está autenticado
	const isAuthenticated = sessionStorage.getItem("access_token");

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!isAuthenticated ? (
						<Link to="/signup">
							<button className="btn btn-primary">Register</button>
						</Link>
					) : (
						<button onClick={handleLogout} className="btn btn-danger">
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
