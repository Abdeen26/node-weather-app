const request = require("postman-request");

const geocode = (address, callback) => {
  const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=d0592e3d79024a54b400700102d26ead`;

  request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
      callback("Error fetching data:" + error, null);
    } else if (response.body.status && response.body.status.message !== "OK") {
      callback("API Error:" + response.body.status.message, null);
    } else if (response.body.results && response.body.results.length > 0) {
      callback(null, {
        latitude: response.body.results[0].geometry.lat,
        longitude: response.body.results[0].geometry.lng,
        location: response.body.results[0].formatted,
      });
    } else {
      callback("No results found or unexpected API response structure", null);
    }
  });
};

module.exports = geocode;
