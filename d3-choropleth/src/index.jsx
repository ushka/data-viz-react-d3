import React, { useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { BubbleMap } from './components/BubbleMap/index';
import { DateHistogram } from './components/DateHistogram/index';

const width = 960;
const height = 500;
const dateHistogramSize = 0.2;
const xValue = d => d['Reported Date'];
const selectedYear = '2017';

const App = () => {
  const worldAtlas = useWorldAtlas();  
  const data = useData();  
  const [brushExtent, setBrushExtent] = useState();

  // console.log(brushExtent);

  if(!worldAtlas || !data) {
    return <div>Loading...</div>
  }  

  const filteredData = data.filter(d => d.Year === selectedYear);
  console.log(filteredData);

  // const filteredData = brushExtent ? data.filter(d => {
  //   const date = xValue(d);
  //   return date > brushExtent[0] && date < brushExtent[1];
  // }) : data;

  return (
    <svg width={width} height={height}>  
      <BubbleMap data={data} filteredData={filteredData} worldAtlas={worldAtlas} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram 
          data={data} 
          width={width} 
          height={dateHistogramSize * height} 
          setBrushExtent={setBrushExtent}
          xValue={xValue} />
      </g>
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
