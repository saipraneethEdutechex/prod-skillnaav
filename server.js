const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const { NavbarLogo } = require("./models/skillnaavModel");

const skillnaavRoute = require("./routes/skillnaavRoute");
app.use("/api/skillnaav", skillnaavRoute);

const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ImageFolder/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post(
  "https://mern-skillnaav-12f3c3d9b0f2.herokuapp.com/upload",
  upload.single("file"),
  (req, res) => {
    NavbarLogo.create({ skillnaavlogo: req.file.filename })
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
