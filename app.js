const express = require("express");
const routes = require("./routes/userroutes");
const dashboard = require("./routes/dashboard")
const Auth = require("./controllers/auth")
const cors = require("cors")
require("dotenv").config();
const connect = require("./controllers/db");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const refresh = require("./controllers/refresh")
const App = express();
const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

// ---------------------middleware-----------------
const corsOptions = {
  origin: "http://localhost:8000",
  credentials: true,
};
App.use(express.json());
App.use(cookieParser())
App.use(cors(corsOptions));
// -----------------------------routes----------------------
App.use("/api/v1/kella", routes);
App.use("/api/v1/dashboard",Auth, dashboard)
// -----------------------initialize app----------------------

const start = async () => {
  try {
    await mongoose.connect(uri, {}).then((res) => {
      console.log("database connected...");
      App.listen(port, () => {
        console.log(`server is listening on port ${port}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();

