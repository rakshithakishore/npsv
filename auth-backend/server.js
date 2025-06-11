require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes"); // ✅ just import here

const app = express(); // ✅ NOW app is declared

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes); // ✅ use after app is defined

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ Mongo Error:", err));
