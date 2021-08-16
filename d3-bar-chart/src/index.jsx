import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { csv, csvFormat, scaleBand, scaleLinear, max } from 'https://cdn.skypack.dev/d3';

const width = 960;
const height = 500;
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 200
};
const centerX = width / 2;
const centerY = height / 2;
const csvUrl = 'https://gist.githubusercontent.com/ushka/441c68557b8c5c844a48604d9f8bf465/raw/UN_Population_2019.csv';

const App = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.Population = +d['2020']
      return d;
    };
    csv(csvUrl, row).then(data => {
      console.log('fetching data');
      setData(data.slice(0, 10));    
    });
  }, [])

  if(!data) {
    return <div>Loading...</div>
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, innerWidth]);

  console.log(xScale.ticks());  

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {xScale.ticks().map(tickValue => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line 
              x1={0}
              y1={0}
              x2={0}
              y2={innerHeight} 
              stroke="black"
            />
            <text style={{textAnchor: 'middle'}} dy=".71em" y={innerHeight + 3}>{tickValue}</text>
          </g>
        ))}
        {yScale.domain().map(tickValue => (
          <text 
            key={tickValue}
            style={{textAnchor: 'end'}} 
            x={-3} 
            y={yScale(tickValue) + yScale.bandwidth() / 2}
            dy=".32em"
            >
              {tickValue}
          </text>
        ))}
        {data.map(d => 
          <rect 
            key={d.Country}
            x={0} 
            y={yScale(d.Country)} 
            width={xScale(d.Population)} 
            height={yScale.bandwidth()} 
        />)}
      </g>
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
