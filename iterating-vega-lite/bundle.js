(function (vega, vegaLite, vl, vegaTooltip, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var vega__default = /*#__PURE__*/_interopDefaultLegacy(vega);
  var vegaLite__default = /*#__PURE__*/_interopDefaultLegacy(vegaLite);
  var vl__default = /*#__PURE__*/_interopDefaultLegacy(vl);

  // Appearance customization to improve readability.
  // See https://vega.github.io/vega-lite/docs/
  const dark = '#3e3c38';
  const config = {
    axis: {
      domain: false,
      tickColor: 'lightGray'
    },
    style: {
      "guide-label": {
        fontSize: 20,
        fill: dark
      },
      "guide-title": {
        fontSize: 30,
        fill: dark
      }
    }
  };

  // const csvUrl = 'https://gist.githubusercontent.com/curran/8c131a74b85d0bb0246233de2cff3f52/raw/194c2fc143790b937c42bf086a5a44cb3c55340e/auto-mpg.csv';

  // const csvUrl = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

  // const csvUrl = 'https://gist.githubusercontent.com/curran/6cd1e224d76811b68df4/raw/12c93b2e53872d088331d939bdb790019f06dc32/populationByCountry2015.csv';

  const csvUrl = 'https://gist.githubusercontent.com/curran/805413fb3b2efaada1ce/raw/f030ce7bd9a46f3d4c09b4c8db1729fab885cc33/religionByCountryTop5.csv';

  const getData = async () => {
    const data = await d3.csv(csvUrl);
    
    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

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
  const viz = vl__default['default']
    .markCircle({    
    })
    .encode(
      vl__default['default'].x().fieldN('country').sort('-y'),
      vl__default['default'].y().fieldN('religion'),
      vl__default['default'].size().fieldQ('population'),
      vl__default['default'].tooltip().fieldN('population')
    );

  vl__default['default'].register(vega__default['default'], vegaLite__default['default'], {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call); }
  });

  const run = async () => {
    const marks = viz
      .data(await getData())
      .width(window.innerWidth)
      .height(window.innerHeight)
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);
    
    document.body.appendChild(await marks.render());
  };
  run();

}(vega, vegaLite, vl, vegaTooltip, d3));
//# sourceMappingURL=bundle.js.map
