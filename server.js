const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { DiscoverImage } = require("./models/skillnaavModel");
require("dotenv").config();

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const skillnaavRoute = require("./routes/skillnaavRoute");
app.use("/api/skillnaav", skillnaavRoute);

// Multer Storage
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

// Upload Image
app.post("/upload", upload.single("file"), (req, res) => {
  DiscoverImage.create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});

// Get Images
app.get("/get-image", async (req, res) => {
  try {
    const images = await DiscoverImage.find({});
    res.json({ status: "ok", data: images });
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
