import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { csv, csvFormat } from 'https://cdn.skypack.dev/d3';

const width = 960;
const height = 500;
const csvUrl = "https://gist.githubusercontent.com/ushka/e4d6364c7826e702fc8cc6d65b824d17/raw/cssNamedColors.csv";

const message = data => {
  let message = '';
  message = message + Math.round(csvFormat(data).length / 1024) + ' KB\n';  
  message = message + data.length + ' rows\n'; 
  message = message + data.columns.length + ' columns';
  return message;     
};

const App = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(data => {
      console.log('fetching data');
      setData(data);    
    });
  }, [])

  return <div>{data ? message(data) : 'Loading...'}</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
