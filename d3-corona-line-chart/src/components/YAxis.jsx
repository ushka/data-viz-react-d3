import React, { useRef, useEffect } from 'https://cdn.skypack.dev/react';
import { select, axisLeft } from 'https://cdn.skypack.dev/d3';

export const YAxis = ({ yScale, innerWidth }) => {
  const ref = useRef();
  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(3)
      .ticks(10, '~s');
    yAxisG.call(yAxis);
  }, []);
  return <g ref={ref} />;
};