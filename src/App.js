import React, { useState } from "react";
import ArchTable from "./components/ArchTable";
import SettingsPanel from "./components/SettingsPanel";
import "./styles.css";

export default function App() {
  const [probabilities, setProbabilities] = useState({
    1: 20,
    2: 40,
    3: 40,
    4: 0,
  });

  const [missingTeeth, setMissingTeeth] = useState([]);
  const [chartData, setChartData] = useState({});
  const [printMode, setPrintMode] = useState(false);

  const toothNumbers = [
    // Maxillary (UR → UL)
    18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,
    // Mandibular (LL → LR)
    48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38,
  ];

  function generateValue() {
    const weightedList = [];
    Object.entries(probabilities).forEach(([value, weight]) => {
      for (let i = 0; i < weight; i++) weightedList.push(value);
    });
    return parseInt(weightedList[Math.floor(Math.random() * weightedList.length)], 10);
  }

  function generateChart() {
    const data = {};
    toothNumbers.forEach(num => {
      if (missingTeeth.includes(num.toString())) {
        data[num] = ["-", "-", "-", "-", "-", "-"];
      } else {
        data[num] = [generateValue(), generateValue(), generateValue(), generateValue(), generateValue(), generateValue()];
      }
    });
    setChartData(data);
  }

  function updateDepth(tooth, index, newValue) {
    setChartData(prev => ({
      ...prev,
      [tooth]: prev[tooth].map((v, i) => (i === index ? newValue : v))
    }));
  }

  return (
    <div className={printMode ? "print-mode" : "app"}>
      
      {/* Controls Section */}
      {!printMode && (
        <SettingsPanel
          probabilities={probabilities}
          setProbabilities={setProbabilities}
          missingTeeth={missingTeeth}
          setMissingTeeth={setMissingTeeth}
        />
      )}

      {!printMode && (
        <button className="generate-btn" onClick={generateChart}>
          Generate New Chart
        </button>
      )}

      {/* Print Button */}
      {Object.keys(chartData).length > 0 && (
        <button
          className="print-btn"
          onClick={() => {
            setPrintMode(true);
            setTimeout(() => window.print(), 50);
            setTimeout(() => setPrintMode(false), 500);
          }}
        >
          Print Chart
        </button>
      )}

      {/* Chart */}
      <ArchTable chartData={chartData} updateDepth={updateDepth} />
    </div>
  );
}
