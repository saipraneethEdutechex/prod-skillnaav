const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();

const skillnaavRoute = require("./routes/skillnaavRoute");

// Middleware
app.use(express.json());

// Routes
app.use("/api/skillnaav", skillnaavRoute);
app.use("/api/contact", require("./routes/skillnaavRoute")); // Add this line for contact route

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
