import React, { useEffect, useState }from "react";
import { Route, Switch } from "react-router";

import Home from "./pages/Home";
import BeerInfo from "./pages/BeerInfo";
import Find from "./pages/Find";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

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
    <Header isAuthenticated={isAuthenticated} login={login} logout={logout} />
    <Switch>
      <Route path='/Beers/find' component={Find} />{/* I think I should add some param to dthe URL */}
      <ProtectedRoute isAuthenticated={isAuthenticated} path='/beerInfo/:beerId' component={BeerInfo} />{/* should I add to the URL where do the user came from?? */}
      <Route exact path='/' component={Home} />{/* I think I should add the current page param to the URL */}
      <Route path='*' component={NotFound} />
    </Switch>
    </>
  );
}

export default App;
