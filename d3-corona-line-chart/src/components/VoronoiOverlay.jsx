import React, { useMemo } from 'https://cdn.skypack.dev/react';
import { Delaunay } from "https://cdn.skypack.dev/d3-delaunay@6";

export const VoronoiOverlay = ({ innerWidth, innerHeight, allData, lineGenerator, onHover }) => {
  const points = allData.map(d => [lineGenerator.x()(d), lineGenerator.y()(d)]);
  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, innerWidth, innerHeight]);

  return <g className="voronoi">
    {points.map((point, i) => (
      <path 
        onMouseEnter={() => onHover(allData[i])} 
        fill="none" 
        stroke="pink"
        d={voronoi.renderCell(i)} />
    ))}
  </g>
};
