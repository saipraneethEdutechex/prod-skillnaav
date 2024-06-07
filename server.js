const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["https://prod-skillnaav-ipac.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
require("dotenv").config();

const skillnaavRoute = require("./routes/skillnaavRoute");

app.use(express.json());
mongoose.connect(
  "mongodb+srv://saipraneetht:ESL4PtlOs6Et70jA@cluster0.ceoqges.mongodb.net/mern-skillnaav2?retryWrites=true&w=majority&appName=Cluster0"
);
app.use("/api/skillnaav", skillnaavRoute);

const port = process.env.PORT || 5000;
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

const dbConfig = require("./config/dbConfig");

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
