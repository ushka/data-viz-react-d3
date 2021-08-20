import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { json } from 'https://cdn.skypack.dev/d3';
import { feature, mesh } from 'https://cdn.skypack.dev/topojson';

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useWorldAtlas = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(topology => {
      const { countries, land } = topology.objects;
      setData({
        countries: feature(topology, countries),
        interiors: mesh(topology, countries, (a, b) => a !== b)
      });
    });
  }, []);

  return data;
};