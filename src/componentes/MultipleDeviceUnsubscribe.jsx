import { useRef, useState } from "react";
import "./MultipleDeviceUnsubscribe.css";

function MultipleDeviceUnsubscribe({
  username,
  password,
  dataFromCsv,
  visible,
  submit,
  changeCsv,
}) {
  console.log("Render MultipleDeviceUnsubscribe");
  console.log("clicBoton, state.sigfoxResponse: ", dataFromCsv.sigfoxResponse);

  let globalResponse = {
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

  const csvFileInput = useRef();
  const [state, setState] = useState({ ...globalResponse });

  //cuando se selecciona un archivo csv
  const csvFileInputChange = () => {
    let fr = new FileReader();
    fr.readAsText(csvFileInput.current.files[0]);

    globalResponse.sigfoxResponse.data = [];

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
          globalResponse.sigfoxResponse.data.push(item);
      });

      globalResponse.origin = "csv";
      globalResponse.loadingData = false;
      globalResponse.pintarData = { ...globalResponse.sigfoxResponse };

      setState({ ...globalResponse });
      changeCsv(globalResponse);
      return globalResponse;
    };
  };

  //funcion para comparar unsubscribeTime ()
  function compararDatos(devicesList, responseList) {
    let dataVerificada = { ...devicesList };

    dataVerificada.data.forEach((element) => {
      responseList.data.forEach((ele) => {
        if (parseInt(ele.id, 16) === parseInt(element.id, 16)) {
          element["deviceType"]["id"] = ele["deviceType"];
          element["group"]["id"] = ele["group"];
          element["token"]["end"] = ele["token"];

          if (ele.unsubscriptionTime === element.unsubscriptionTime)
            element["verificacion"] = true;
          else element["verificacion"] = false;
        }
      });
    });

    return dataVerificada;
  }

  //cuando se hace click en boton validar devices cargados desde csv
  const clicBoton = (e) => {
    e.preventDefault();

    console.log(
      "clicBoton, state.sigfoxResponse: ",
      dataFromCsv.sigfoxResponse
    );
    getFromSigfoxDevicesInList(
      username,
      password,
      dataFromCsv.sigfoxResponse,
      false
    );

    // return globalResponse;
  };

  // funcion para buscar en sigfox info de devices a partir de una listado de devices
  function getFromSigfoxDevicesInList(
    username,
    password,
    devicesListToVerify,
    isForUpdate = false
  ) {
    //todas las respuestas de los devices de la lista
    let sigfoxResponse = { data: [] };

    // armar request generico
    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        user: username,
        password: password,
        accept: "application/json",
        "content-Type": "application/json",
      },
    };

    let count = 0;

    console.log(devicesListToVerify);
    //recorrer listado de devices
    devicesListToVerify.data.forEach((element) => {
      //armar url para cada device de la lista
      let params = new URLSearchParams();
      params.append("id", element.id);
      let url = `http://localhost:3000/devices?${params.toString()}`;

      fetch(url, options)
        .then((resp) => {
          if (resp.ok) {
            resp
              .json()
              .then((deviceInfo) => {
                count++;
                sigfoxResponse.data.push(deviceInfo.data[0]);

                //cuando se llega al final de las consultas individuales a sigfox, inicia verificación
                if (count === devicesListToVerify.data.length) {
                  if (!isForUpdate) {
                    globalResponse.sigfoxResponse = { ...sigfoxResponse };
                    globalResponse.pintarData = { ...sigfoxResponse };
                    globalResponse.loadingData = false;

                    setState({ ...globalResponse });
                    submit(globalResponse);
                  } else {
                    const dataVerificada = compararDatos(
                      devicesListToVerify,
                      sigfoxResponse
                    );
                    globalResponse.sigfoxResponse = { ...dataVerificada };
                    globalResponse.pintarData = { ...dataVerificada };
                    globalResponse.loadingData = false;

                    setState({ ...globalResponse });
                    submit(globalResponse);
                  }
                }
              })
              .catch((error) => {
                //cuando se llega al final de las consultas individuales a sigfox, inicia verificación
                count++;
                if (count === devicesListToVerify.data.length) {
                  if (!isForUpdate) {
                    globalResponse.pintarData = { ...sigfoxResponse };

                    setState({ ...globalResponse });
                    submit(globalResponse);
                  } else {
                    const dataVerificada = compararDatos(
                      devicesListToVerify,
                      sigfoxResponse
                    );
                    globalResponse.sigfoxResponse = { ...dataVerificada };
                    globalResponse.pintarData = { ...dataVerificada };
                    globalResponse.loadingData = false;

                    setState({ ...globalResponse });
                    submit(globalResponse);
                  }
                }
              });
          } else console.log(`resp.status: ${resp.status}`);
        })
        .catch((error) => {
          console.log(
            `iteración en lista de devices. index: ${devicesListToVerify.data.indexOf(
              element
            )}, device: ${element.id}`
          );
          console.log(`fetch fail`);
        });
    });
  }

  return (
    <section
      id="multipleDeviceUnsubscribe"
      className={visible.multi ? "display_block" : "display_none"}
    >
      <h2 id="multipleDeviceTitle">Load and update devices from csv file</h2>

      <form id="multipleDeviceForm" onSubmit={clicBoton}>
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
        >
          Get devices info from sigfox
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
