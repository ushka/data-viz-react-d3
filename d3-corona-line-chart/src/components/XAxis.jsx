import React, { useRef, useEffect } from 'https://cdn.skypack.dev/react';
import { select, axisBottom } from 'https://cdn.skypack.dev/d3';

export const XAxis = ({ xScale, innerHeight }) => {
  const ref = useRef();
  useEffect(() => {
    const xAxisG = select(ref.current);
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);
    xAxisG.call(xAxis);
  }, []);
  return <g transform={`translate(0, ${innerHeight})`} ref={ref} />;
};