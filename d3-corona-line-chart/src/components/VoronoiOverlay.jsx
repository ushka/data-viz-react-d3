import React, { useMemo } from 'https://cdn.skypack.dev/react';
import { Delaunay } from "https://cdn.skypack.dev/d3-delaunay@6";

export const VoronoiOverlay = ({ innerWidth, innerHeight, allData, lineGenerator, onHover }) => {  
  
  // Used to debug what dependency is causing memoizing to keep firing when it should only fire once
  // useMemo(() => {
  //   console.log('memoizing');
  // },[lineGenerator]);

  return useMemo(() => {
    console.log('memoizing');
    const points = allData.map(d => [
      lineGenerator.x()(d),
      lineGenerator.y()(d)
    ]);
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, innerWidth, innerHeight]);
    return (
      <g className="voronoi">
        {points.map((point, i) => (
          <path
            onMouseEnter={() => onHover(allData[i])}            
            d={voronoi.renderCell(i)}
          />
        ))}
      </g>
    );
  }, [allData, lineGenerator, innerWidth, innerHeight, onHover]);
};
