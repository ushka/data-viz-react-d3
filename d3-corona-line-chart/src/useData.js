import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { csv, timeParse } from 'https://cdn.skypack.dev/d3';

const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const sum = (accumulator, currentValue) => accumulator + currentValue;
const parseDate = timeParse('%d/%m/%y');

const transform = rawData => {
  // console.log(rawData.columns);
  const days = rawData.columns.slice(4);
  return days.map(day => {
    const deathTotal = rawData.map(d => +d[day]).reduce(sum, 0);
    return {
      date: parseDate(day),
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