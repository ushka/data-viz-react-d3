import React, { useMemo } from 'https://cdn.skypack.dev/react';
import { scaleSqrt, max } from 'https://cdn.skypack.dev/d3';
import { Marks } from './Marks';

const sizeValue = d => d['Total Dead and Missing'];
const maxRadius = 20;

export const BubbleMap = ({data, worldAtlas, filteredData}) => {

  const sizeScale = useMemo(() => scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]), [data, sizeValue, maxRadius]);

  return (
    <Marks 
      worldAtlas={worldAtlas} 
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue} />
  );

};