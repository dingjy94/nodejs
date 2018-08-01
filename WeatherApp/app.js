const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

  geocode.geocodeAddress(argv.address, (errorMsg, results) => {
    if (errorMsg) {
      console.log(errorMsg);
    } else {
      console.log(results.address);
      weather.getWeather(results.latitude, results.lngtitude, (errorMsg, weatherResult) => {
        if (errorMsg) {
          console.log(errorMsg);
        } else {
          console.log(`Temprature is ${weatherResult.temp}, but fells like ${weatherResult.apparentTemp}`);
        }
      });
    }
  });

  //bc454eeb602be4856f6e757c9dff3b0b
  //https://api.darksky.net/forecast


