import React from "react";
import "./Auth.css";

function Auth() {
  return (
    <form id="login" action="submit">
      <h2 id="AuthenticationTitle">Authentication</h2>

      <label htmlFor="username" className="form-label">
        Username
      </label>

      <input
        type="text"
        name="username"
        id="username"
        className="form-control"
        autocomplete="on"
        required
      />

      <p id="usernameError" className="text-danger" role="alert">
        Username is wrong!
      </p>

      <label htmlFor="password" className="form-label">
        Password
      </label>

      <input
        type="text"
        name="password"
        id="password"
        className="form-control"
        autocomplete="on"
        required
      />

      <p id="passwordError" className="text-danger" role="alert">
        Password is wrong!
      </p>

      <button type="submit" id="authenticateButton" className="btn btn-primary">
        Authenticate
      </button>
    </form>
  );
}

export default Auth;
