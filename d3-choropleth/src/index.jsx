import React, { useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { interpolateYlOrRd, scaleSequential, max } from 'https://cdn.skypack.dev/d3';
import { Marks } from './components/Marks';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { useCodes } from './useCodes';

const width = 960;
const height = 500;
const selectedYear = '2017';

const App = () => {
  const worldAtlas = useWorldAtlas();  
  const data = useData();
  const codes = useCodes();

  if(!worldAtlas || !data || !codes) {
    return <div>Loading...</div>
  }  
  console.log(codes)

  const numericCodeByAlphaCode = new Map();
  codes.forEach(code => {
    const alpha3Code = code['alpha-3'];
    const numericCode = code['country-code'];
    numericCodeByAlphaCode.set(alpha3Code, numericCode);
  });
  
  const filteredData = data.filter(d => d.Year === selectedYear);

  const rowByNumericCode = new Map();
  filteredData.forEach(d => {
    const alpha3Code = d.Code;
    const numericCode = numericCodeByAlphaCode.get(alpha3Code);
    rowByNumericCode.set(numericCode, d);
  });

  const colorValue = d => d.aids;

  const colorScale = scaleSequential(interpolateYlOrRd).domain([
    0,
    max(data, colorValue)
  ]);


  return (
    <svg width={width} height={height}>  
      <Marks 
        worldAtlas={worldAtlas}
        rowByNumericCode={rowByNumericCode}
        colorScale={colorScale}
        colorValue={colorValue}
      />
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
