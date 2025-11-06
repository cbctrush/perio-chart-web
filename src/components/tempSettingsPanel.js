import React from 'react';

const allTeeth = [
  18,17,16,15,14,13,12,11,
  21,22,23,24,25,26,27,28,
  48,47,46,45,44,43,42,41,
  31,32,33,34,35,36,37,38
];

function SettingsPanel({weights, setWeights, missingTeeth, setMissingTeeth}) {

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setWeights({...weights, [name]: Number(value)});
  };

  const handleMissingTeethChange = (e) => {
    const tooth = Number(e.target.value);
    if(e.target.checked){
      setMissingTeeth([...missingTeeth, tooth]);
    } else {
      setMissingTeeth(missingTeeth.filter(t => t !== tooth));
    }
  };

  return (
    <div className="settings-panel">
      <h2>Settings</h2>
      <div className="weights">
        <h3>Probing Depth Weights (%)</h3>
        {[1,2,3,4].map(d => (
          <label key={d}>
            {d} mm:
            <input type="number" name={d} value={weights[d]} onChange={handleWeightChange} min="0" max="100" />
          </label>
        ))}
      </div>
      <div className="missing-teeth">
        <h3>Missing Teeth</h3>
        <div className="teeth-list">
          {allTeeth.map(t => (
            <label key={t}>
              <input type="checkbox" value={t} checked={missingTeeth.includes(t)} onChange={handleMissingTeethChange} /> {t}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
