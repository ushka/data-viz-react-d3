import React from 'https://cdn.skypack.dev/react';
import { scaleTime } from 'https://cdn.skypack.dev/d3';

export const LineChart = ({ data, width, height }) => {
  const xScale = scaleTime()
    .domain([min(data, d => d.date), max(data, d => d.date)])
    .range([0, width]);

  console.log(xScale.domain());

  return <svg width={width} height={height} />
}