import React, { useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import ReactDropdown from 'https://cdn.skypack.dev/react-dropdown';
import { scaleLinear, scaleOrdinal, max, format, extent } from 'https://cdn.skypack.dev/d3';
import { useData } from './useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';
import { ColorLegend } from './components/ColorLegend';
// import { Dropdown } from './components/Dropdown';

const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = {
  top: 20,
  right: 200,
  bottom: 65,
  left: 90
};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;
const fadeOpacity = 0.2;

const attributes = [
  {value: "sepal_length", label: 'Sepal Length'},
  {value: "sepal_width", label: 'Sepal Width'},
  {value: "petal_length", label: 'Petal Length'},
  {value: "petal_width", label: 'Petal Width'},
  {value: "species", label: 'Species'}
];

const getLabel = value => {
  for(let i = 0; i < attributes.length; i++) {
    if( attributes[i].value === value ) {
      return attributes[i].label;
    }
  }
};  

const App = () => {
  const data = useData();  

  const initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  const [hoveredValue, setHoveredValue] = useState(null);
  // console.log(hoveredValue);

  const colorValue = d => d.species;
  const colorLegendLabel = 'Species';

  const circleRadius = 7;

  if(!data) {
    return <div>Loading...</div>
  }
  // console.log(data.columns);
  
  const filteredData = data.filter(d => hoveredValue === colorValue(d));

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;  
  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G','B');

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  return (
    <>
      <div className="menu-container">
        <span className="dropdown-label">X</span>
        <ReactDropdown 
          options={attributes} 
          value={xAttribute} 
          onChange={({value}) => setXAttribute(value)} />
        <span className="dropdown-label">Y</span>
        <ReactDropdown 
          options={attributes} 
          value={yAttribute} 
          onChange={({value}) => setYAttribute(value)} />    
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>        
          <AxisBottom 
            xScale={xScale} 
            innerHeight={innerHeight} 
            tickFormat={xAxisTickFormat} 
            tickOffset={5} />
          <text 
            className="axis-label" 
            textAnchor="middle" 
            transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}>{yAxisLabel}</text>  
          <AxisLeft 
            yScale={yScale} 
            innerWidth={innerWidth} 
            tickOffset={5} />        
          <text 
            className="axis-label" 
            x={innerWidth / 2} 
            y={innerHeight + xAxisLabelOffset} 
            textAnchor="middle">{xAxisLabel}</text>      
          <g transform={`translate(${innerWidth + 50}, 50)`}>
            <text 
              className="axis-label"               
              x={35}
              y={-25}
              textAnchor="middle">{colorLegendLabel}</text>
            <ColorLegend
              colorScale={colorScale} 
              tickSpacing={25} 
              tickSize={10} 
              tickTextOffset={20}
              tickSize={circleRadius}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity} />
          </g>
          <g opacity={hoveredValue ? fadeOpacity : 1}>
            <Marks 
              data={data} 
              xScale={xScale} 
              xValue={xValue} 
              yScale={yScale} 
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
              tooltipFormat={xAxisTickFormat} 
              circleRadius={circleRadius} />
          </g>  
          <Marks 
            data={filteredData} 
            xScale={xScale} 
            xValue={xValue} 
            yScale={yScale} 
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat} 
            circleRadius={circleRadius} />  
        </g>
      </svg>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
