import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { scaleLinear, scaleTime, timeFormat, extent, bin, timeMonths, sum, max } from 'https://cdn.skypack.dev/d3';
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
const xAxisLabelOffset = 80;
const yAxisLabelOffset = 45;

const App = () => {
  const data = useData();  

  if(!data) {
    return <div>Loading...</div>
  }

  const xValue = d => d['Reported Date'];
  const xAxisLabel = 'Date';

  const yValue = d => d['Total Dead and Missing'];
  const yAxisLabel = 'Total Dead and Missing';  

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right; 

  const xAxisTickFormat = timeFormat('%m/%d/%Y');

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();  

  const [start, stop] = xScale.domain();  

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0])
    .nice();  

  console.log(yScale.domain());
  console.log(binnedData);      

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
          binnedData={binnedData} 
          xScale={xScale} 
          yScale={yScale} 
          tooltipFormat={d => d} 
          innerHeight={innerHeight} />
      </g>
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
