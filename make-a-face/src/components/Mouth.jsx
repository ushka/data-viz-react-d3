import React from 'https://cdn.skypack.dev/react';
import { arc } from 'https://cdn.skypack.dev/d3';

export const Mouth = ({mouthRadius, mouthWidth}) => {

  const mouthArc = arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2)
    .endAngle(Math.PI * 3 / 2);

  return <path d={mouthArc()} />

};
