import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import {GlobalContext} from '../App.js'

import { ACTIONS } from '../App'

function Header({ dispatch }) {
	const state = useContext(GlobalContext)
	return (
		<header className="bg-light p-2">
			<nav className="container d-flex align-items-center">
				<NavLink className="navbar-brand" to="/">
					Home
				</NavLink>
				<div className="navbar navbar-expand">
					<NavLink className="nav-item nav-link" to="/Beers/find">
						Find
					</NavLink>
				</div>
				<div className="d-flex ml-auto">
					{state.isAuthenticated ? (
						<div className="d-flex align-items-center">
							<p className="mb-0 mr-3">Hello!</p>
							<button
								className="btn btn-primary"
								onClick={() => dispatch({type: ACTIONS.LOGOUT})}
							>
								Logout
							</button>
						</div>
					) : (
						<button
						className="btn btn-primary"
						onClick={() => dispatch({type: ACTIONS.LOGIN})}
						>
							Login
						</button>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Header;
