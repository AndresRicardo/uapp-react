import React from "react";
import "./GetDevicesList.css";

function GetDevicesList({ visible }) {
  return (
    <section
      id="getDevicesList"
      className={visible.get ? "display_block" : "display_none"}
    >
      <h2 id="GetDeviceTitle">Search and update devices</h2>

      <form id="GetDevicesListForm">
        <label htmlFor="group" className="form-label">
          Group ID
        </label>
        <input
          type="text"
          name="group"
          id="group"
          className="form-control"
          required
        />

        <p id="groupError" className="text-danger" role="alert">
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
          required
        />

        <p id="deviceTypeError" className="text-danger" role="alert">
          Device type ID is wrong!
        </p>

        <button type="submit" id="getDevicesButton" className="btn btn-primary">
          Get Devices From Sigfox
        </button>

        <div
          id="ErrorGettingDevices"
          className="alert alert-danger"
          role="alert"
        >
          Error getting devices from sigfox
        </div>
      </form>
    </section>
  );
}

export default GetDevicesList;
