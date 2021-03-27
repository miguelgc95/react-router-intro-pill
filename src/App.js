import React, { createContext, useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router";

import useAuthCustomHook from "./hooks/authCustomHook";

import Home from "./pages/Home";
import BeerInfo from "./pages/BeerInfo";
import Find from "./pages/Find";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import { controllerFunctions } from "./controllers";

import "./App.scss";

export const AuthContext = createContext();
export const BeersContext = createContext();

function App() {
	const [page, setPage] = useState(1);
	const [beers, setBeers] = useState([]);
	const { isAuthenticated, login, logout } = useAuthCustomHook(false);

	const cb = useCallback(async (page) => {
		const fetchedBeers = await controllerFunctions.fetchOnePageBeers(page);
		setBeers(fetchedBeers);
	}, []);

	useEffect(() => {
		cb(page);
	}, [page, cb]);

	return (
		<>
			<AuthContext.Provider value={isAuthenticated}>
				<Header login={login} logout={logout} />
				<Switch>
					<Route path="/Beers/find">
						<Find />
					</Route>
					<BeersContext.Provider value={beers}>
						<ProtectedRoute path="/beers/:beerId">
							<BeerInfo />
						</ProtectedRoute>
						<Route exact path="/">
							<Home page={page} handleSetPage={setPage} />
						</Route>
					</BeersContext.Provider>
					<Route path="*" component={NotFound} />
				</Switch>
			</AuthContext.Provider>
		</>
	);
}

export default App;
