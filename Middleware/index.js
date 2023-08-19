import { Router } from "express";
import morgan from "morgan";

const index = Router();

//Middlewares
index.use(morgan("dev"));
index.use(express.json());

//Routes
index.get("/", (req, res) => {
  res.send("hgol");
});
