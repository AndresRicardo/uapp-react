import "./MultipleDeviceUnsubscribe.css";

function MultipleDeviceUnsubscribe({ visible }) {
  return (
    <section
      id="multipleDeviceUnsubscribe"
      className={visible.multi ? "display_block" : "display_none"}
    >
      <h2 id="multipleDeviceTitle">Load and update devices from csv file</h2>

      <form id="multipleDeviceForm">
        <label htmlFor="csvFile" className="form-label">
          Upload .csv file
        </label>
        <input
          type="file"
          name="csvFile"
          id="csvFileInput"
          placeholder="In Hex Format"
          className="form-control"
        />

        <button
          type="submit"
          id="validateDevicesButton"
          className="btn btn-primary"
        >
          Validate Devices
        </button>

        <div
          id="ErrorValidatingDevices"
          className="alert alert-danger"
          role="alert"
        >
          Error validating devices in sigfox
        </div>
      </form>
    </section>
  );
}

export default MultipleDeviceUnsubscribe;
