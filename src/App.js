import "./App.css";
import logo_sigfox from "./imagenes/Sigfox_SO_Logo_CMYK.png";
import logo_wnd from "./imagenes/Logo WND Colombia.png";
import Auth from "./componentes/Auth.jsx";
import OptionsMenu from "./componentes/OptionsMenu.jsx";
import SingleDeviceUnsubscribe from "./componentes/SingleDeviceUnsubscribe.jsx";
import GetDevicesList from "./componentes/GetDevicesList.jsx";
import MultipleDeviceUnsubscribe from "./componentes/MultipleDeviceUnsubscribe.jsx";
import ChangeArea from "./componentes/ChangeArea.jsx";

function App() {
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
          <OptionsMenu />
        </aside>

        <div id="container">
          <SingleDeviceUnsubscribe />
          <GetDevicesList />
          <MultipleDeviceUnsubscribe />
          <ChangeArea />
        </div>
      </main>
    </div>
  );
}

export default App;
