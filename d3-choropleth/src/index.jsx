import React, { useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { Choropleth } from './components/Choropleth/index';

const width = 960;
const height = 500;
const selectedYear = '2017';

const App = () => {
  const worldAtlas = useWorldAtlas();  
  const data = useData();  

  if(!worldAtlas || !data) {
    return <div>Loading...</div>
  }  

  const filteredData = data.filter(d => d.Year === selectedYear);
  // console.log(filteredData);

  // const filteredData = brushExtent ? data.filter(d => {
  //   const date = xValue(d);
  //   return date > brushExtent[0] && date < brushExtent[1];
  // }) : data;

  return (
    <svg width={width} height={height}>  
      <Choropleth 
        data={data} 
        filteredData={filteredData} 
        worldAtlas={worldAtlas} />
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
