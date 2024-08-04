const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherbit.io/v2.0/current?key=3133644586694a9c9643c9eefe29791c&&lat=${lat}&lon=${long}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Error fetching data: " + error, null);
    } else if (response.body.error) {
      callback("API Error: " + response.body.error, null);
    } else if (response.body.data && response.body.data.length > 0) {
      const temp = response.body.data[0].app_temp;
      callback(null, "Temp: " + temp);
    } else {
      callback("Unexpected API response structure", null);
    }
  });
};

module.exports = forecast;
