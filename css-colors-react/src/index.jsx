import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { csv, csvFormat, arc, pie } from 'https://cdn.skypack.dev/d3';

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const csvUrl = "https://gist.githubusercontent.com/ushka/e4d6364c7826e702fc8cc6d65b824d17/raw/cssNamedColors.csv";

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(width);  

const App = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(data => {
      console.log('fetching data');
      setData(data);    
    });
  }, [])

  if(!data) {
    return <div>Loading...</div>
  }

  const colorPie = pie().value(1);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {colorPie(data).map(d => (
          <path 
            fill={d.data['RGB hex value']} 
            d={pieArc(d)}
          />
        ))}
      </g>
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
