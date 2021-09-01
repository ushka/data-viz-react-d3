import React, { useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { useData } from './useData';
import { LineChart } from './components/LineChart';

const width = 960;
const height = 500;

const App = () => { 
  const data = useData();  
  return data 
    ? <LineChart data={data} width={width} height={height} /> 
    : <div>Loading...</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
