import React, { useState } from "react";
import SettingsPanel from "./components/SettingsPanel";
import ToothChart from "./components/ToothChart";
import "./styles.css";

export default function App() {
  const [probabilities, setProbabilities] = useState({ 1: 20, 2: 40, 3: 40, 4: 0 });
  const [missingTeeth, setMissingTeeth] = useState([]);   // store as STRINGS
  const [chart, setChart] = useState({});
  const [printMode, setPrintMode] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [examDate, setExamDate] = useState("");

  const teeth = [
    18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,
    48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38,
  ];

  function weightedRandomValue() {
    const pool = [];
    Object.entries(probabilities).forEach(([depth, pct]) => {
      const count = Math.max(0, Number(pct) | 0);
      for (let i = 0; i < count; i++) pool.push(Number(depth));
    });
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : 2;
  }

  function generateChart() {
    const next = {};
    teeth.forEach((tooth) => {
      const tStr = String(tooth);
      if (missingTeeth.includes(tStr)) {
        next[tooth] = ["-","-","-","-","-","-"];
      } else {
        next[tooth] = Array.from({ length: 6 }, () => weightedRandomValue());
      }
    });
    setChart(next);
  }

  const updateDepth = (tooth, index, value) => {
    // allow "-" to remain for missing rows; otherwise enforce number 1..9
    const n = Number(value);
    const newVal = Number.isFinite(n) ? n : value;
    setChart(prev => ({
      ...prev,
      [tooth]: (prev[tooth] || Array(6).fill("")).map((x,i)=> i===index ? newVal : x)
    }));
  };

  return (
    <div className={printMode ? "print-mode" : "app"}>
      {/* Patient inputs */}
      {!printMode && (
        <div className="patient-info">
          <label>
            Patient Name:&nbsp;
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="e.g., John Smith"
            />
          </label>
          <label>
            Date:&nbsp;
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </label>
        </div>
      )}

      {/* Printed header */}
      {Object.keys(chart).length > 0 && (
        <div className="chart-header always-show">
          <p><strong>Patient:</strong> {patientName || "________________"}</p>
          <p><strong>Date:</strong> {examDate || "________________"}</p>
        </div>
      )}

      {/* Settings */}
      {!printMode && (
        <SettingsPanel
          probabilities={probabilities}
          setProbabilities={setProbabilities}
          missingTeeth={missingTeeth}
          setMissingTeeth={setMissingTeeth}
        />
      )}

      {/* Actions */}
      {!printMode && (
        <div className="button-row">
          <button className="generate-btn" onClick={generateChart}>
            Generate New Chart
          </button>
          {Object.keys(chart).length > 0 && (
            <button
              className="print-btn"
              onClick={() => {
                setPrintMode(true);
                setTimeout(() => window.print(), 100);
                setTimeout(() => setPrintMode(false), 600);
              }}
            >
              Print Chart
            </button>
          )}
        </div>
      )}

      {/* NEW: Visual chart */}
      <ToothChart
        chart={chart}
        missingTeeth={missingTeeth}
        updateDepth={updateDepth}
      />
    </div>
  );
}
