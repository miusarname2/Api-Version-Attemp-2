import express from "express";
import dotenv from "dotenv";

//Enviroment variables
dotenv.config();

//initilize server
const app = express();

//setting
app.set("port", process.env.PORT || 3000);

//Server
app.listen(app.get("port"), () => {
  console.log("server on port " + app.get("port"));
});
