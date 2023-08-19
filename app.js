import express from "express";
import { index } from "./Middleware/index.js";
import dotenv from "dotenv";

//Enviroment variables
dotenv.config();

//initilize server
const app = express();

//setting
app.set("port", process.env.PORT || 3000);

//Main Router
app.use('/',index)

//Server
app.listen(app.get("port"), () => {
  console.log("server on port " + app.get("port"));
});
