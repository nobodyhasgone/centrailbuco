const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");

app.use(express.static("public"));

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
