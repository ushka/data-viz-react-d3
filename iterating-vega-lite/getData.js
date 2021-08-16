import { csv } from 'd3';

// const csvUrl = 'https://gist.githubusercontent.com/curran/8c131a74b85d0bb0246233de2cff3f52/raw/194c2fc143790b937c42bf086a5a44cb3c55340e/auto-mpg.csv';

// const csvUrl = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

// const csvUrl = 'https://gist.githubusercontent.com/curran/6cd1e224d76811b68df4/raw/12c93b2e53872d088331d939bdb790019f06dc32/populationByCountry2015.csv';

const csvUrl = 'https://gist.githubusercontent.com/curran/805413fb3b2efaada1ce/raw/f030ce7bd9a46f3d4c09b4c8db1729fab885cc33/religionByCountryTop5.csv';

export const getData = async () => {
  const data = await csv(csvUrl);
  
  // Have a look at the attributes available in the console!
  console.log(data[0]);

  return data;
};