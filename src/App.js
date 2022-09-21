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
  const [visibilityStates, setVisibilityStates] = useState([
    true,
    false,
    false,
    false,
  ]);

  const manejarClicOptionsMenu = (elemento) => {
    console.log("clic en la opción " + elemento);

    if (elemento === "single") setVisibilityStates([true, false, false, false]);
    if (elemento === "get") setVisibilityStates([false, true, false, false]);
    if (elemento === "multi") setVisibilityStates([false, false, true, false]);
    if (elemento === "change") setVisibilityStates([false, false, false, true]);
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
          <Auth />
          <OptionsMenu clic={manejarClicOptionsMenu} focus={visibilityStates} />
        </aside>

        <div id="container">
          <SingleDeviceUnsubscribe visible={visibilityStates[0]} />
          <GetDevicesList visible={visibilityStates[1]} />
          <MultipleDeviceUnsubscribe visible={visibilityStates[2]} />
          <ChangeArea visible={visibilityStates[3]} />
        </div>
      </main>
    </div>
  );
}

export default App;
