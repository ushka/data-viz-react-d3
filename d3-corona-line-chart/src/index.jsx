import React, { useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { useData } from './useData';
import { LineChart } from './components/LineChart';

const width = window.innerWidth;
const height = window.innerHeight;

const App = () => { 
  const data = useData();  
  return data 
    ? <LineChart data={data} width={width} height={height} /> 
    : null;
};

ReactDOM.render(<App />, document.getElementById("root"));
