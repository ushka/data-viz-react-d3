import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { csv } from 'https://cdn.skypack.dev/d3';

const csvUrl = 'https://gist.githubusercontent.com/ushka/441c68557b8c5c844a48604d9f8bf465/raw/UN_Population_2019.csv';

export const useData = () => {
 const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.Population = +d['2020'] * 1000;  // data is in thousands
      return d;
    };
    csv(csvUrl, row).then(data => {
      console.log('fetching data');
      setData(data.slice(0, 10));    
    });
  }, [])

  return data;
};