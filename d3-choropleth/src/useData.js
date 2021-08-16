import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { csv } from 'https://cdn.skypack.dev/d3';

const csvUrl = 'https://gist.githubusercontent.com/ushka/af99f608fbcb5c68a70719fe73a087b4/raw/4a9604faff44f05dfe1761469593238697fc1e82/share-of-population-infected-with-hiv-ihme.csv';

export const useData = () => {
 const [data, setData] = useState(null);

  // if(data) {
  //   console.log(data[0]);
  // }

  useEffect(() => {
    const row = d => {
      d['Total Dead and Missing'] = +d['Total Dead and Missing'];
      d['Reported Date'] = new Date(d['Reported Date']);
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, [])

  return data;
};