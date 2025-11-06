import React, { useState } from "react";
import SettingsPanel from "./components/SettingsPanel";
import ArchTable from "./components/ArchTable";
import "./styles.css";

export default function App() {
  const [probabilities, setProbabilities] = useState({
    1: 20,
    2: 40,
    3: 40,
    4: 0,
  });

  const [missingTeeth, setMissingTeeth] = useState([]);
  const [chart, setChart] = useState({});
  const [printMode, setPrintMode] = useState(false);

  // FDI numbering layout (maxillary then mandibular)
  const teeth = [
    // Maxilla (right → left)
    18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,
    // Mandible (left → right)
    48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38,
  ];

  function weightedRandomValue() {
    const pool = [];
    Object.entries(probabilities).forEach(([depth, weight]) => {
      for (let i = 0; i < weight; i++) pool.push(Number(depth));
    });
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function generateChart() {
    const newChart = {};
    teeth.forEach((tooth) => {
      if (missingTeeth.includes(String(tooth))) {
        newChart[tooth] = ["-", "-", "-", "-", "-", "-"];
      } else {
        newChart[tooth] = [
          weightedRandomValue(),
          weightedRandomValue(),
          weightedRandomValue(),
          weightedRandomValue(),
          weightedRandomValue(),
          weightedRandomValue(),
        ];
      }
    });
    setChart(newChart);
  }

  const updateDepth = (tooth, index, value) => {
    setChart(prev => ({
      ...prev,
      [tooth]: prev[tooth].map((v, i) => (i === index ? value : v)),
    }));
  };

  return (
    <div className={printMode ? "print-mode" : "app"}>
      
      {/* Hide controls when printing */}
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

      {Object.keys(chart).length > 0 && (
        <button
          className="print-btn"
          onClick={() => {
            setPrintMode(true);
            setTimeout(() => window.print(), 100);
            setTimeout(() => setPrintMode(false), 500);
          }}
        >
          Print Chart
        </button>
      )}

      <ArchTable
        chart={chart}
        teeth={teeth}
        missingTeeth={missingTeeth}
        updateDepth={updateDepth}
      />
    </div>
  );
}
