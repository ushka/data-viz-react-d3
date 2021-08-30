import React, { useState, useCallback, useMemo } from 'https://cdn.skypack.dev/react';
import { scaleTime, extent, scaleLog, max, line } from 'https://cdn.skypack.dev/d3';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { VoronoiOverlay } from './VoronoiOverlay';
import { Tooltip } from './Tooltip';

const xValue = d => d.date;
const yValue = d => d.deathTotal;
const margin = {
  top: 60,
  right: 40,
  bottom: 100,
  left: 100
};

export const LineChart = ({ data, width, height }) => {
  const [activeRow, setActiveRow] = useState();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const allData = useMemo(
    () => 
      data.reduce(
        (accumulator, countryTimeseries) => 
          accumulator.concat(countryTimeseries), 
        []
      ),
    [data]
  );

  const epsilon = 1;

  const xScale = useMemo(
    () => 
      scaleTime()
        .domain(extent(allData, xValue))
        .range([0, innerWidth]), 
        [allData, xValue]
  );

  const yScale = useMemo(
    () => 
      scaleLog()
        .domain([epsilon, max(allData, yValue)])
        .range([innerHeight, 0]), [epsilon, allData, yValue]
  );

  const lineGenerator = useMemo(
    () => 
      line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(epsilon + yValue(d))), 
        [xScale, xValue, yScale, yValue]
  );    

  const mostRecentDate = xScale.domain()[1];

  const handleVoronoiHover = useCallback(setActiveRow,[]);

  return (
    <svg width={width} height={height}> 
      <g transform={`translate(${margin.left},${margin.top})`}>
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <YAxis yScale={yScale} innerWidth={innerWidth} />
        {data.map(countryTimeseries => {
          return (
            <path className="markerLine" d={lineGenerator(countryTimeseries)} />
          );
        })}
        {activeRow ? (
          <>
            <path 
              className="markerLine active" 
              d={lineGenerator(data.find(countryTimeseries => countryTimeseries.countryName === activeRow.countryName))}
            />
            <g transform={`translate(${lineGenerator.x()(activeRow)}, ${lineGenerator.y()(activeRow)})`}>
              <circle r={2} />
              <Tooltip activeRow={activeRow} className="tooltip-stroke"/>
              <Tooltip activeRow={activeRow} className="tooltip" />              
            </g>
          </>
        ) : null}
        <text className="title" text-anchor="start" dy={-10}>Global Coronavirus Deaths Over Time By Country</text>
        <text className="axisLabel" transform={`translate(-40,${innerHeight / 2}) rotate(-90)`} text-anchor="middle">Cumulative Deaths</text>
        <text className="axisLabel" transform={`translate(${innerWidth / 2}, ${innerHeight + 40})`} alignment-baseline="hanging" text-anchor="middle">Time</text>
        <VoronoiOverlay 
          allData={allData}
          innerWidth={innerWidth}
          innerHeight={innerHeight}                  
          lineGenerator={lineGenerator}
          onHover={handleVoronoiHover} />
      </g>
    </svg>
  );  
}