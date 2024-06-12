const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const { SkillNaavLogo } = require("./models/skillnaavModel");

const app = express();
app.use(cors());
app.use(express.json());

const skillnaavRoute = require("./routes/skillnaavRoute");
app.use("/api/skillnaav", skillnaavRoute);

const port = process.env.PORT || 5000;

// MongoDB connection
const dbConfig = require("./config/dbConfig");

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

app.post("/api/upload", upload.single("file"), (req, res) => {
  SkillNaavLogo.create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get("/api/getImage", async (req, res) => {
  try {
    SkillNaavLogo.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (err) {
    res.json({ status: "error" });
  }
});

// Serve the static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // Catch-all route to serve the React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
