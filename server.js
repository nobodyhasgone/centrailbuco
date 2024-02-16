const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");

app.use(express.static("public"));

https
  .createServer(
    {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
    app
  )
  .listen(3000, () => {
    console.log("Listening on https://localhost:3000");
  });
