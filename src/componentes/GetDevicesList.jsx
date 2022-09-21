import React from "react";
import "./GetDevicesList.css";

function GetDevicesList({ visible }) {
  return (
    <section
      id="getDevicesList"
      className={visible ? "display_block" : "display_none"}
    >
      <h2 id="GetDeviceTitle">Search and update devices</h2>

      <form id="GetDevicesListForm">
        <label htmlFor="group" class="form-label">
          Group ID
        </label>
        <input
          type="text"
          name="group"
          id="group"
          class="form-control"
          required
        />

        <p id="groupError" class="text-danger" role="alert">
          Group ID is wrong!
        </p>

        <label htmlFor="deviceType" class="form-label">
          Device type ID
        </label>
        <input
          type="text"
          name="deviceType"
          id="deviceType"
          class="form-control"
          required
        />

        <p id="deviceTypeError" class="text-danger" role="alert">
          Device type ID is wrong!
        </p>

        <button type="submit" id="getDevicesButton" class="btn btn-primary">
          Get Devices From Sigfox
        </button>

        <div id="ErrorGettingDevices" class="alert alert-danger" role="alert">
          Error getting devices from sigfox
        </div>
      </form>
    </section>
  );
}

export default GetDevicesList;
