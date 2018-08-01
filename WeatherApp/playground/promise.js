const request = require('request');

const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const addressEncode = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncode}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect Google server');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Wrong address');
      } else if (body.status !== 'OK') {
        reject('something wrong happened')
      } else {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          lngtitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('000')
.then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}).catch((errorMessage) => {
  console.log(errorMessage);
});