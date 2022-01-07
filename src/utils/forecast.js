const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a08de151baac8f16ff03ea6b5b0f8137&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const { temperature } = body.current;
      const { feelslike } = body.current;
      const weather_descriptions = body.current.weather_descriptions[0];
      callback(
        undefined,
        weather_descriptions +
          ". It is currently " +
          temperature +
          " degrees out. It feels like " +
          feelslike +
          " degrees out."
      );
    }
  });
};
module.exports = forecast;
