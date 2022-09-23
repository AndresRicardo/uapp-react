import React from "react";
import "./OptionsMenu.css";

function OptionsMenu({ clic, focus }) {
  return (
    <div className="optionsMenu">
      <button
        className={focus.single ? "optionButton focus" : "optionButton"}
        id="singleDeviceOptionButton"
        onClick={() => clic("single")}
      >
        Search and update a device
      </button>

      <button
        className={focus.get ? "optionButton focus" : "optionButton"}
        onClick={() => clic("get")}
      >
        Search and update devices
      </button>

      <button
        className={focus.multi ? "optionButton focus" : "optionButton"}
        onClick={() => clic("multi")}
      >
        Update devices from csv file
      </button>
    </div>
  );
}

export default OptionsMenu;
