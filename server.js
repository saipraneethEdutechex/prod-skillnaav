const express = require("express");

const app = express();

app.use(
  cors({
    origin: [
      "https://vercel.com/praneeths-projects-c8a17623/prod-skillnaav/H7v7S1jJWDp6pouL6R6aqa1m3quL",
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

require("dotenv").config();

const skillnaavRoute = require("./routes/skillnaavRoute");

app.use(express.json());
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
