// Import nextISSTimesForMyLocation function
const nextISSTimesForMyLocation = require('./iss_promised').nextISSTimesForMyLocation;


// Function call to fetch ISS flyovers for a user's location
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printOutput(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


//Function to format console.log statements
const printOutput = function(time) {
  for (const item of time) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(item.risetime);
    console.log(`Next pass at ${datetime}} for ${item.duration} seconds!`);
  }
};




