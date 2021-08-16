import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { arc } from 'https://cdn.skypack.dev/d3';

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 20;
const eyeOffsetX = 90;
const eyeOffsetY = 100;
const eyeRadius = 40;
const mouthWidth = 20;
const mouthRadius = 150;
  
const mouthArc = 
  arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2)
    .endAngle(Math.PI * 3 / 2);

const App = () => (
  <svg width={width} height={height}>
    <g transform={`translate(${centerX}, ${centerY})`}>
      <circle 
        r={centerY - strokeWidth / 2}
        fill="yellow"
        stroke="black"
        stroke-width={strokeWidth}
      />
      <circle 
        cx={-eyeOffsetX}
        cy={-eyeOffsetY}
        r={eyeRadius}
      />
      <circle 
        cx={eyeOffsetX}
        cy={-eyeOffsetY}
        r={eyeRadius}
      />
      <path d={mouthArc()} />
    </g>
  </svg>
);

ReactDOM.render(<App />, document.getElementById("root"));
