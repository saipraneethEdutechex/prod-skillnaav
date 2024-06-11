const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { DiscoverImage } = require("./models/skillnaavModel");
require("dotenv").config();

const skillnaavRoute = require("./routes/skillnaavRoute");

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.mongo_url);
app.use("/api/skillnaav", skillnaavRoute);

const port = process.env.PORT || 5000;

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

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), (req, res) => {
  DiscoverImage.create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

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
