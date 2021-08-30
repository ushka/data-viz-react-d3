import React from 'https://cdn.skypack.dev/react';
import { timeFormat } from 'https://cdn.skypack.dev/d3';

const formatDate = timeFormat('%d %b, %Y');

export const Tooltip = ({ activeRow, className }) => { 
  return (
    <text 
      className={className}
      x={-10} 
      y={-10} 
      text-anchor={`end`} >
        {activeRow.countryName}: {activeRow.deathTotal.toLocaleString()} death{activeRow.deathTotal > 1 ? 's' : ''} as of {formatDate(activeRow.date)}
    </text>
  );
}