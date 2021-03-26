import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router";

import Home from "./pages/Home";
import BeerInfo from "./pages/BeerInfo";
import Find from "./pages/Find";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import { controllerFunctions } from "./controllers";

import "./App.scss";

function useLocalStorage(deps) {
	useEffect(() => {
		localStorage.setItem("authState", JSON.stringify(deps));
	}, [deps]);
}

function loadAuthState() {
	const authState = localStorage.getItem("authState");

	if (authState === null) {
		return {
			isAuthenticated: false,
		};
	}

	return JSON.parse(authState);
}

function App() {
	const [authState, setAuthState] = useState(() => loadAuthState());
	const [page, setPage] = useState(1);
	const [beers, setBeers] = useState([]);

	const cb = useCallback(async (page) => {
		const fetchedBeers = await controllerFunctions.fetchOnePageBeers(page);
		setBeers(fetchedBeers);
	}, []);

	useEffect(() => {
		cb(page);
	}, [page, cb]);

	const { isAuthenticated } = authState;

	useLocalStorage(authState);

	function login() {
		setAuthState({
			isAuthenticated: true,
		});
	}

	function logout() {
		setAuthState({
			isAuthenticated: false,
		});
	}

	return (
		<>
			<Header
				isAuthenticated={isAuthenticated}
				login={login}
				logout={logout}
			/>
			<Switch>
				<Route path="/Beers/find">
					<Find />
				</Route>
				<ProtectedRoute
					isAuthenticated={isAuthenticated}
					path="/beers/:beerId"
				>
					<BeerInfo beers={beers} />
				</ProtectedRoute>
				<Route exact path="/">
					<Home beers={beers} page={page} handleSetPage={setPage} />
				</Route>
				<Route path="*" component={NotFound} />
			</Switch>
		</>
	);
}

export default App;
