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


module.exports = fetchMyIP;
