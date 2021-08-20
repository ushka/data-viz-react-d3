import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { csv } from 'https://cdn.skypack.dev/d3';

const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

export const useData = () => {
  const [data, setData] = useState(null);

  // if(data) {
  //   console.log(data);
  // }

  useEffect(() => {
    csv(csvUrl).then(data => {
      setData(data)
    });
  }, [])

  return data;
};