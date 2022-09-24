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
    // loadingData(true);
    // usernameError.style.display = "none";
    // passwordError.style.display = "none";
    // changeArea.style.display = "none";
    // alertError.style.display = "none";
    // alertSuccess.style.display = "none";
    // devicesTable.style.display = "none";
    ErrorDeviceId.current.style.display = "none";
    ErrorValidatingDevice.current.style.display = "none";

    let globalGetDevicesResponse = {}; //se vacia la variable con anteriores respuestas

    let error = false;

    if (!regexpUserName.test(username)) {
      // usernameError.style.display = "block";
      error = true;
    }
    if (!regexpPassword.test(password)) {
      // passwordError.style.display = "block";
      error = true;
    }
    if (!regexpDeviceId.test(deviceID.current.value)) {
      ErrorDeviceId.current.style.display = "block";
      error = true;
    }
    if (error) {
      // loadingData(false);
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
        globalGetDevicesResponse = { ...dataJson };
        globalGetDevicesResponse["origin"] = "single";
        console.log(globalGetDevicesResponse);
        // pintarData(dataJson);
        // if (dataJson.data.length != 0) {
        // updateButton.style.display = "inline-block";
        // dateMethod.style.display = "inline-block";
        // } else {
        // updateButton.style.display = "none";
        // dateMethod.style.display = "none";
        // }
      } else {
        globalGetDevicesResponse = {};
        ErrorValidatingDevice.current.style.display = "inline-block";
      }
      submit(globalGetDevicesResponse);
      //   loadingData(false);
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
