import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { scaleLinear, scaleTime, timeFormat, extent } from 'https://cdn.skypack.dev/d3';
import { useData } from './useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';

const width = 960;
const height = 500;
const margin = {
  top: 20,
  right: 30,
  bottom: 65,
  left: 90
};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const App = () => {
  const data = useData();  

  if(!data) {
    return <div>Loading...</div>
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
  const xValue = d => d.timestamp;
  const xAxisLabel = 'Time';

  const yValue = d => d.temperature;
  const yAxisLabel = 'Temperature';

  const xAxisTickFormat = timeFormat('%a');

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  console.log(xScale.ticks());  

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>        
        <AxisBottom 
          xScale={xScale} 
          innerHeight={innerHeight} 
          tickFormat={xAxisTickFormat} 
          tickOffset={7} />        
        <text 
          className="axis-label" 
          textAnchor="middle" 
          transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}>{yAxisLabel}</text>        
        <AxisLeft 
          yScale={yScale} 
          innerWidth={innerWidth} 
          tickOffset={7} />          
        <text 
          className="axis-label" 
          x={innerWidth / 2} 
          y={innerHeight + xAxisLabelOffset} 
          textAnchor="middle">{xAxisLabel}</text>
        <Marks 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue} 
          yValue={yValue} 
          tooltipFormat={xAxisTickFormat} 
          circleRadius={3} />
      </g>
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
