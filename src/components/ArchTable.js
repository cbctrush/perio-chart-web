import React from "react";

function ArchTable({ chart, teeth, missingTeeth, updateDepth }) {
  const sites = ["MB", "B", "DB", "ML", "L", "DL"]; // standard perio chart sites

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
          {teeth.map((tooth) => (
            <tr key={tooth} className={missingTeeth.includes(tooth) ? "missing" : ""}>
              <td>{tooth}</td>
              {missingTeeth.includes(tooth)
                ? sites.map((_, idx) => <td key={idx} className="missing">X</td>)
                : chart[tooth].map((value, idx) => (
                    <td key={idx} className="depth-cell">
                      <input
                        type="number"
                        min="1"
                        max="9"
                        value={value}
                        className="depth-input"
                        onChange={(e) => updateDepth(tooth, idx, Number(e.target.value))}
                      />
                    </td>
                  ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArchTable;
