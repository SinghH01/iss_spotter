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
      
    }
  });
};
 


//Function to fetch coordinates using ip address
const fetchCoordsByIP = function(ip, callback) {

  request(`https://api.freegeoip.app/json/${ip}?apikey=c6ad75c0-9950-11ec-980d-6357375b7b64`, (error, response, body) => {
    
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
      
    }
  });
};


// Fetch ISS Fly Over Times
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;

    } else if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching ISS Fly Over Times. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else {
      callback(null, JSON.parse(body).response);
      
    }
  });
};

// Function to chain all three API's requests and fetch ISS flyovers for a user's location
const nextISSTimesForMyLocation = function(callback) {
  //console.log("-----> 1");

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    } else {

      fetchCoordsByIP(`${ip}`,(error, data) => {
        //console.log("----> 2");
        if (error) {
          console.log(error);
          return callback(error, null);

        } else {

          fetchISSFlyOverTimes(data,(error, passTimes) => {
            //console.log("----> 3");

            if (error) {
              return callback(error, null);
            } else {
              callback(null, passTimes);
            }
          });
        }
      });
    }
  });
};


module.exports = {nextISSTimesForMyLocation};

