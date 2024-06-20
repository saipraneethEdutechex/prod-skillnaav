const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
dotenv.config();

const skillnaavRoute = require("./routes/skillnaavRoute");

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "./client/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware
app.use(express.json());

// Routes
app.use("/api/skillnaav", skillnaavRoute);
app.use("/api/contact", skillnaavRoute);

// Serve static assets if in production
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.use(
    "./client/uploads",
    express.static(path.join(__dirname, "client/uploads"))
  );

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

const dbConfig = require("./config/dbConfig");

// File upload route
// File upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    filePath: `/uploads/${req.file.filename}`, // Ensure the leading slash here
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
