import React from "react";

const upperTeeth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const lowerTeeth = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

// Map a numeric depth to a color class
function depthClass(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return "site site-missing";
  if (n <= 3) return "site site-ok";
  if (n === 4) return "site site-warn";
  return "site site-bad"; // >=5
}

function ToothColumn({ tooth, row, isMissing, onChange }) {
  // Row format: [MB, B, DB, ML, L, DL] or ["-","-","-","-","-","-"]
  const buccal = row?.slice(0,3) ?? ["","",""];
  const lingual = row?.slice(3,6) ?? ["","",""];

  if (isMissing) {
    return (
      <div className="tooth-col missing-tooth">
        <div className="site-row">
          <div className="site site-missing">X</div>
          <div className="site site-missing">X</div>
          <div className="site site-missing">X</div>
        </div>
        <div className="tooth-id missing-id">{tooth}</div>
        <div className="site-row">
          <div className="site site-missing">X</div>
          <div className="site site-missing">X</div>
          <div className="site site-missing">X</div>
        </div>
      </div>
    );
  }

  return (
    <div className="tooth-col">
      {/* Buccal (top) */}
      <div className="site-row">
        {buccal.map((v, i) => (
          <input
            key={`b-${i}`}
            className={depthClass(v)}
            type="number"
            min="1"
            max="9"
            value={v}
            onChange={(e) => onChange(tooth, i, e.target.value)}
          />
        ))}
      </div>

      {/* Tooth ID */}
      <div className="tooth-id">{tooth}</div>

      {/* Lingual (bottom) */}
      <div className="site-row">
        {lingual.map((v, i) => (
          <input
            key={`l-${i}`}
            className={depthClass(v)}
            type="number"
            min="1"
            max="9"
            value={v}
            onChange={(e) => onChange(tooth, i + 3, e.target.value)}
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
      {/* Upper */}
      <div className="arch-block">
        <div className="arch-title">Upper Arch</div>
        <div className="arch">
          {upperTeeth.map((t) => (
            <ToothColumn
              key={t}
              tooth={t}
              row={chart[t]}
              isMissing={missingSet.has(String(t))}
              onChange={(tooth, idx, val) => {
                const num = Number(val);
                updateDepth(tooth, idx, Number.isFinite(num) ? num : val);
              }}
            />
          ))}
        </div>
      </div>

      {/* Lower */}
      <div className="arch-block">
        <div className="arch-title">Lower Arch</div>
        <div className="arch">
          {lowerTeeth.map((t) => (
            <ToothColumn
              key={t}
              tooth={t}
              row={chart[t]}
              isMissing={missingSet.has(String(t))}
              onChange={(tooth, idx, val) => {
                const num = Number(val);
                updateDepth(tooth, idx, Number.isFinite(num) ? num : val);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
