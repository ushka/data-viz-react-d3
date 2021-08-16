import React, { useState, useCallback } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
// import { arc } from 'https://cdn.skypack.dev/d3';

const width = 960;
const height = 500;
const circleRadius = 30;
const initialMousePosition = { x: width / 2, y: height / 2 }


const App = () => {

  const [mousePosition, setMousePosition] = useState(initialMousePosition);

  const handleMouseMove = useCallback(event => {
    const { clientX, clientY } = event;
    setMousePosition({x: clientX, y: clientY});
    // console.log({clientX, clientY});
  }, [setMousePosition]);

  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle
        cx={mousePosition.x}
        cy={mousePosition.y}
        r={circleRadius}
      />      
    </svg>
  )
};

ReactDOM.render(<App />, document.getElementById("root"));
