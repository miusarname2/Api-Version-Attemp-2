// Importa el módulo Express
import express from "express";

// Importa las funciones desde el archivo "../Versions/gets.js"
import {
  getRestaurantsWithItemsAbovePrice,
  getRestaurantWithMenu,
  getRestaurantById
} from "../Versions/gets.js";

// Crea un enrutador utilizando Express
export const restaurants = express.Router();

// Ruta para obtener restaurantes con elementos de menú por encima de un precio específico (versión 1)
restaurants.get("/v1", getRestaurantsWithItemsAbovePrice);

// Ruta para obtener detalles de un restaurante por su ID (versión 2)
restaurants.get("/:id", (req, res, next) => {
  const apiVersion = req.headers["x-api"];

  // Verifica si la versión en los encabezados es "3.0"
  if (apiVersion === "3.0") {
    getRestaurantById(req, res, next); // Llama la función y pasa los parámetros
  } else {
    next(); // Pasa al siguiente controlador si no se cumple la condición
  }
});

// Ruta para obtener detalles de un restaurante y su menú por versión en el query (versión 3)
restaurants.get("/", (req, res, next) => {
  const version = req.query.version;

  // Verifica si la versión en el query es "2.0"
  if (version === "2.0") {
    getRestaurantWithMenu(req, res, next); // Llama la función y pasa los parámetros
  } else {
    next(); // Pasa al siguiente controlador si no se cumple la condición
  }
});
