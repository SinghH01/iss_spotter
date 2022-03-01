//Import request
const request = require("request");

// Object to save received data
let data = {};

// Function to fetch user's IP address
const fetchMyIP = function(callback) {
  
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error);
      process.exit();

    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      process.exit();

    } else {
      
      data = JSON.parse(body); // Convert string to JSON Object

      callback(null, data.ip);
      process.exit();
    }
  });
};
 


//Function to fetch coordinates using ip address
const fetchCoordsByIP = function(ip, callback) {

  request(`https://api.freegeoip.app/json/75.155.85.228?apikey=c6ad75c0-9950-11ec-980d-6357375b7b64`, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;

    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else {
      let jsonObject = JSON.parse(body);

      // Save just the longitude and latutude from jsonObject in a new object
      let latLong = {latitude: jsonObject.latitude, longitude: jsonObject.longitude};
    
      callback(null, latLong);
      return;
    }
  });
};


module.exports = {fetchMyIP, fetchCoordsByIP};

