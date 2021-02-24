import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import BeerInfo from "./pages/BeerInfo";
import Find from "./pages/Find";

import ProtectedRoute from "./components/ProtectedRoute";

import useBeersData from "./hooks/useBeersData";
import useAuth from "./hooks/useAuth";

function App() {
  const { beers, error, loading, nextPage } = useBeersData();
  const { authState, login, logout } = useAuth();

  return (
    <Switch>
      <Route
        path="/beers/find"
        render={({ match, location, history }) => (
          <Find
            match={match}
            location={location}
            history={history}
            authState={authState}
            login={login}
            logout={logout}
          />
        )}
      />
      <ProtectedRoute
        isAuthenticated={authState.isAuthenticated}
        path="/beers/:beerId"
        render={({ match, location, history }) => (
          <BeerInfo
            beers={beers}
            match={match}
            location={location}
            history={history}
            authState={authState}
            login={login}
            logout={logout}
          />
        )}
      />
      <Route
        path="/"
        render={({ match, location, history }) => (
          <Home
            beers={beers}
            error={error}
            loading={loading}
            nextPage={nextPage}
            match={match}
            location={location}
            history={history}
            authState={authState}
            login={login}
            logout={logout}
          />
        )}
      />
    </Switch>
  );
}

export default App;
