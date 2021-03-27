import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router";

import useAuthCustomHook from './hooks/authCustomHook';

import Home from "./pages/Home";
import BeerInfo from "./pages/BeerInfo";
import Find from "./pages/Find";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import { controllerFunctions } from "./controllers";

import "./App.scss";

function App() {
	const [page, setPage] = useState(1);
	const [beers, setBeers] = useState([]);
	const { isAuthenticated, login, logout} = useAuthCustomHook(false)

	const cb = useCallback(async (page) => {
		const fetchedBeers = await controllerFunctions.fetchOnePageBeers(page);
		setBeers(fetchedBeers);
	}, []);

	useEffect(() => {
		cb(page);
	}, [page, cb]);

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
