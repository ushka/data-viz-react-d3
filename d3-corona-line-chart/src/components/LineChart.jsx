import React from 'https://cdn.skypack.dev/react';
import { scaleTime, extent } from 'https://cdn.skypack.dev/d3';

export const LineChart = ({ data, width, height }) => {
  const xScale = scaleTime()
    .domain(extent(data, d => d.date))
    .range([0, width]);

  console.log(xScale.domain());

  return <svg width={width} height={height} />
}