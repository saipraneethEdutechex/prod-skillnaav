const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const { SkillNaavLogo } = require("./models/skillnaavModel");

const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();

const skillnaavRoute = require("./routes/skillnaavRoute");

app.use(express.json());
app.use("/api/skillnaav", skillnaavRoute);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

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

app.get("/api/getImage", (req, res) => {
  SkillNaavLogo.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
