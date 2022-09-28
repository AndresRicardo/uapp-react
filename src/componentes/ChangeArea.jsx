import { useEffect, useRef } from "react";
import "./ChangeArea.css";

function ChangeArea({ visible, globalData }) {
  console.log("render ChangeArea");

  const changeArea = useRef();
  const devicesTable = useRef();
  const alertError = useRef();
  const methodSelector = useRef();
  const dateMethod = useRef();
  const durationMethod = useRef();
  // const tableBody = useRef();

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

  function setCurrentTime() {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    dateMethod.current.style.display = "inline-block";
    const fechas = formatoFecha(hoy);
    dateMethod.current.value = fechas.plusOneYear;
    dateMethod.current.min = fechas.today;
  }

  useEffect(() => {
    if (globalData.sigfoxResponse.data.length > 0) {
      changeArea.current.style.display = "block";
      devicesTable.current.style.display = "block";
      alertError.current.style.display = "none";
    } else {
      alertError.current.textContent = "No devices to unsubscribe!";
      alertError.current.style.display = "block";
    }

    setCurrentTime();
  });

  // al seleccionar el metodo para establecer el tiempo de dar de baja
  const methodSelectorOnChange = (e) => {
    e.preventDefault();
    if (methodSelector.current.selectedIndex === 0) {
      dateMethod.current.style.display = "block";
      durationMethod.current.style.display = "none";
    }
    if (methodSelector.current.selectedIndex === 1) {
      dateMethod.current.style.display = "none";
      durationMethod.current.style.display = "block";
    }
    console.log("methodSelector: ", methodSelector.selectedIndex);
  };

  //cuando se hace click en el boton Update
  // updateButton.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   loadingData(true);
  //   alertError.style.display = "none";
  //   alertSuccess.style.display = "none";

  //   //crear request post al backend uapp para cambiar token validity a multiples devices
  //   console.log("RUTINA PARA CAMBIAR TOKEN VALIDITY A MULTIPLES DEVICES");

  //   //verificar si hay devices para hacer update
  //   if (!globalGetDevicesResponse.hasOwnProperty("data")) {
  //     loadingData(false);
  //     alertError.textContent = "No devices to unsubscribe!";
  //     alertError.style.display = "inline-block";
  //     return;
  //   }

  //   // armar body del request al backend de uapp
  //   let requestBody = {
  //     data: [],
  //   };

  //   requestBody["origin"] = globalGetDevicesResponse.origin;

  //   globalGetDevicesResponse.data.forEach((element) => {
  //     requestBody.data.push({
  //       id: element.id,
  //       unsubscriptionTime: dateMethod.valueAsNumber,
  //     });

  //     element["unsubscriptionTime"] = dateMethod.valueAsNumber;
  //   });

  //   //hacer update de todos los devices de la lista
  //   let unsubResponse = unsubscribeMultipleDevices(
  //     username.value,
  //     password.value,
  //     group.value,
  //     requestBody
  //   );

  //   //operar respuesta obtenida del backend uapp
  //   unsubResponse.then((resp) => {
  //     console.log("RESPUESTA DEL BACKEND UAAP A LA SOLICITUD DE DAR DE BAJA: ");
  //     globalUnsubscribeResponse = resp;
  //     console.log(resp);

  //     if (resp.hasOwnProperty("jobId")) {
  //       alertSuccess.style.display = "inline-block";

  //       //verificar que los cambios se efectuaron correctamente a todos los devices
  //       //se compara lo que se mandó a cambiar con información obtenida del backend despues d realizados los cambios
  //       verificarCambios(
  //         username.value,
  //         password.value,
  //         deviceID.value,
  //         group.value,
  //         deviceType.value,
  //         globalGetDevicesResponse
  //       );
  //     }

  //     loadingData(false);
  //   });
  // });

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
          ref={methodSelector}
          className="form-select"
          aria-label="Default select example"
          defaultValue={"Unsubscription Date"}
          onChange={methodSelectorOnChange}
        >
          <option value="unsubscriptionDate">Unsubscription Date</option>
          <option value="subscriptionDuration">Unsubscription Duration</option>
        </select>

        <input
          type="date"
          id="dateMethod"
          className="form-control"
          ref={dateMethod}
        />

        <input
          type="datetime"
          id="durationMethod"
          ref={durationMethod}
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
          ref={alertError}
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
              <tr
                className={
                  reg.verificacion === undefined
                    ? "color_back"
                    : reg.verificacion
                    ? "color_green"
                    : "color_red"
                }
              >
                <td>{reg.id} </td>
                <td>{reg.deviceType.id} </td>
                <td>{reg.group.id} </td>
                <td>
                  {reg.token
                    ? formatoFecha(new Date(reg.token.end)).today
                    : "No Token"}{" "}
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
