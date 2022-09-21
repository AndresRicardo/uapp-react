import React from "react";
import "./OptionsMenu.css";

function OptionsMenu() {
  return (
    <div className="optionsMenu">
      <button className="optionButton" id="singleDeviceOptionButton">
        Search and update a device
      </button>

      <button className="optionButton" id="getDevicesOptionButton">
        Search and update devices
      </button>

      <button className="optionButton" id="multipleDevicesOptionButton">
        Load and update devices from csv file
      </button>
    </div>
  );
}

export default OptionsMenu;
