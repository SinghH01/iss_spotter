// Require functions from iss.js
const {nextISSTimesForMyLocation}  = require('./iss');

// Function call to fetch ISS flyovers for a user's location
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  } else {
    printOutput(passTimes);
  }
});

//Function to format console.log statements
const printOutput = function(time) {
  for (const item of time) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(item.risetime);
    console.log(`Next pass at ${datetime}} for ${item.duration} seconds!`);
  }
};