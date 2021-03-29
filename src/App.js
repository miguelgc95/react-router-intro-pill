import React, { useEffect, useReducer, createContext } from "react";
import { Route, Switch } from "react-router";

import Home from "./pages/Home";
import BeerInfo from "./pages/BeerInfo";
import Find from "./pages/Find";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import { controllerFunctions } from "./controllers";

import "./App.scss";

export const ACTIONS = {
	INCREMENT_PAGE: "incrementPage",
	DECREMENT_PAGE: "decrementPage",
	FETCH_BEERS_LOADING: "loadingFetchBeers",
	FETCH_BEERS_SUCCES: "succesFetchBeers",
	FETCH_BEERS_ERROR: "errorFetchBeers",
	LOGIN: "login",
	LOGOUT: "logout",
};

export const GlobalContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.INCREMENT_PAGE:
			return {
				...state,
				page: state.page + 1,
			};
		case ACTIONS.DECREMENT_PAGE:
			return {
				...state,
				page: state.page - 1,
			};
		case ACTIONS.FETCH_BEERS_LOADING:
			console.log("loading...");
			return state;
		case ACTIONS.FETCH_BEERS_SUCCES:
			return {
				...state,
				beers: action.payload,
			};
		case ACTIONS.FETCH_BEERS_ERROR:
			console.log("something went wrong");
			return state;
		case ACTIONS.LOGIN:
			return {
				...state,
				isAuthenticated: true,
			};
		case ACTIONS.LOGOUT:
			return {
				...state,
				isAuthenticated: false,
			};
		default:
			break;
	}
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

	const initState = {
		page: 1,
		beers: [],
		isAuthenticated: loadAuthState(),
	};

	const [state, dispatch] = useReducer(reducer, initState);

	useEffect(() => {
		fetchBeers(state.page);
	}, [state.page]);

	useEffect(() => {
		localStorage.setItem("authState", JSON.stringify(state.isAuthenticated));
	}, [state.isAuthenticated]);

	const fetchBeers = async (page) => {
		dispatch({ type: ACTIONS.FETCH_BEERS_LOADING });
		const beers = await controllerFunctions.fetchOnePageBeers(page);
		try {
			dispatch({ type: ACTIONS.FETCH_BEERS_SUCCES, payload: beers });
		} catch (e) {
			dispatch({ type: ACTIONS.FETCH_BEERS_ERROR });
		}
	};

	return (
		<>
			<GlobalContext.Provider value={state}>
				<Header dispatch={dispatch} />
				<Switch>
					<Route path="/Beers/find">
						<Find />
					</Route>
					<ProtectedRoute path="/beers/:beerId">
						<BeerInfo />
					</ProtectedRoute>
					<Route exact path="/">
						<Home dispatch={dispatch} />
					</Route>
					<Route path="*" component={NotFound} />
				</Switch>
			</GlobalContext.Provider>
		</>
	);
}

export default App;
