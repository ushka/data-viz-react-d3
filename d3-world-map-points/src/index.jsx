import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { scaleSqrt, max } from 'https://cdn.skypack.dev/d3';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';
import { Marks } from './components/Marks';

const width = 960;
const height = 500;

const App = () => {
  const worldAtlas = useWorldAtlas();  
  const cities = useCities();  
  // console.log(cities);

  if(!worldAtlas || !cities) {
    return <div>Loading...</div>
  }

  const sizeValue = d => d.population;
  const maxRadius = 20;

  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue)])
    .range([0, maxRadius]);

  // console.log(max(cities, sizeValue));
  // console.log(sizeValue(cities[0]));

  return (
    <svg width={width} height={height}>      
      <Marks 
        worldAtlas={worldAtlas} 
        cities={cities}
        sizeScale={sizeScale}
        sizeValue={sizeValue} />
    </svg>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
