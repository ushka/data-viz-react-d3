import React from 'https://cdn.skypack.dev/react';

export const YMarkerLine = ({ value, yScale, innerWidth }) => {
  const markerLineY = yScale(value);
  const markerLineX1 = 0;
  const markerLineX2 = innerWidth;
  return (
    <>
      <line 
        className="markerLine" 
        x1={markerLineX1} 
        y1={markerLineY} 
        x2={markerLineX2} 
        y2={markerLineY} />
      <text 
        text-anchor="end" 
        alignment-baseline="middle" 
        x={markerLineX1 - 5} 
        y={markerLineY}>4,000,000</text>
    </>
  );
};