import React from 'react';

function ArchTable({chart, sites, teeth, missingTeeth}) {

  const handleCellChange = (tooth,index,value) => {
    const newChart = {...chart};
    newChart[tooth][index] = Number(value);
    chart && newChart && chart[tooth] && (chart[tooth] = newChart[tooth]);
  };

  return (
    <div className="chart-table-container">
      <table className="chart-table">
        <thead>
          <tr>
            <th>Tooth</th>
            {sites.map(site => <th key={site}>{site}</th>)}
          </tr>
        </thead>
        <tbody>
          {teeth.filter(t => !missingTeeth.includes(t)).map(tooth => (
            <tr key={tooth}>
              <td>{tooth}</td>
              {chart[tooth]?.map((value, idx) => (
                <td key={idx}>
                  <input type="number" min="0" max="9" value={value} onChange={e=>handleCellChange(tooth,idx,e.target.value)} />
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
