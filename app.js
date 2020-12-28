const express = require("express");
const app = express();

// setup
require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const router = require("./routes/index");
app.use("/", router);

app.listen(9000, () => console.log("App listening on port 9000."));
