import { useEffect, useState, useRef } from "react";
import Icon from "../images/Gear.svg";
import { Chart, registerables } from "chart.js";
import _ from "lodash";
import GraphSettings from "./GraphSettings";

Chart.register(...registerables);

export default function GraphPanel({ champData, masteryData }) {
  if (masteryData.length === 0) {
    return <></>;
  }
  const champPointsData = masteryData.map((champ) => champ.championPoints);
  const champLevelsData = masteryData.map((champ) => champ.championLevel);

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [showPoints, setShowPoints] = useState(true);
  const [numSelected, setNumSelected] = useState(champPointsData.length);

  const getName = (championId) => {
    return champData[
      _.findKey(champData, (champ) => {
        return champ.key === String(championId);
      })
    ].id;
  };

  const labels = masteryData.map((champ) =>
    champ.championPoints > 0 ? getName(champ.championId) : ""
  );

  const chartConfig = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          data: champPointsData,
          backgroundColor: ["rgba(228, 248, 255, 0.822)"],
          borderWidth: 1,
          hidden: !showPoints,
          hoverBackgroundColor: "rgb(31, 183, 243)",
        },
        {
          data: champLevelsData,
          backgroundColor: ["rgba(228, 248, 255, 0.822)"],
          borderWidth: 1,
          hidden: showPoints,
          hoverBackgroundColor: "rgb(31, 183, 243)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
            },
            color: ["#FFFFFF"],
            autoSkip: false,
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
            speed: 10,
            threshold: 10,
          },
        },
        legend: {
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  useEffect(() => {
    if (chartInstance) {
      updateDataset(numSelected);
    }
  }, [masteryData]);

  const updateDataset = (numEntries) => {
    const newPointsData = champPointsData.slice(0, numEntries);
    const newLevelsData = champLevelsData.slice(0, numEntries);
    const newLabels = labels.slice(0, numEntries);
    chartInstance.data.datasets[0].data = newPointsData;
    chartInstance.data.datasets[1].data = newLevelsData;
    chartInstance.data.labels = newLabels;
    chartInstance.update();
    setNumSelected(chartInstance.data.datasets[0].data.length);
  };

  const swapDataset = () => {
    const newShowPoints = !showPoints;
    chartInstance.data.datasets[0].hidden = !newShowPoints;
    chartInstance.data.datasets[1].hidden = newShowPoints;
    chartInstance.update();
    setShowPoints(newShowPoints);
  };

  return (
    <div>
      <div className="canvasContainer">
        <canvas className="graphCanvas" ref={chartContainer} />
        <div className="canvasText">
          {showPoints ? "Mastery Points" : "Mastery Levels"}
        </div>
        <Icon className="gearImage" width={30} height={30} />
        <GraphSettings
          swapDataset={swapDataset}
          updateDataset={updateDataset}
          showPoints={showPoints}
          numChamps={champPointsData.length}
          numSelected={numSelected}
          setNumSelected={(e) => updateDataset(e.target.value)}
        />
      </div>
    </div>
  );
}
