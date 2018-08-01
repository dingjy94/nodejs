const request = require('request');

const geocodeAddress = (address, callback) => {
  const addressEncode = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncode}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect Google server');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Wrong address');
    } else if (body.status !== 'OK') {
      callback('something wrong happened')
    } else {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        lngtitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};