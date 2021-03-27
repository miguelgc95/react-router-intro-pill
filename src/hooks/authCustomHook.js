import { useState, useEffect } from "react";

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

function useAuthCustomHook() {
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

	return {
		isAuthenticated,
		login,
		logout,
	};
}

export default useAuthCustomHook;
