import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { csv, timeParse } from 'https://cdn.skypack.dev/d3';

const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const sum = (accumulator, currentValue) => accumulator + currentValue;
const parseDay = timeParse('%m/%d/%y');

const transform = rawData => {

  console.log(rawData);
  
  // filter out rows that that represent provinces or states
  // const countriesData = rawData.filter(d => !d['Province/State']);
  const countriesData = rawData.filter(d => {
    if(d['Province/State'] !== 'Australia' && d['Province/State'] !== 'Canada' && d['Province/State'] === 'China') {
      return !d['Province/State'];
    } else {
      return d;
    }
  });

  // Get timeseries data for each country
  const days = rawData.columns.slice(4);
  return countriesData.map(d => {
    const countryName = d['Country/Region'];
    
    const countryTimeSeries = days.map(day => ({
      date: parseDay(day),
      deathTotal: +d[day],
      countryName
    }));  
    countryTimeSeries.countryName = countryName;
    console.log(countryTimeSeries);
    return countryTimeSeries;
  });  
  
};

export const useData = () => {
  const [data, setData] = useState(null);

  // if(data) {
  //   console.log('useData data', data);
  // }

  useEffect(() => {
    csv(csvUrl).then(rawData => {
      setData(transform(rawData));
    });
  }, [])

  return data;
};