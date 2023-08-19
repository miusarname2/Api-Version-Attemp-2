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

export async function getRestaurantById(req, res) {
  try {
    const db = await con();
    const restaurantCollection = db.collection("restaurants");

    const result = await restaurantCollection
      .aggregate([
        {
          $match: { _id: ObjectId(req.params.id) },
        },
        {
          $project: {
            _id: 0,
            menuItems: {
              $filter: {
                input: "$menuItems",
                as: "item",
                cond: { $gte: ["$$item.price", 10] }, // Por ejemplo, obtener los elementos con precio mayor o igual a 10
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
    res.send(":(");
  }
}

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

export async function getRestaurantWithMenu(req, res) {
  try {
    const db = await con();
    const restaurantCollection = db.collection("restaurants");

    const result = await restaurantCollection
      .aggregate([
        {
          $match: { _id: ObjectId(req.params.id) },
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
    res.send(":(");
  }
}

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
