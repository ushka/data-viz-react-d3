import React from 'https://cdn.skypack.dev/react';
import { scaleTime, extent, scaleLinear, max } from 'https://cdn.skypack.dev/d3';

export const LineChart = ({ data, width, height }) => {
  const xScale = scaleTime()
    .domain(extent(data, d => d.date))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, max(data, d => d.deathTotal)])
    .range([height, 0]);

  console.log(xScale.domain());
  console.log(yScale.domain());

  return <svg width={width} height={height} />
}