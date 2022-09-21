import "./SingleDeviceUnsubscribe.css";

function SingleDeviceUnsubscribe({ visible }) {
  return (
    <section
      id="singleDeviceUnsubscribe"
      className={visible ? "display_block" : "display_none"}
    >
      <h2 id="singleDeviceTitle">Search and update a device</h2>

      <form id="singleDeviceForm">
        <label htmlFor="deviceId" className="form-label">
          Device ID
        </label>
        <input
          type="text"
          name="deviceId"
          id="deviceID"
          placeholder="In Hex Format"
          className="form-control"
        />

        <div id="ErrorDeviceId" className="text-danger" role="alert">
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
        >
          Error validating device in sigfox
        </div>
      </form>
    </section>
  );
}

export default SingleDeviceUnsubscribe;
