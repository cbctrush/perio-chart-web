import React from "react";

const upperTeeth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const lowerTeeth = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

function colorForValues(text) {
  const values = text
    .split(" ")
    .map(v => parseInt(v))
    .filter(v => !isNaN(v));
  if (!values.length) return "#000";
  const maxVal = Math.max(...values);
  if (maxVal <= 3) return "#00a651";
  if (maxVal === 4) return "#ff8c00";
  return "#d93025";
}

function ToothBox({ tooth, topValue, bottomValue, isMissing, onChange }) {
  if (isMissing) {
    return (
      <div className="tooth-col missing-tooth">
        <div className="site-box site-missing">X</div>
        <div className="tooth-id missing-id">{tooth}</div>
        <div className="site-box site-missing">X</div>
      </div>
    );
  }

  return (
    <div className="tooth-col">
      <input
        type="text"
        className="site-box"
        placeholder="3 2 4"
        style={{ color: colorForValues(topValue) }}
        value={topValue}
        onChange={(e) => onChange(tooth, "top", e.target.value)}
      />
      <div className="tooth-id">{tooth}</div>
      <input
        type="text"
        className="site-box"
        placeholder="2 3 3"
        style={{ color: colorForValues(bottomValue) }}
        value={bottomValue}
        onChange={(e) => onChange(tooth, "bottom", e.target.value)}
      />
    </div>
  );
}

function ArchWithLabels({ title, teethList, chart, missingSet, onChange, isUpper }) {
  const topLabel = "B";
  const bottomLabel = isUpper ? "P" : "L";

  return (
    <div className="arch-block">
      <div className="arch-title">{title}</div>
      <div className="arch-with-label">
        <div className="arch-labels">
          <div className="arch-label">{topLabel}</div>
          <div className="arch-label">{bottomLabel}</div>
        </div>
        <div className="arch">
          {teethList.map((t) => (
            <ToothBox
              key={t}
              tooth={t}
              topValue={(chart[t]?.slice(0, 3) || []).join(" ")}
              bottomValue={(chart[t]?.slice(3, 6) || []).join(" ")}
              isMissing={missingSet.has(String(t))}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ToothChart({ chart = {}, missingTeeth = [], updateDepth }) {
  const missingSet = new Set(missingTeeth.map(String));

  const handleChange = (tooth, pos, text) => {
    const parts = text.split(" ").map((v) => parseInt(v));
    const arr = chart[tooth] ? [...chart[tooth]] : Array(6).fill("");
    if (pos === "top") {
      for (let i = 0; i < 3; i++) arr[i] = parts[i] || "";
    } else {
      for (let i = 0; i < 3; i++) arr[i + 3] = parts[i] || "";
    }
    updateDepth(tooth, -1, arr);
  };

  return (
    <div className="tooth-chart-wrapper">
      <ArchWithLabels
        title="Upper Arch"
        teethList={upperTeeth}
        chart={chart}
        missingSet={missingSet}
        onChange={handleChange}
        isUpper={true}
      />
      <ArchWithLabels
        title="Lower Arch"
        teethList={lowerTeeth}
        chart={chart}
        missingSet={missingSet}
        onChange={handleChange}
        isUpper={false}
      />
    </div>
  );
}
