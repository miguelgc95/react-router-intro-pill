import React from "react";

function Header({ isAuthenticated, login, logout }) {
  return (
    <header className="bg-light p-2">
      <nav className="container d-flex align-items-center">
        <a className="navbar-brand" href="/">
          Home
        </a>
        <div className="navbar navbar-expand">
          <a className="nav-item nav-link" href="/beers/find">
            Find
          </a>
        </div>
        <div className="d-flex ml-auto">
          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <p className="mb-0 mr-3">Hello!</p>
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={login}>
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
