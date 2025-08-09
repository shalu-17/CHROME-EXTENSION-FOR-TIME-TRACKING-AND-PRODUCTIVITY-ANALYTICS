// Import mongoose library to interact with MongoDB
const mongoose = require("mongoose"); 

// Async function to connect to MongoDB
async function connectDB() {
  // Establish a connection to the MongoDB database named "time-tracker"
  await mongoose.connect("mongodb://localhost:27017/time-tracker", {
    useNewUrlParser: true, // Use new MongoDB URL parser (avoids deprecation warning)
    useUnifiedTopology: true // Use new Server Discover and Monitoring engine (avoids deprecation warning)
  });
  
  // Log a success message once the connection is established
  console.log("MongoDB Connected");
}

// Export the connectDB function so it can be used in other files
module.exports = connectDB; 
