import React from 'https://cdn.skypack.dev/react';
import { scaleTime, extent, scaleLinear, max, line } from 'https://cdn.skypack.dev/d3';

const xValue = d => d.date;
const yValue = d => d.deathTotal;
const margin = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 90
};

export const LineChart = ({ data, width, height }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0]);

  const lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)));

  const markerLineY = yScale(100000);
  const markerLineX1 = 0;
  const markerLineX2 = innerWidth;

  return (
    <svg width={width} height={height}> 
      <g transform={`translate(${margin.left},${margin.top})`}>
        <line className="markerLine" x1={markerLineX1} y1={markerLineY} x2={markerLineX2} y2={markerLineY} />
        <path d={lineGenerator(data)} />
      </g>
    </svg>
  );  
}