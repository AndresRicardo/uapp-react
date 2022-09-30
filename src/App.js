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
  console.log("Render App");
  const [states, setStates] = useState({
    visibility: {
      single: true,
      get: false,
      multi: false,
      change: false,
    },
    globalUsername: "",
    globalPassword: "",
    globalGetDevicesResponse: {
      error: false,
      errorType: "no error",
      sigfoxResponse: {
        data: [
          {
            id: "",
            deviceType: { id: "" },
            group: { id: "" },
            token: { end: "" },
            verificacion: undefined,
          },
        ],
      },
      origin: "",
      loadingData: true,
      pintarData: {
        data: [
          {
            id: "",
            deviceType: { id: "" },
            group: { id: "" },
            token: { end: "" },
          },
        ],
      },
      displays: {
        usernameErrorDisplay: "none",
        passwordErrorDisplay: "none",
        changeAreaDisplay: "none",
        alertErrorDisplay: "none",
        alertSuccessDisplay: "none",
        devicesTableDisplay: "none",
        ErrorDeviceIdDisplay: "none",
        ErrorValidatingDeviceDisplay: "none",
        updateButtonDisplay: "none",
        dateMethodDisplay: "none,",
      },
    }, //data recibida desde sigfox
    globalUnsubscribeResponse: {}, //data recibida desde sigfox
  });

  const clicOptionsMenu = (elemento) => {
    console.log("clic en la opción " + elemento);
    const estadoActualizado = { ...states };

    for (const key in estadoActualizado.visibility) {
      if (key === elemento) estadoActualizado.visibility[key] = true;
      else estadoActualizado.visibility[key] = false;
    }
    setStates(estadoActualizado);
  };

  const clicAuthenticate = (credentials) => {
    setStates({
      ...states,
      globalUsername: credentials.username,
      globalPassword: credentials.password,
    });
  };

  const clicValidateSingleDeviceButton = (respuesta) => {
    console.log("data recibida en app desde single: ", respuesta);
    setStates({
      ...states,
      globalGetDevicesResponse: { ...respuesta },
    });
  };

  const clicValidateGetDevicesButton = (respuesta) => {
    console.log("data recibida en app desde multi: ", respuesta);
    setStates({
      ...states,
      globalGetDevicesResponse: { ...respuesta },
    });
  };

  const changeCsv = (respuesta) => {
    console.log("data recibida en app desde csv: ", respuesta);
    setStates({
      ...states,
      globalGetDevicesResponse: { ...respuesta },
    });
  };

  const clicValidateCsvButton = (respuesta) => {
    console.log("data verificada recibida en app desde csv: ", respuesta);
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
          <GetDevicesList
            visible={states.visibility}
            username={states.globalUsername}
            password={states.globalPassword}
            submit={clicValidateGetDevicesButton}
          />
          <MultipleDeviceUnsubscribe
            visible={states.visibility}
            // username={states.globalUsername}
            // password={states.globalPassword}
            username={"62f190d07bfbda5b55622bf2"}
            password={"dcf6382589f19f351a2f9f20cfe36bfe"}
            dataFromCsv={{ ...states.globalGetDevicesResponse }}
            submit={clicValidateCsvButton}
            changeCsv={changeCsv}
          />
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
