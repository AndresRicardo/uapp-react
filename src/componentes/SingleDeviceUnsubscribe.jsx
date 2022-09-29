import getDevicesFromSigfox from "../getDevicesFromSigfox";
import { useRef } from "react";
import "./SingleDeviceUnsubscribe.css";

function SingleDeviceUnsubscribe({ visible, submit, username, password }) {
  console.log("Render SingleDeviceUnsubscribe");
  const ErrorValidatingDevice = useRef();
  const ErrorDeviceId = useRef();
  const deviceID = useRef();

  const regexpDeviceId = /^[A-Fa-f0-9\s]+$/;
  const regexpUserName = /^[A-Za-z0-9\s]+$/;
  const regexpPassword = /^[A-Za-z0-9\s]+$/;

  //cuando se hace click en el boton: Get a device from sigfox
  const clicBoton = (e) => {
    e.preventDefault();

    ErrorDeviceId.current.style.display = "none";
    ErrorValidatingDevice.current.style.display = "none";

    let response = {
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
      response.displays.usernameErrorDisplay = "block";
      response.error = true;
      response.errorType = "username error";
    }
    if (!regexpPassword.test(password)) {
      response.displays.passwordErrorDisplay = "block";
      response.error = true;
      response.errorType = "password error";
    }
    if (!regexpDeviceId.test(deviceID.current.value)) {
      ErrorDeviceId.current.style.display = "block";
      response.displays.ErrorDeviceIdDisplay = "block";
      response.error = true;
      response.errorType = "deviceId error";
    }
    if (response.error) {
      response.loadingData = false;
      submit(response);
      return response;
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
        response.sigfoxResponse = { ...dataJson };
        response.origin = "single";
        console.log(response.sigfoxResponse);
        response.pintarData = { ...dataJson };

        if (dataJson.data.length !== 0) {
          response.displays.updateButtonDisplay = "inline-block";
          response.displays.dateMethodDisplay = "inline-block";
        } else {
          response.displays.updateButtonDisplay = "none";
          response.displays.dateMethodDisplay = "none";
        }
      } else {
        // globalGetDevicesResponse = {};
        ErrorValidatingDevice.current.style.display = "inline-block";
        response.displays.ErrorValidatingDeviceDisplay = "inline-block";
        response.error = true;
        response.errorType = "ErrorValidatingDevice";
      }
      response.loadingData = false;
      submit(response);
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
