const request = require("request");

const forecast = function (latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=b970dc52a714ba067cd91ac2e6ff2c4a&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("respone.body.error", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        `${data.weather_descriptions[0]} It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
