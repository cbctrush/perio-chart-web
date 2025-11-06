import React, { useState } from "react";
import SettingsPanel from "./components/SettingsPanel";
import ArchTable from "./components/ArchTable";
import "./styles.css";

export default function App() {
  // probability weights in PERCENT (1–4)
  const [probabilities, setProbabilities] = useState({
    1: 20,
    2: 40,
    3: 40,
    4: 0,
  });

  // store missing teeth as STRINGS for consistent comparison
  const [missingTeeth, setMissingTeeth] = useState([]);

  // chart object: { [FDI]: [MB, B, DB, ML, L, DL] | ["-","-","-","-","-","-"] }
  const [chart, setChart] = useState({});
  const [printMode, setPrintMode] = useState(false);

  // patient info (shown in print header)
  const [patientName, setPatientName] = useState("");
  const [examDate, setExamDate] = useState("");

  // FDI numbering layout (maxillary then mandibular)
  const teeth = [
    // Maxilla (UR → UL)
    18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,
    // Mandible (LL → LR)
    48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38,
  ];

  // pick a value 1–4 using probability percentages
  function weightedRandomValue() {
    const pool = [];
    Object.entries(probabilities).forEach(([depth, pct]) => {
      const count = Math.max(0, Number(pct) | 0); // rough weight
      for (let i = 0; i < count; i++) pool.push(Number(depth));
    });
    // fallback if all 0: default to 2
    if (pool.length === 0) return 2;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function generateChart() {
    const newChart = {};
    teeth.forEach((tooth) => {
      const tStr = String(tooth);
      if (missingTeeth.includes(tStr)) {
        newChart[tooth] = ["-", "-", "-", "-", "-", "-"];
      } else {
        newChart[tooth] = Array.from({ length: 6 }, () => weightedRandomValue());
      }
    });
    setChart(newChart);
  }

  const updateDepth = (tooth, index, value) => {
    // sanitize to number 1–9; allow "-" rows for missing
    const v = Number(value);
    setChart((prev) => {
      const row = prev[tooth] || Array(6).fill("");
      const nextRow = row.map((x, i) => (i === index ? (Number.isFinite(v) ? v : x) : x));
      return { ...prev, [tooth]: nextRow };
    });
  };

  return (
    <div className={printMode ? "print-mode" : "app"}>
      {/* Controls / Prompts (hidden during print) */}
      {!printMode && (
        <>
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

          <SettingsPanel
            probabilities={probabilities}
            setProbabilities={setProbabilities}
            missingTeeth={missingTeeth}
            setMissingTeeth={setMissingTeeth}
          />

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
        </>
      )}

      {/* Header for printed chart */}
      {Object.keys(chart).length > 0 && (
        <div className="chart-header">
          <p><strong>Patient:</strong> {patientName || "________________"}</p>
          <p><strong>Date:</strong> {examDate || "________________"}</p>
        </div>
      )}

      {/* Chart */}
      <ArchTable
        chart={chart}
        teeth={teeth}
        missingTeeth={missingTeeth}
        updateDepth={updateDepth}
      />
    </div>
  );
}
