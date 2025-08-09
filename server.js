const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserData = require("./models/UserData");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/time-tracker")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("✅ Time Tracker API is running. Use /analytics or /weekly-report");
});

app.get("/analytics", async (req, res) => {
  try {
    const data = await UserData.aggregate([
      {
        $group: {
          _id: { site: "$site", category: "$category" },
          totalTime: { $sum: "$timeSpent" }
        }
      },
      {
        $project: {
          _id: 0,
          site: "$_id.site",
          category: "$_id.category",
          timeSpent: "$totalTime"
        }
      }
    ]);
    res.json(data);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/weekly-report", async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyData = await UserData.aggregate([
      { $match: { timestamp: { $gte: oneWeekAgo } } },
      {
        $group: {
          _id: "$category",
          totalTime: { $sum: "$timeSpent" },
        }
      }
    ]);

    res.json(weeklyData);
  } catch (err) {
    console.error("Error fetching weekly report:", err);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
