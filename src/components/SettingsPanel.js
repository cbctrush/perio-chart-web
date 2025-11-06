import React from 'react';

const allTeeth = [
  18,17,16,15,14,13,12,11,
  21,22,23,24,25,26,27,28,
  48,47,46,45,44,43,42,41,
  31,32,33,34,35,36,37,38
];

function SettingsPanel({
  probabilities = { 1: 20, 2: 40, 3: 40, 4: 0 },
  setProbabilities = () => {},
  missingTeeth = [],
  setMissingTeeth = () => {}
}) {
  const handleWeightChange = (e) => {
    const { name, value } = e.target;   // name = "1" | "2" | "3" | "4"
    const v = Number(value);
    setProbabilities({
      ...probabilities,
      [name]: Number.isFinite(v) ? v : 0
    });
  };

  const handleMissingTeethChange = (e) => {
    const tStr = String(e.target.value);
    if (e.target.checked) {
      if (!missingTeeth.includes(tStr)) {
        setMissingTeeth([...missingTeeth, tStr]);
      }
    } else {
      setMissingTeeth(missingTeeth.filter(x => x !== tStr));
    }
  };

  const val = (k) => (probabilities?.[k] ?? 0);

  return (
    <div className="settings-panel">
      <h2>Settings</h2>

      <div className="weights settings-section">
        <h3>Probing Depth Weights (%)</h3>
        {[1,2,3,4].map((d) => (
          <label key={d}>
            {d} mm:&nbsp;
            <input
              type="number"
              name={String(d)}
              value={val(d)}
              onChange={handleWeightChange}
              min="0"
              max="100"
            />
          </label>
        ))}
        <p style={{fontSize:12, color:'#666', marginTop:8}}>
          Tip: These are percentages; they don’t need to sum exactly to 100.
        </p>
      </div>

      <div className="missing-teeth settings-section">
        <h3>Missing Teeth</h3>
        <div className="teeth-list">
          {allTeeth.map((t) => {
            const tStr = String(t);
            return (
              <label key={t}>
                <input
                  type="checkbox"
                  value={t}
                  checked={missingTeeth.includes(tStr)}
                  onChange={handleMissingTeethChange}
                /> {t}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
