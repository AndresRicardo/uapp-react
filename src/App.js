import "./App.css";
import logo_sigfox from "./imagenes/Sigfox_SO_Logo_CMYK.png";
import logo_wnd from "./imagenes/Logo WND Colombia.png";
import Auth from "./componentes/Auth.jsx";
import OptionsMenu from "./componentes/OptionsMenu.jsx";
import SingleDeviceUnsubscribe from "./componentes/SingleDeviceUnsubscribe.jsx";
import GetDevicesList from "./componentes/GetDevicesList.jsx";
import MultipleDeviceUnsubscribe from "./componentes/MultipleDeviceUnsubscribe.jsx";
import ChangeArea from "./componentes/ChangeArea.jsx";
import { useState } from "react";

function App() {
  const [states, setStates] = useState({
    visibility: {
      single: true,
      get: false,
      multi: false,
      change: false,
    },
    globalUsername: "",
    globalPassword: "",
    globalGetDevicesResponse: { sigfoxResponse: { data: [] } }, //data recibida desde sigfox
    globalUnsubscribeResponse: {}, //data recibida desde sigfox
  });

  const clicOptionsMenu = (elemento) => {
    console.log("clic en la opción " + elemento);
    const visibilityActualizada = {};

    for (const key in states.visibility) {
      if (Object.hasOwnProperty.call(states.visibility, key)) {
        if (elemento === key) visibilityActualizada[key] = true;
        else visibilityActualizada[key] = false;
      }
    }
    setStates({ ...states, visibility: visibilityActualizada });
  };

  const clicAuthenticate = (credentials) => {
    setStates({
      ...states,
      globalUsername: credentials.username,
      globalPassword: credentials.password,
    });
  };

  const clicValidateSingleDeviceButton = (respuesta) => {
    console.log("data recibida en app: ", respuesta);
    setStates({
      ...states,
      globalGetDevicesResponse: { ...respuesta },
    });
  };

  return (
    <div className="App">
      <header>
        <div id="logoSigfoxOperator">
          <img src={logo_sigfox} alt="Logo sigfox" />
        </div>
        <h1>UNSUBSCRIBE DEVICE APP</h1>
        <div id="logoWnd">
          <img src={logo_wnd} alt="Logo wnd colombia" />
        </div>
      </header>

      <main id="main">
        <aside id="sidebar">
          <Auth onSubmit={clicAuthenticate} />
          <OptionsMenu clic={clicOptionsMenu} focus={states.visibility} />
        </aside>

        <div id="container">
          <SingleDeviceUnsubscribe
            visible={states.visibility}
            username={states.globalUsername}
            password={states.globalPassword}
            submit={clicValidateSingleDeviceButton}
          />
          <GetDevicesList visible={states.visibility} />
          <MultipleDeviceUnsubscribe visible={states.visibility} />
          <ChangeArea
            visible={states.visibility}
            globalData={{ ...states.globalGetDevicesResponse }}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
