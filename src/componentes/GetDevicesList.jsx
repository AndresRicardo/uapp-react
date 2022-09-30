import React from "react";
import { useRef } from "react";
import "./GetDevicesList.css";
import getDevicesFromSigfox from "../getDevicesFromSigfox";

function GetDevicesList({ username, password, visible, submit }) {
  console.log("Render GetDevicesList");
  const group = useRef();
  const deviceType = useRef();
  const groupError = useRef();
  const deviceTypeError = useRef();
  const ErrorGettingDevices = useRef();

  //cuando se hace click en el boton Get devices from sigfox
  const onSubmit = (e) => {
    e.preventDefault();

    // loadingData(true);

    groupError.current.style.display = "none";
    deviceTypeError.current.style.display = "none";

    const regexpGroup = /^[A-Za-z0-9\s]+$/;
    const regexpDeviceType = /^[A-Za-z0-9\s]+$/;

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

    if (!regexpGroup.test(group.current.value)) {
      groupError.style.display = "block";
      response.error = true;
    }
    if (!regexpDeviceType.test(deviceType.current.value)) {
      deviceTypeError.style.display = "block";
      response.error = true;
    }
    if (response.error) {
      response.loadingData = false;
      submit(response);
      return response;
    }

    //se pone la fecha actual y minima permitida al input date
    // setCurrentTime();

    const getdevicesResponse = getDevicesFromSigfox(
      username,
      password,
      "",
      group.value,
      deviceType.value
    );

    getdevicesResponse.then((dataJson) => {
      console.log("DATA RECIBIDA DESDE BACKEND UAAP: ");
      if (dataJson) {
        response.sigfoxResponse = { ...dataJson };
        response.origin = "multiple";
        console.log(dataJson.sigfoxResponse);
        response.pintarData = { ...dataJson };
        if (dataJson.data.length !== 0) {
          response.displays.updateButtonDisplay = "inline-block";
          response.displays.dateMethodDisplay = "inline-block";
        } else {
          response.displays.updateButtonDisplay = "none";
          response.displays.dateMethodDisplay = "none";
        }
      } else {
        ErrorGettingDevices.current.style.display = "inline-block";
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
      id="getDevicesList"
      className={visible.get ? "display_block" : "display_none"}
    >
      <h2 id="GetDeviceTitle">Search and update devices</h2>

      <form id="GetDevicesListForm" onSubmit={onSubmit}>
        <label htmlFor="group" className="form-label">
          Group ID
        </label>
        <input
          type="text"
          name="group"
          id="group"
          className="form-control"
          ref={group}
          required
        />

        <p
          id="groupError"
          className="text-danger"
          role="alert"
          ref={groupError}
        >
          Group ID is wrong!
        </p>

        <label htmlFor="deviceType" className="form-label">
          Device type ID
        </label>
        <input
          type="text"
          name="deviceType"
          id="deviceType"
          className="form-control"
          ref={deviceType}
          required
        />

        <p
          id="deviceTypeError"
          className="text-danger"
          role="alert"
          ref={deviceTypeError}
        >
          Device type ID is wrong!
        </p>

        <button type="submit" id="getDevicesButton" className="btn btn-primary">
          Get devices info from sigfox
        </button>

        <div
          id="ErrorGettingDevices"
          className="alert alert-danger"
          role="alert"
          ref={ErrorGettingDevices}
        >
          Error getting devices from sigfox
        </div>
      </form>
    </section>
  );
}

export default GetDevicesList;
