import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import { csv, timeParse } from 'https://cdn.skypack.dev/d3';

const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const sum = (accumulator, currentValue) => accumulator + currentValue;
const parseDay = timeParse('%m/%d/%y');

const transform = rawData => {

  console.log(rawData);
  
  // -------------------------------------------------------------------------------------------------------------------
  // Implementation 1
  // -------------------------------------------------------------------------------------------------------------------

  // filter out rows that that represent provinces or states
  // const countriesData = rawData.filter(d => !d['Province/State']);
  const countriesData = rawData.filter(d => {
    if(d['Country/Region'] !== 'Summer Olympics 2020') {
      return d;
    } 
    if(d['Country/Region'] !== 'Australia' && d['Country/Region'] !== 'Canada' && d['Country/Region'] !== 'China') {
      return !d['Province/State'];      
    }
    else {
      return d;
    }
  });
  
  // Get timeseries data for each country
  const days = rawData.columns.slice(4);
  // Only return 2021 data
  // console.log(rawData.columns.slice(349));
  return countriesData.map(d => {
    const countryName = d['Country/Region'];    
    
    const countryTimeSeries = days.map(day => ({
      date: parseDay(day),
      deathTotal: +d[day],
      countryName
    }));  
    countryTimeSeries.countryName = countryName;

    return countryTimeSeries;
  });  

  // -------------------------------------------------------------------------------------------------------------------
  // Implementation 2
  // -------------------------------------------------------------------------------------------------------------------

  // const columns = Object.keys(rawData[0]);
  // const provinceKey = columns[0];
  // const countryKey = columns[1];
  // const latKey = columns[2];
  // const lngKey = columns[3];
  // const dateKeys = columns.slice(4);
  // return rawData.reduce((acc, curr) => {
  //   const countryName = curr[countryKey];

  //   const countryTimeSeries = dateKeys.map((date) => ({
  //     date: parseDay(date),
  //     deathTotal: +curr[date],
  //     countryName
  //   }));
  //   countryTimeSeries.countryName = countryName;

  //   return [
  //     ...acc,
  //     countryTimeSeries
  //   ];
  // }, []);
  
};

export const useData = () => {
  const [data, setData] = useState(null);

  if(data) {
    console.log('useData data', data);
  }

  useEffect(() => {
    const loadCSV = async () => {
      const rawData = await csv(csvUrl);
      setData(transform(rawData));
    };

    loadCSV();
  }, []);

  return data;
};
