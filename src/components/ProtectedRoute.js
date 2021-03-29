import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import {GlobalContext} from '../App'


function ProtectedRoute({ ...props }) {
	const state = useContext(GlobalContext)

  return state.isAuthenticated ? <Route {...props} /> : <Redirect to="/" />;
}

export default ProtectedRoute;