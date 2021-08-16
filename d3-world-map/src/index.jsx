import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
// import {  } from 'https://cdn.skypack.dev/d3';
import { useData } from './useData';
import { Marks } from './components/Marks';

const width = 960;
const height = 500;

const App = () => {
  const data = useData();  

  if(!data) {
    return <div>Loading...</div>
  }

  return (
    <svg width={width} height={height}>      
        <Marks 
          data={data} />
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
