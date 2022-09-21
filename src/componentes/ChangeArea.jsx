import "./ChangeArea.css";

function ChangeArea({ visible }) {
  return (
    <div id="changeArea" className={visible ? "display_block" : "display_none"}>
      <div id="changeAreaInputs">
        <select
          name="methodSelector"
          id="methodSelector"
          class="form-select"
          aria-label="Default select example"
        >
          <option value="unsubscriptionDate" selected>
            Unsubscription Date
          </option>
          <option value="subscriptionDuration">Unsubscription Duration</option>
        </select>

        <input type="date" id="dateMethod" class="form-control" />

        <input
          type="datetime"
          id="durationMethod"
          class="form-control"
          placeholder="1 Year"
        />

        <button type="submit" id="updateButton" class="btn btn-primary">
          Update
        </button>
      </div>

      <div id="changeAreaAlerts">
        <p id="alertSuccess" class="alert alert-success" role="alert">
          Token validity date changed successfull!!!
        </p>

        <p id="alertError" class="alert alert-danger" role="alert">
          Something was wrong!
        </p>
      </div>

      <div id="loading" class="d-none align-items-center justify-content-start">
        <strong>Loading...</strong>
        <div
          class="spinner-border ms-auto"
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
