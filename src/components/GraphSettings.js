import Icon from "../images/gear.svg";
import { useState } from "react";

export default function GraphSettings({
  swapDataset,
  updateDataset,
  showPoints,
  numChamps,
  numSelected,
  setNumSelected,
}) {
  const handleChange = (e) => {
    setNumSelectedLocal(e.target.value);
  };

  return (
    <div className="graphSettings">
      {/* <Icon className="gearImage" width={30} height={30} /> */}
      <button className="canvasBtn" onClick={swapDataset}>
        {showPoints ? "Show Levels" : "Show Points"}
      </button>
      <br />
      <button className="canvasBtn" onClick={() => updateDataset(10)}>
        Show 10
      </button>
      <button className="canvasBtn" onClick={() => updateDataset(numChamps)}>
        Show all
      </button>
      <div className="settingsText">Showing top {numSelected} champions</div>
      <input
        className="inputSlider"
        type="range"
        min="1"
        max={numChamps}
        value={numSelected}
        onChange={setNumSelected}
      />
      <br />
    </div>
  );
}
