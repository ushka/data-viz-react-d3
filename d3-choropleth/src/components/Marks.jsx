import React from 'https://cdn.skypack.dev/react';
import { line, curveNatural } from 'https://cdn.skypack.dev/d3';

export const Marks = ({ binnedData, xScale, yScale, tooltipFormat, innerHeight }) => (
  <g className="marks">
    {
      binnedData.map(d => (
        <rect  
          x={xScale(d.x0)} 
          y={yScale(d.y)}
          width={xScale(d.x1) - xScale(d.x0)}
          height={innerHeight - yScale(d.y)}
        >
          <title>{tooltipFormat(d.y)}</title>  
        </rect>
      ))
    }
  </g>
);