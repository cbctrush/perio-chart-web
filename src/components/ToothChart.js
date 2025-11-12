import React from "react";

const upperTeeth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const lowerTeeth = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

// Decide text color based on value
function colorForValue(v) {
  const n = parseInt(v);
  if (isNaN(n)) return "#000";
  if (n <= 3) return "#00a651";
  if (n === 4) return "#ff8c00";
  return "#d93025";
}

function ToothColumn({ tooth, row = [], isMissing, onChange }) {
  if (isMissing) {
    return (
      <div className="tooth-col missing-tooth">
        <div className="site-row">
          <div className="site-box site-missing">X</div>
          <div className="site-box site-missing">X</div>
          <div className="site-box site-missing">X</div>
        </div>
        <div className="tooth-id missing-id">{tooth}</div>
        <div className="site-row">
          <div className="site-box site-missing">X</div>
          <div className="site-box site-missing">X</div>
          <div className="site-box site-missing">X</div>
        </div>
      </div>
    );
  }

  return (
    <div className="tooth-col">
      {/* Buccal */}
      <div className="site-row">
        {row.slice(0, 3).map((v, i) => (
          <input
            key={`b-${i}`}
            className="site-box"
            style={{ color: colorForValue(v) }}
            value={v}
            onChange={(e) => onChange(tooth, i, e.target.value)}
            placeholder="–"
          />
        ))}
      </div>

      <div className="tooth-id">{tooth}</div>

      {/* Lingual */}
      <div className="site-row">
        {row.slice(3, 6).map((v, i) => (
          <input
            key={`l-${i}`}
            className="site-box"
            style={{ color: colorForValue(v) }}
            value={v}
            onChange={(e) => onChange(tooth, i + 3, e.target.value)}
            placeholder="–"
          />
        ))}
      </div>
    </div>
  );
}

export default function ToothChart({ chart = {}, missingTeeth = [], updateDepth }) {
  const missingSet = new Set(missingTeeth.map(String));

  return (
    <div className="tooth-chart-wrapper">
      {/* Upper Arch */}
      <div className="arch-block">
        <div className="arch-title">Upper Arch</div>
        <div className="arch">
          {upperTeeth.map((t) => (
            <ToothColumn
              key={t}
              tooth={t}
              row={chart[t]}
              isMissing={missingSet.has(String(t))}
              onChange={updateDepth}
            />
          ))}
        </div>
      </div>

      {/* Lower Arch */}
      <div className="arch-block">
        <div className="arch-title">Lower Arch</div>
        <div className="arch">
          {lowerTeeth.map((t) => (
            <ToothColumn
              key={t}
              tooth={t}
              row={chart[t]}
              isMissing={missingSet.has(String(t))}
              onChange={updateDepth}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
