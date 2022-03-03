// Require promise
const request = require('request-promise-native');

// Returns user's IP address as a string
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

// Returns user's location information based on IP address as a string
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;

  return request(`https://api.freegeoip.app/json/${ip}?apikey=c6ad75c0-9950-11ec-980d-6357375b7b64`);
};

// Returns data regarding ISS fly over times as a string
const fetchISSFlyOverTimes = function(body) {
  const lat = JSON.parse(body).latitude;
  const long = JSON.parse(body).longitude;
  
  return request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`);
};

// Chain all three API's requests and return ISS flyovers for a user's location
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {nextISSTimesForMyLocation};