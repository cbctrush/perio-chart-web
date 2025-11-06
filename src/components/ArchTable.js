import React from "react";

function ArchTable({ chart = {}, teeth = [], missingTeeth = [], updateDepth = () => {} }) {
  const sites = ["MB", "B", "DB", "ML", "L", "DL"];

  const hasChart = chart && Object.keys(chart).length > 0;
  if (!hasChart) return null; // nothing until you click "Generate"

  return (
    <div className="chart-table-container">
      <table className="chart-table">
        <thead>
          <tr>
            <th>Tooth</th>
            {sites.map((site) => (
              <th key={site}>{site}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teeth.map((tooth) => {
            const tStr = String(tooth);
            const row = chart[tooth];

            // Missing tooth row
            if (missingTeeth.includes(tStr)) {
              return (
                <tr key={tooth} className="missing">
                  <td>{tooth}</td>
                  {sites.map((_, idx) => (
                    <td key={idx} className="missing">X</td>
                  ))}
                </tr>
              );
            }

            // Defensive: if row undefined, render blanks
            if (!row) {
              return (
                <tr key={tooth}>
                  <td>{tooth}</td>
                  {sites.map((_, idx) => <td key={idx}></td>)}
                </tr>
              );
            }

            return (
              <tr key={tooth}>
                <td>{tooth}</td>
                {row.map((value, idx) => (
                  <td key={idx} className="depth-cell">
                    {value === "-" ? (
                      <span className="missing">-</span>
                    ) : (
                      <input
                        type="number"
                        min="1"
                        max="9"
                        value={value}
                        className="depth-input"
                        onChange={(e) => updateDepth(tooth, idx, Number(e.target.value))}
                      />
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ArchTable;
