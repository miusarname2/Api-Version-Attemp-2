//Función para agregar una nueva cita a un socio repartidor

export async function addDeliveryPartnerAppointment(req, res) {
  try {
    const db = await con();
    const deliveryPartnerCollection = db.collection("deliveryPartners");
    const appointment = req.body; // Asegúrate de enviar los datos en el cuerpo de la solicitud
    const deliveryPartnerId = req.params.id; // Obtén el ID del socio repartidor desde los parámetros de la ruta

    const result = await deliveryPartnerCollection.updateOne(
      { _id: ObjectId(deliveryPartnerId) },
      { $push: { appointments: appointment } }
    );

    if (result.matchedCount === 0) {
      return res.json({ msg: "No se encontró el socio repartidor" });
    }

    res.json({ msg: "Cita agregada exitosamente al socio repartidor" });
  } catch (error) {
    res.send(":(");
  }
}

//Función para crear un nuevo elemento en el menú de un restaurante
export async function addMenuItemToRestaurant(req, res) {
  try {
    const db = await con();
    const restaurantCollection = db.collection("restaurants");
    const menuItem = req.body; // Asegúrate de enviar los datos en el cuerpo de la solicitud
    const restaurantId = req.params.id; // Obtén el ID del restaurante desde los parámetros de la ruta

    const result = await restaurantCollection.updateOne(
      { _id: ObjectId(restaurantId) },
      { $push: { menuItems: menuItem } }
    );

    if (result.matchedCount === 0) {
      return res.json({ msg: "No se encontró el restaurante" });
    }

    res.json({ msg: "Elemento de menú agregado exitosamente" });
  } catch (error) {
    res.send(":(");
  }
}

//Función para agregar una nueva orden a un restaurante
export async function addOrderToRestaurant(req, res) {
  try {
    const db = await con();
    const restaurantCollection = db.collection("restaurants");
    const order = req.body; // Asegúrate de enviar los datos en el cuerpo de la solicitud
    const restaurantId = req.params.id; // Obtén el ID del restaurante desde los parámetros de la ruta

    const result = await restaurantCollection.updateOne(
      { _id: ObjectId(restaurantId) },
      { $push: { orders: order } }
    );

    if (result.matchedCount === 0) {
      return res.json({ msg: "No se encontró el restaurante" });
    }

    res.json({ msg: "Orden agregada exitosamente al restaurante" });
  } catch (error) {
    res.send(":(");
  }
}

//Función para agregar un nuevo elemento al menú de un restaurante existente
export async function addMenuItemToRestaurant(req, res) {
  try {
    const db = await con();
    const restaurantCollection = db.collection("restaurants");
    const menuItem = req.body; // Asegúrate de enviar los datos en el cuerpo de la solicitud
    const restaurantId = req.params.id; // Obtén el ID del restaurante desde los parámetros de la ruta

    const result = await restaurantCollection.updateOne(
      { _id: ObjectId(restaurantId) },
      { $push: { menuItems: menuItem } }
    );

    if (result.matchedCount === 0) {
      return res.json({ msg: "No se encontró el restaurante" });
    }

    res.json({ msg: "Elemento de menú agregado exitosamente" });
  } catch (error) {
    res.send(":(");
  }
}

//Función para crear un nuevo restaurante
export async function createRestaurant(req, res) {
  try {
    const db = await con();
    const restaurantCollection = db.collection("restaurants");
    const newRestaurant = req.body; // Asegúrate de enviar los datos en el cuerpo de la solicitud

    const result = await restaurantCollection.insertOne(newRestaurant);
    res.json(result.ops[0]); // Devuelve el documento creado
  } catch (error) {
    res.send(":(");
  }
}

//Función para crear un nuevo socio repartidor
export async function createDeliveryPartner(req, res) {
    try {
      const db = await con();
      const deliveryPartnerCollection = db.collection("deliveryPartners");
      const newDeliveryPartner = req.body; // Asegúrate de enviar los datos en el cuerpo de la solicitud
  
      const result = await deliveryPartnerCollection.insertOne(newDeliveryPartner);
      res.json(result.ops[0]); // Devuelve el documento creado
    } catch (error) {
      res.send(":(");
    }
  }
  