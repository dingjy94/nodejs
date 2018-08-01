const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Target address',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const addressEncode = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncode}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('wrong address');
  }

  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;
  const weatherUrl = `https://api.darksky.net/forecast/bc454eeb602be4856f6e757c9dff3b0b/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);

  return axios.get(weatherUrl);
}).then((response) => {
  const apparentTemp = response.data.currently.apparentTemperature;
  const temperature = response.data.currently.temperature;
  console.log(`It's currently ${temperature}, but feels like ${apparentTemp}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API server');
  } else {
    console.log(e.message);
  }
});


  //bc454eeb602be4856f6e757c9dff3b0b
  //https://api.darksky.net/forecast


