import { useRef } from "react";
import "./ChangeArea.css";

function ChangeArea({ visible, globalData }) {
  const changeArea = useRef();
  const devicesTable = useRef();
  const alertErrorr = useRef();
  const tableBody = useRef();

  function formatoFecha(fecha) {
    let day = fecha.getDate();
    let newDay = fecha.getDate() + 1;
    let month = fecha.getMonth() + 1;
    let newMonth = fecha.getMonth() + 2;
    let year = fecha.getFullYear();
    let newYear = fecha.getFullYear() + 1;

    if (Number(day) <= 9) day = `0${day}`;
    if (Number(newDay) <= 9) newDay = `0${newDay}`;
    if (Number(month) <= 9) month = `0${month}`;
    if (Number(newMonth) <= 9) newMonth = `0${newMonth}`;

    let resp = {
      today: `${year}-${month}-${day}`,
      tomorrow: `${year}-${month}-${newDay}`,
      plusOneMonth: `${year}-${newMonth}-${day}`,
      plusOneYear: `${newYear}-${month}-${day}`,
    };
    return resp;
  }

  console.log(`pintando data recibida Data: `, globalData);
  if (globalData.sigfoxResponse.data.length > 0) {
    changeArea.current.style.display = "block";
    devicesTable.current.style.display = "block";

    // if (item.verificacion == true) color = "green";
    // if (item.verificacion == false) color = "red";
    // if (item.verificacion == undefined) color = "black";
  } else {
    // alertError.current.textContent = "No devices to unsubscribe!";
    // alertErrorr.current.style.display = "block";
  }

  return (
    <div
      id="changeArea"
      ref={changeArea}
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

        <p
          id="alertError"
          ref={alertErrorr}
          className="alert alert-danger"
          role="alert"
        >
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

      <table id="devicesTable" ref={devicesTable}>
        <caption>Devices list from sigfox</caption>
        <tbody id="devicesTableBody">
          <tr>
            <th>DEVICE ID</th>
            <th>DEVICE TYPE</th>
            <th>GROUP</th>
            <th>TOKEN VALIDITY</th>
          </tr>

          <>
            {globalData.sigfoxResponse.data.map((reg) => (
              <tr key={reg.id}>
                <td key={reg.id}>{reg.id}</td>
                <td key={reg.deviceType.id}>{reg.deviceType.id}</td>
                <td key={reg.group.id}>{reg.group.id}</td>
                <td
                  className="tvItem"
                  key={formatoFecha(new Date(reg.token.end)).today}
                >
                  {formatoFecha(new Date(reg.token.end)).today}
                </td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </div>
  );
}

export default ChangeArea;

//pintar en la tabla la info recibida
// const pintarData = (Data, color = "black") => {
//   console.log(`pintando data recibida Data: ${Data}`, Data);
//   if (Data.data.length > 0) {
//     changeArea.style.display = "block";
//     devicesTable.style.display = "block";

//     Data.data.forEach((item) => {
//       const clone = templateFila.cloneNode(true);
//       clone.querySelector(".idItem").textContent = item.id;
//       clone.querySelector(".dtItem").textContent = item.deviceType.id;
//       clone.querySelector(".grItem").textContent = item.group.id;
//       clone.querySelector(".tvItem").textContent = formatoFecha(
//         new Date(item.token.end)
//       ).today;

//       if (item.verificacion == true) color = "green";
//       if (item.verificacion == false) color = "red";
//       if (item.verificacion == undefined) color = "black";

//       clone.querySelector(".idItem").style.color = color;
//       clone.querySelector(".dtItem").style.color = color;
//       clone.querySelector(".grItem").style.color = color;
//       clone.querySelector(".tvItem").style.color = color;
//       fragment.appendChild(clone);
//     });
//     tableBody.appendChild(fragment);
//   } else {
//     alertError.textContent = "No devices to unsubscribe!";
//     alertError.style.display = "block";
//   }
// };
