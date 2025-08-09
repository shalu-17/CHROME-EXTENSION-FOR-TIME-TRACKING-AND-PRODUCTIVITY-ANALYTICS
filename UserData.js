// Import mongoose to define schema and interact with MongoDB
const mongoose = require("mongoose");

// Define schema (structure) for storing user data in MongoDB
const UserDataSchema = new mongoose.Schema({
  site: String,        // Website name or domain visited
  timeSpent: Number,   // Time spent on the site (in seconds or minutes)
  timestamp: Date,     // Date and time when data was recorded
  category: String     // Category of site (e.g., Productive, Non-Productive)
});

// Export the model so it can be used in other files to perform CRUD operations
module.exports = mongoose.model("UserData", UserDataSchema);
