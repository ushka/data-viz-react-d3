import vl from 'vega-lite-api';

// Cars dataset
// export const viz = vl
//   .markCircle({    
//     size: 500,    
//   })
//   .encode(
//     vl.x().fieldQ('mpg').scale({ zero: false }),
//     vl.y().fieldQ('horsepower').scale({ zero: false }),
//     vl.color().fieldN('origin'),
//     vl.size().fieldQ('horsepower'),
//     vl.tooltip().fieldN('name')
//   );


// Temperature dataset
// export const viz = vl
//   .markLine({    
//   })
//   .encode(
//     vl.x().fieldT('timestamp').scale({ zero: false }),
//     vl.y().fieldQ('temperature').scale({ zero: false }),
//     vl.tooltip().fieldN('temperature')
//   );

// Countries dataset
// export const viz = vl
//   .markBar({    
//   })
//   .encode(
//     vl.x().fieldN('country').sort('-y'),
//     vl.y().fieldQ('population'),
//     vl.tooltip().fieldN('population')
//   );  

// Religion dataset - stacked bar chart
// export const viz = vl
//   .markBar({    
//   })
//   .encode(
//     vl.x().fieldN('country').sort('-y'),
//     vl.y().fieldQ('population'),
//     vl.color().fieldN('religion'),
//     vl.tooltip().fieldN('population')
//   );  

// Religion dataset - bubble chart
export const viz = vl
  .markCircle({    
  })
  .encode(
    vl.x().fieldN('country').sort('-y'),
    vl.y().fieldN('religion'),
    vl.size().fieldQ('population'),
    vl.tooltip().fieldN('population')
  );  