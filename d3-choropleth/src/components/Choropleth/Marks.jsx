import React, { useMemo } from 'https://cdn.skypack.dev/react';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'https://cdn.skypack.dev/d3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ worldAtlas: { countries, interiors }, data, colorScale, colorValue }) => (
  <g className="marks">
    {useMemo(()=>
      <>
        <path className='sphere' d={path( {type: 'Sphere'} )} />
        <path className='graticules' d={path(graticule())} />
        {countries.features.map(feature => (
          <path className='land' d={path(feature)} />
        ))}
        <path className='interiors' d={path(interiors)} />
      </>, [path, graticule, countries, interiors])  
    }
  </g>
);