// Importa las dependencias y funciones necesarias
import { con } from "../Config/Atlas.js";
import { ObjectId } from "mongodb";

// Función para obtener todos los socios repartidores sin ciertos campos
export async function getDeliverypartners(req, res) {
  try {
    const db = await con();
    const deliveryPartnerCollection = db.collection("deliveryPartners");
    const result = await deliveryPartnerCollection
      .find()
      .project({ availability: 0, completedOrders: 0 })
      .toArray();
    res.send(result);
  } catch (error) {
    res.send(":(");
  }
}

// Función para obtener detalles de un restaurante por su ID (versión 2)
export async function getRestaurantById(req, res, next) {
  try {
    const db = await con();
    const restaurantCollection = db.collection("restaurants");

    const result = await restaurantCollection
      .aggregate([
        {
          $match: { _id: req.params.id },
        },
        {
          $project: {
            _id: 0,
            menuItems: {
              $filter: {
                input: "$menuItems",
                as: "item",
                cond: { $gte: ["$$item.price", 10] },
              },
            },
          },
        },
      ])
      .toArray();

    if (result.length === 0) {
      return res.json({ msg: "No se encontró el restaurante" });
    }

    return res.json(result);
  } catch (error) {
    res.send(error + 'a');
  }
}

// Función para obtener detalles de un socio repartidor por su número de teléfono
export async function getDeliveryPartnerByPhone(req, res) {
  try {
    const db = await con();
    const deliveryPartnerCollection = db.collection("deliveryPartners");
    const result = await deliveryPartnerCollection.findOne({
      phoneNumber: req.params.phone,
    });
    res.send(result);
  } catch (error) {
    res.send(":(");
  }
}

// Función para obtener todos los restaurantes con al menos un elemento en su menú de un cierto precio
export async function getRestaurantsWithItemsAbovePrice(req, res) {
  try {
    const db = await con();
    const restaurantCollection = db.collection("restaurants");
    const result = await restaurantCollection
      .find({
        "menuItems.price": { $gte: parseFloat(req.params.price) },
      })
      .toArray();
    res.send(result);
  } catch (error) {
    res.send(":(");
  }
}

// Función para obtener detalles de un restaurante y sus elementos de menú por su ID (versión 3)
export async function getRestaurantWithMenu(req, res, next) {
  try {
    const db = await con();
    console.log(db)
    const restaurantCollection = db.collection("restaurants");

    const result = await restaurantCollection
      .aggregate([
        {
          $match: { _id: new ObjectId(req.params.id) },
        },
        {
          $lookup: {
            from: "menuItems",
            localField: "menuItems",
            foreignField: "_id",
            as: "menuItemsDetails",
          },
        },
      ])
      .toArray();

    if (result.length === 0) {
      return res.json({ msg: "No se encontró el restaurante" });
    }

    return res.json(result);
  } catch (error) {
    res.status(500).send(error + '12');
  }
}

// Función para obtener todos los socios repartidores con un número específico de entregas completadas
export async function getDeliveryPartnersByCompletedOrders(req, res) {
  try {
    const db = await con();
    const deliveryPartnerCollection = db.collection("deliveryPartners");
    const result = await deliveryPartnerCollection
      .find({ completedOrders: parseInt(req.params.orders) })
      .toArray();
    res.send(result);
  } catch (error) {
    res.send(":(");
  }
}
