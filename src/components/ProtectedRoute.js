import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import {AuthContext} from '../App'


function ProtectedRoute({ ...props }) {
	const isAuthenticated = useContext(AuthContext)

  return isAuthenticated ? <Route {...props} /> : <Redirect to="/" />;
}

export default ProtectedRoute;