const express = require("express");
const app = new express();
require("dotenv").config();
const port = process.env.PORT || 3002;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DBconnection = require("./config/DBconnect");
const router = require("./routes");



app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

DBconnection();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", router);


app.listen(port, () => {
  console.log("Server is running on port", port);
});
