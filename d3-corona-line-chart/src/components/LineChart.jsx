import React from 'https://cdn.skypack.dev/react';
import { scaleTime, extent, scaleLinear, max, line } from 'https://cdn.skypack.dev/d3';

const xValue = d => d.date;
const yValue = d => d.deathTotal;

export const LineChart = ({ data, width, height }) => {
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([height, 0]);

  // console.log(xScale.domain());
  // console.log(yScale.domain());

  const lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))

  return (
    <svg width={width} height={height}> 
      <path d={lineGenerator(data)} />
    </svg>
  );  
}