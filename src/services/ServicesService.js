const database = require("../models");

class ServicesService {
  async createService({
    user_id,
    title,
    category,
    description,
    price,
    location,
  }) {
    const services = await database.Services.create({
      user_id,
      title,
      category,
      description,
      price,
      location,
    });

    return services;
  }

  async showAllServices(where) {
    return await database.Services.findAll({
      where: { ...where },
      relations: ["user"],
    });
  }

  async showOneService(id) {
    return await database.Services.findOne(
      { where: { id } },
      { relations: ["user"] }
    );
  }

  async showServicesQuantity() {
    const { count } = await database.Services.findAndCountAll();
    return count;
  }

  async updateService(id, { title, category, description, price, location }) {
    const serviceExists = await database.Services.findOne({ where: { id } });

    if (!serviceExists) {
      throw new Error("Service does not exist!");
    }

    await database.Services.update(id, {
      title,
      category,
      description,
      price,
      location,
    });

    return { message: `UPDATED service id ${id}` };
  }

  async deleteService(id) {
    await database.Services.destroy(id);
    return { message: `DELETED service id ${id}` };
  }

  async showServicesFromUser(user_id) {
    return await database.Services.findAll({
      where: { user_id },
      relations: ["user"],
    });
  }
}

module.exports = ServicesService;
