import express,{ Router } from "express";
import morgan from "morgan";
import { restaurants } from "./restaurants.js";

export const index = Router();

//Middlewares
index.use(morgan("dev"))
index.use(express.json())

//Routes
index.use("/restaurants",restaurants) 
