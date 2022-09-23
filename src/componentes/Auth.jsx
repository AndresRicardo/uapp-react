import React from "react";
import { useState } from "react";
import "./Auth.css";

function Auth({ onSubmit }) {
  const [states, setStates] = useState({
    error: false,
    usernameErrorDisplay: "d-none",
    passwordErrorDisplay: "d-none",
    username: "",
    password: "",
  });

  //#region   /////////////////////////////// VARIABLES GLOBALES Y EXPRESIONES REGULARES
  const regexpUserName = /^[A-Za-z0-9\s]+$/;
  const regexpPassword = /^[A-Za-z0-9\s]+$/;
  //#endregion

  //#region   /////////////////////////////// LISTENERS
  const cambioUsername = (e) => {
    const statesActualizados = { ...states, username: e.target.value };
    console.log(`cambio en username`, statesActualizados.username);
    setStates(statesActualizados);
  };

  const cambioPassword = (e) => {
    const statesActualizados = { ...states, password: e.target.value };
    console.log(`cambio en password`, statesActualizados.password);
    setStates(statesActualizados);
  };

  const clicAuthButton = (e) => {
    e.preventDefault();

    //se ocultan las alarmas
    const statesActualizados = {
      error: false,
      usernameErrorDisplay: "d-none",
      passwordErrorDisplay: "d-none",
    };

    if (!regexpUserName.test(states.username)) {
      statesActualizados.error = true;
      statesActualizados.usernameErrorDisplay = "d-block";
    }
    if (!regexpPassword.test(states.password)) {
      statesActualizados.error = true;
      statesActualizados.passwordErrorDisplay = "d-block";
    }

    setStates({ ...states, ...statesActualizados });

    if (!statesActualizados.error) {
      onSubmit({ username: states.username, password: states.password });
    } else {
      onSubmit({ username: "", password: "" });
    }
  };
  //#endregion

  //#region   /////////////////////////////// RETURN
  return (
    <form id="login" action="submit" onSubmit={clicAuthButton}>
      <h2 id="AuthenticationTitle">Authentication</h2>

      <label htmlFor="username" className="form-label">
        Username
      </label>

      <input
        type="text"
        name="username"
        id="username"
        className="form-control"
        autoComplete="on"
        onChange={cambioUsername}
        required
      />

      <p
        id="usernameError"
        className={`text-danger ${states.usernameErrorDisplay}`}
        role="alert"
      >
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
        autoComplete="on"
        onChange={cambioPassword}
        required
      />

      <p
        id="passwordError"
        className={`text-danger ${states.passwordErrorDisplay}`}
        role="alert"
      >
        Password is wrong!
      </p>

      <button type="submit" id="authenticateButton" className="btn btn-primary">
        Authenticate
      </button>
    </form>
  );
  //#endregion
}

export default Auth;
