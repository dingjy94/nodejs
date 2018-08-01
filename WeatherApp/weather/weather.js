const request = require('request');

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/bc454eeb602be4856f6e757c9dff3b0b/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('cannot connect to forcast');
    } else if (response.statusCode === 403) {
      callback('wrong key');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        apparentTemp: body.currently.apparentTemperature,
        temp: body.currently.temperature
      });
    }
  });
};

module.exports = {
  getWeather
};