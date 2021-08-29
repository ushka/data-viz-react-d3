import React from 'https://cdn.skypack.dev/react';
import { Delaunay } from "https://cdn.skypack.dev/d3-delaunay@6";

export const VoronoiOverlay = ({ innerWidth, innerHeight }) => {
  const points = [[0, 0], [200, 200], [150, 400]];
  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, innerWidth, innerHeight]);
  
  return <g className="voronoi">
    {points.map((point, i) => (
      <path fill="none" stroke="black" d={voronoi.renderCell(i)} />
    ))}
  </g>
};
