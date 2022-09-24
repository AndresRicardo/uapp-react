//funcion para buscar en sigfox info de devices en un grupo, devicetype o de un solo device
async function getDevicesFromSigfox(
  formUsername,
  formPassword,
  formDeviceID = "",
  formGroupId = "",
  formDeviceTypeId = ""
) {
  let url = "http://localhost:3000/devices"; //para consultar devices en el device type especificado
  const options = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      user: formUsername,
      password: formPassword,
      deviceid: formDeviceID,
      groupid: formGroupId,
      devicetypeid: formDeviceTypeId,
      accept: "application/json",
      "content-Type": "application/json",
    },
  };
  let params = new URLSearchParams();
  if (formDeviceID.length > 0) {
    params.append("id", formDeviceID);
    options.headers.deviceid = formDeviceID;
  }
  if (formGroupId.length > 0) {
    params.append("groupIds", formGroupId);
    options.headers.groupid = formGroupId;
  }
  if (formDeviceTypeId.length > 0) {
    params.append("deviceTypeId", formDeviceTypeId);
    options.headers.devicetypeid = formDeviceTypeId;
  }
  url = `${url}?${params.toString()}`;
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("DATOS DE LA SOLICITUD A SIGFOX");
      console.log("fetch ok");
      console.log("respuesta server ok");
      console.log(`codigo de respuesta: ${response.status}`);
      console.log("url: ", response.url);
      const responseJson = await response.json();
      console.log("PARSEO JSON DATA CORRECTO");
      return responseJson;
    } else {
      console.log("RESPUESTA SERVER ERROR");
      console.log(`RESPUESTA CODE: ${response.status}`);
    }
  } catch (error) {
    console.log("ERROR OBTENIENDO DEVICES:");
    console.log(error);
    // loadingData(false);
  }
}

export default getDevicesFromSigfox;
