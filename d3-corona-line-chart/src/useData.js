import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { csv } from 'https://cdn.skypack.dev/d3';

const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const sum = (accumulator, currentValue) => accumulator + currentValue;

const transform = rawData => {
  // console.log(rawData.columns);
  const dates = rawData.columns.slice(4);
  return dates.map(date => {
    const deathTotal = rawData.map(d => +d[date]).reduce(sum, 0);
    return {
      date,
      deathTotal
    };
  });  
};

export const useData = () => {
  const [data, setData] = useState(null);

  // if(data) {
  //   console.log(data);
  // }

  useEffect(() => {
    csv(csvUrl).then(rawData => {
      setData(transform(rawData));
    });
  }, [])

  return data;
};