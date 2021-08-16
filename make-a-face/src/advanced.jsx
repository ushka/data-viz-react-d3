import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { Face } from './components/Face.jsx';
import { range } from 'https://cdn.skypack.dev/d3';

const width = 150;
const height = 150;

// const array = [1, 2, 3, 4, 5];
const array = range(8 * 4);


const App = () => array.map(() => (
  <Face 
    width={width}
    height={height}
    centerX={width / 2}
    centerY={height / 2}
    strokeWidth={10}
    eyeOffsetX={30}
    eyeOffsetY={30}
    eyeRadius={5 + Math.random() * 10}
    mouthWidth={5 + Math.random() * 10}
    mouthRadius={5 + Math.random() * 10}
  />
));

ReactDOM.render(<App />, document.getElementById("root"));
