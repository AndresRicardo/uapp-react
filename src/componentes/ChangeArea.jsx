import "./ChangeArea.css";

function ChangeArea({ visible }) {
  return (
    <div
      id="changeArea"
      className={visible.change ? "display_block" : "display_none"}
    >
      <div id="changeAreaInputs">
        <select
          name="methodSelector"
          id="methodSelector"
          className="form-select"
          aria-label="Default select example"
          defaultValue={"Unsubscription Date"}
        >
          <option value="unsubscriptionDate">Unsubscription Date</option>
          <option value="subscriptionDuration">Unsubscription Duration</option>
        </select>

        <input type="date" id="dateMethod" className="form-control" />

        <input
          type="datetime"
          id="durationMethod"
          className="form-control"
          placeholder="1 Year"
        />

        <button type="submit" id="updateButton" className="btn btn-primary">
          Update
        </button>
      </div>

      <div id="changeAreaAlerts">
        <p id="alertSuccess" className="alert alert-success" role="alert">
          Token validity date changed successfull!!!
        </p>

        <p id="alertError" className="alert alert-danger" role="alert">
          Something was wrong!
        </p>
      </div>

      <div
        id="loading"
        className="d-none align-items-center justify-content-start"
      >
        <strong>Loading...</strong>
        <div
          className="spinner-border ms-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>

      <table id="devicesTable">
        <caption>Devices list from sigfox</caption>
        <tbody id="devicesTableBody">
          <tr>
            <th>DEVICE ID</th>
            <th>DEVICE TYPE</th>
            <th>GROUP</th>
            <th>TOKEN VALIDITY</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ChangeArea;
