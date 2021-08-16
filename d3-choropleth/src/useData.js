import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { csv } from 'https://cdn.skypack.dev/d3';

const csvUrl = 'https://gist.githubusercontent.com/ushka/af99f608fbcb5c68a70719fe73a087b4/raw/4a9604faff44f05dfe1761469593238697fc1e82/share-of-population-infected-with-hiv-ihme.csv';

const row = d => {
  d.aids = +d['Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent)'];  
  return d;
}

export const useData = () => {
 const [data, setData] = useState(null);

 // if(data) {
 //   console.log(data);
 // }

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, [])

  return data;
};