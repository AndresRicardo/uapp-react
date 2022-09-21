import React from "react";
import "./OptionsMenu.css";

function OptionsMenu({ clic, focus }) {
  return (
    <div className="optionsMenu">
      <button
        className={focus[0] ? "optionButton focus" : "optionButton"}
        id="singleDeviceOptionButton"
        onClick={() => clic("single")}
      >
        Search and update a device
      </button>

      <button
        className={focus[1] ? "optionButton focus" : "optionButton"}
        onClick={() => clic("get")}
      >
        Search and update devices
      </button>

      <button
        className={focus[2] ? "optionButton focus" : "optionButton"}
        onClick={() => clic("multi")}
      >
        Update devices from csv file
      </button>
    </div>
  );
}

export default OptionsMenu;
