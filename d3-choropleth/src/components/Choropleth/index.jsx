import React, { useMemo } from 'https://cdn.skypack.dev/react';
import { schemeYlOrRd, scaleSequential, max } from 'https://cdn.skypack.dev/d3';
import { Marks } from './Marks';

const colorValue = d => d.aids;
const maxRadius = 20;

export const Choropleth = ({data, worldAtlas, filteredData}) => {

  const colorScale = scaleSequential(schemeYlOrRd)
    .domain([0, max(data, colorValue)]);

  return (
    <Marks 
      worldAtlas={worldAtlas} 
      data={filteredData}
      colorScale={colorScale}
      colorValue={colorValue} />
  );

};