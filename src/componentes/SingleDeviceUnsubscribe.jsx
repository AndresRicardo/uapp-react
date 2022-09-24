import getDevicesFromSigfox from "../getDevicesFromSigfox";
import { useRef } from "react";
import "./SingleDeviceUnsubscribe.css";

function SingleDeviceUnsubscribe({ visible, submit, username, password }) {
  const ErrorValidatingDevice = useRef();
  const ErrorDeviceId = useRef();
  const deviceID = useRef();

  const regexpDeviceId = /^[A-Fa-f0-9\s]+$/;
  const regexpUserName = /^[A-Za-z0-9\s]+$/;
  const regexpPassword = /^[A-Za-z0-9\s]+$/;

  //para establecer la fecha actual y minima permitida al input date
  // function setCurrentTime() {
  //   const tiempoTranscurrido = Date.now();
  //   const hoy = new Date(tiempoTranscurrido);
  //   dateMethod.style.display = "inline-block";
  //   const fechas = formatoFecha(hoy);
  //   dateMethod.value = fechas.plusOneYear;
  //   dateMethod.min = fechas.today;
  // }

  //cuando se hace click en el boton: Get a device from sigfox
  const clicBoton = (e) => {
    e.preventDefault();

    ErrorDeviceId.current.style.display = "none";
    ErrorValidatingDevice.current.style.display = "none";

    let globalGetDevicesResponse = {
      error: false,
      errorType: "no error",
      sigfoxResponse: {},
      origin: "",
      loadingData: true,
      pintarData: {},
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
    }; //respuesta

    if (!regexpUserName.test(username)) {
      globalGetDevicesResponse.displays.usernameErrorDisplay = "block";
      globalGetDevicesResponse.error = true;
      globalGetDevicesResponse.errorType = "username error";
    }
    if (!regexpPassword.test(password)) {
      globalGetDevicesResponse.displays.passwordErrorDisplay = "block";
      globalGetDevicesResponse.error = true;
      globalGetDevicesResponse.errorType = "password error";
    }
    if (!regexpDeviceId.test(deviceID.current.value)) {
      ErrorDeviceId.current.style.display = "block";
      globalGetDevicesResponse.displays.ErrorDeviceIdDisplay = "block";
      globalGetDevicesResponse.error = true;
      globalGetDevicesResponse.errorType = "deviceId error";
    }
    if (globalGetDevicesResponse.error) {
      globalGetDevicesResponse.loadingData = false;
      submit(globalGetDevicesResponse);
    }

    // //se pone la fecha actual y minima permitida al input date
    // setCurrentTime();

    const getdevicesResponse = getDevicesFromSigfox(
      username,
      password,
      deviceID.current.value
    );

    getdevicesResponse.then((dataJson) => {
      console.log("DATA RECIBIDA DESDE BACKEND UAAP: ");
      if (dataJson) {
        globalGetDevicesResponse.sigfoxResponse = { ...dataJson };
        globalGetDevicesResponse.origin = "single";
        console.log(globalGetDevicesResponse.sigfoxResponse);
        globalGetDevicesResponse.pintarData = { ...dataJson };

        if (dataJson.data.length !== 0) {
          globalGetDevicesResponse.displays.updateButtonDisplay =
            "inline-block";
          globalGetDevicesResponse.displays.dateMethodDisplay = "inline-block";
        } else {
          globalGetDevicesResponse.displays.updateButtonDisplay = "none";
          globalGetDevicesResponse.displays.dateMethodDisplay = "none";
        }
      } else {
        // globalGetDevicesResponse = {};
        ErrorValidatingDevice.current.style.display = "inline-block";
        globalGetDevicesResponse.displays.ErrorValidatingDeviceDisplay =
          "inline-block";
        globalGetDevicesResponse.error = true;
        globalGetDevicesResponse.errorType = "ErrorValidatingDevice";
      }
      globalGetDevicesResponse.loadingData = false;
      submit(globalGetDevicesResponse);
    });
  };

  return (
    <section
      id="singleDeviceUnsubscribe"
      className={visible.single ? "display_block" : "display_none"}
    >
      <h2 id="singleDeviceTitle">Search and update a device</h2>

      <form id="singleDeviceForm" onSubmit={clicBoton}>
        <label htmlFor="deviceId" className="form-label">
          Device ID
        </label>
        <input
          type="text"
          name="deviceId"
          id="deviceID"
          placeholder="In Hex Format"
          className="form-control"
          ref={deviceID}
          // onChange={cambioInput}
        />

        <div
          id="ErrorDeviceId"
          className="text-danger"
          role="alert"
          ref={ErrorDeviceId}
        >
          Error in device id
        </div>

        <button
          type="submit"
          id="validateSingleDeviceButton"
          className="btn btn-primary"
        >
          Get a device from sigfox
        </button>

        <div
          id="ErrorValidatingDevice"
          className="alert alert-danger"
          role="alert"
          ref={ErrorValidatingDevice}
        >
          Error validating device in sigfox
        </div>
      </form>
    </section>
  );
}

export default SingleDeviceUnsubscribe;
