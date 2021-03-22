import { useState, useEffect, useCallback } from "react";

function loadAuthState() {
  const authState = localStorage.getItem("authState");

  if (authState === null) {
    return {
      isAuthenticated: false,
    };
  }

  return JSON.parse(authState);
}

function useAuth() {
  const [authState, setAuthState] = useState(() => loadAuthState());

  const login = useCallback(() => {
    setAuthState({
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  return {
    authState: authState,
    login: login,
    logout: logout,
  };
}

export default useAuth;
