import React, { useState } from 'react';
import SettingsPanel from './components/SettingsPanel';
import ArchTable from './components/ArchTable';

// Classical clinical FDI layout
const upperArch = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const lowerArch = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

const sites = ["MB","B","DB","ML","L","DL"];

function App() {
  const [weights, setWeights] = useState({1:20, 2:40, 3:40, 4:0});
  const [missingTeeth, setMissingTeeth] = useState([]);
  const [chart, setChart] = useState({});

  const generateChart = () => {
    const chartData = {};
    const allTeeth = upperArch.concat(lowerArch);
    const teethToUse = allTeeth.filter(t => !missingTeeth.includes(t));

    const depthValues = Object.keys(weights).map(Number);
    const depthWeights = depthValues.map(v => weights[v]);

    teethToUse.forEach(tooth => {
      const depths = [];
      for(let i=0; i<sites.length; i++){
        const rand = Math.random() * 100;
        let cumulative = 0;
        for(let j=0;j<depthValues.length;j++){
          cumulative += depthWeights[j];
          if(rand <= cumulative){
            depths.push(depthValues[j]);
            break;
          }
        }
      }
      chartData[tooth] = depths;
    });

    setChart(chartData);
  };

  return (
    <div className="App">
      <h1>Clinical Periodontal Chart (FDI)</h1>
      <SettingsPanel
        weights={weights}
        setWeights={setWeights}
        missingTeeth={missingTeeth}
        setMissingTeeth={setMissingTeeth}
      />
      <button className="generate-btn" onClick={generateChart}>Generate Random Chart</button>

      <h2>Upper Arch</h2>
      <ArchTable chart={chart} sites={sites} teeth={upperArch} missingTeeth={missingTeeth} />

      <h2>Lower Arch</h2>
      <ArchTable chart={chart} sites={sites} teeth={lowerArch} missingTeeth={missingTeeth} />

      <button className="print-btn" onClick={()=>window.print()}>Print Chart</button>
    </div>
  );
}

export default App;
