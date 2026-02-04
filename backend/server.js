require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", require("./routes/task.routes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

  // ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "TaskFlow backend is running 🚀"
  });
});


// ✅ USER ROUTES
const userRoutes = require("./routes/user.routes");
app.use("/api/v1", userRoutes);
app.get("/api/v1", (req, res) => {
  res.json({
    status: "OK",
    api: "TaskFlow v1"
  });
});



app.listen(5000, () =>
  console.log("Server running on port 5000")
);
