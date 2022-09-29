import { useRef } from "react";
import "./MultipleDeviceUnsubscribe.css";

function MultipleDeviceUnsubscribe({
  username,
  password,
  visible,
  submit,
  changeCsv,
}) {
  console.log("Render MultipleDeviceUnsubscribe");

  const csvFileInput = useRef();

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

  //cuando se selecciona un archivo csv
  const csvFileInputChange = () => {
    let fr = new FileReader();
    fr.readAsText(csvFileInput.current.files[0]);

    response.sigfoxResponse.data = [];

    //cuando se termine de cargar el archivo
    fr.onload = function () {
      // arreglo de id's cargados desde csv
      let arr = fr.result.split("\n");

      arr.forEach((element) => {
        let item = {
          id: element.replaceAll('"', ""),
          deviceType: { id: "--" },
          group: { id: "--" },
          token: { state: "--", detailMessage: "--", end: "--" },
          verificacion: undefined,
        };

        if (!element.includes("Id") && element.length > 0)
          response.sigfoxResponse.data.push(item);
      });

      response.origin = "csv";
      response.loadingData = false;
      response.pintarData = { ...response.sigfoxResponse };

      changeCsv(response);
      return response;
      // pintarData(response, "black");
    };
  };

  //cuando se hace click en boton validar devices cargados desde csv
  const clicBoton = () => {
    // getFromSigfoxDevicesInList(username, password, response, false);
  };

  // // funcion para buscar en sigfox info de devices a partir de una listado de devices
  // function getFromSigfoxDevicesInList(
  //   username,
  //   password,
  //   devicesList,
  //   isForUpdate = false
  // ) {
  //   //todas las respuestas de los devices de la lista
  //   let responseList = { data: [] };

  //   // armar request generico
  //   const options = {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, *cors, same-origin
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       user: username,
  //       password: password,
  //       accept: "application/json",
  //       "content-Type": "application/json",
  //     },
  //   };

  //   let count = 0;

  //   //recorrer listado de devices
  //   devicesList.data.forEach((element) => {
  //     //armar url para cada device de la lista
  //     let params = new URLSearchParams();
  //     params.append("id", element.id);
  //     let url = `http://localhost:3000/devices?${params.toString()}`;

  //     fetch(url, options)
  //       .then((resp) => {
  //         if (resp.ok) {
  //           resp
  //             .json()
  //             .then((deviceInfo) => {
  //               count++;
  //               responseList.data.push(deviceInfo.data[0]);

  //               //cuando se llega al final de las consultas individuales a sigfox inicia verificación
  //               if (count === devicesList.data.length) {
  //                 if (!isForUpdate) {
  //                   // pintarData(responseList);
  //                 } else {
  //                   compararDatos(devicesList, responseList);
  //                 }
  //               }
  //             })
  //             .catch((error) => {
  //               //cuando se llega al final de las consultas individuales a sigfox inicia verificación
  //               count++;
  //               if (count === devicesList.data.length) {
  //                 if (!isForUpdate) {
  //                   // pintarData(responseList);
  //                 } else {
  //                   compararDatos(devicesList, responseList);
  //                 }
  //               }
  //             });
  //         } else console.log(`resp.status: ${resp.status}`);
  //       })
  //       .catch((error) => {
  //         console.log(
  //           `iteración en lista de devices. index: ${devicesList.data.indexOf(
  //             element
  //           )}, device: ${element.id}`
  //         );
  //         console.log(`fetch fail`);
  //       });
  //   });
  // }

  return (
    <section
      id="multipleDeviceUnsubscribe"
      className={visible.multi ? "display_block" : "display_none"}
    >
      <h2 id="multipleDeviceTitle">Load and update devices from csv file</h2>

      <form id="multipleDeviceForm" onSubmit={submit}>
        <label htmlFor="csvFile" className="form-label">
          Upload .csv file
        </label>
        <input
          type="file"
          name="csvFile"
          id="csvFileInput"
          ref={csvFileInput}
          placeholder="In Hex Format"
          className="form-control"
          onChange={csvFileInputChange}
        />

        <button
          type="submit"
          id="validateDevicesButton"
          className="btn btn-primary"
          onClick={clicBoton}
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
