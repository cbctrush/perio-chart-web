import React, { useState } from "react";
import PeriodontalChart from "./components/PeriodontalChart";
import "./styles.css";

const teeth = [
  // Example FDI tooth numbers
  18,17,16,15,14,13,12,11,
  21,22,23,24,25,26,27,28,
  48,47,46,45,44,43,42,41,
  31,32,33,34,35,36,37,38
];

const generateRandomDepths = (weights = {1:0.2, 2:0.4, 3:0.4, 4:0}) => {
  const chart = {};
  teeth.forEach((toothId) => {
    chart[toothId] = Array(6).fill(0).map(() => {
      const rand = Math.random();
      if (rand < weights[1]) return 1;
      if (rand < weights[1]+weights[2]) return 2;
      if (rand < weights[1]+weights[2]+weights[3]) return 3;
      return 4;
    });
  });
  return chart;
};

function App() {
  const [chartData, setChartData] = useState(generateRandomDepths());
  const [weights, setWeights] = useState({1:0.2,2:0.4,3:0.4,4:0});
  const [missingTeeth, setMissingTeeth] = useState([]);

  const handleDepthChange = (toothId, locationIndex, newValue) => {
    setChartData(prev => {
      const updated = { ...prev };
      updated[toothId] = [...updated[toothId]];
      updated[toothId][locationIndex] = Number(newValue);
      return updated;
    });
  };

  const handleGenerateChart = () => {
    const chart = generateRandomDepths(weights);
    missingTeeth.forEach(tooth => delete chart[tooth]); // remove missing teeth
    setChartData(chart);
  };

  const handleWeightChange = (depth, value) => {
    const w = {...weights};
    w[depth] = Number(value);
    setWeights(w);
  };

  const handleMissingTeethChange = (e) => {
    const list = e.target.value.split(',').map(t => Number(t.trim()));
    setMissingTeeth(list);
  };

  return (
    <div className="App">
      {/* Controls / Prompts */}
      <div className="controls-container">
        <h1>Periodontal Chart Settings</h1>

        <div>
          <h3>Probing Depth Weights (sum should be 1)</h3>
          { [1,2,3,4].map(d => (
            <label key={d}>
              {d}:
              <input
                type="number"
                min="0"
                max="1"
                step="0.05"
                value={weights[d]}
                onChange={(e) => handleWeightChange(d, e.target.value)}
              />
            </label>
          )) }
        </div>

        <div>
          <h3>Missing Teeth (comma-separated FDI numbers)</h3>
          <input
            type="text"
            placeholder="e.g., 18,28,38"
            onChange={handleMissingTeethChange}
          />
        </div>

        <button onClick={handleGenerateChart}>Generate Chart</button>
        <button onClick={() => window.print()}>Print Chart</button>
      </div>

      {/* Chart Only */}
      <div className="chart-container" id="chart-to-print">
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Tooth</th>
              <th>MB</th>
              <th>B</th>
              <th>DB</th>
              <th>DL</th>
              <th>L</th>
              <th>ML</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(chartData).map(toothId => (
              <tr key={toothId}>
                <td>{toothId}</td>
                {chartData[toothId].map((depth, idx) => (
                  <td key={idx}>
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={depth}
                      onChange={(e) => handleDepthChange(toothId, idx, e.target.value)}
                      style={{ width: "40px" }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
