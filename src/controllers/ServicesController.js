const ServicesService = require("../services/ServicesService");
const { StatusCodes } = require("http-status-codes");

class ServicesController {
  static async showAllServices(req, res) {
    const servicesService = new ServicesService();
    const { category, location } = req.query;
    const where = {};

    if (category) {
      where.category = category;
    }
    if (location) {
      where.location = location;
    }

    try {
      const services = await servicesService.showAllServices(where);
      return res.json(services);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showOneService(req, res) {
    const { id } = req.params;
    const servicesService = new ServicesService();

    try {
      const services = await servicesService.showOneService(id);
      return res.json(services);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showServicesQuantity(req, res) {
    const servicesService = new ServicesService();
    try {
      const servicesQuantity = await servicesService.showServicesQuantity();
      return res.json(servicesQuantity);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async createService(request, response) {
    const { user_id, title, category, description, price, location } =
      request.body;
    const servicesService = new ServicesService();

    try {
      const services = await servicesService.createService({
        user_id,
        title,
        category,
        description,
        price,
        location,
      });
      return response.json(services);
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async updateService(req, res) {
    const { id } = req.params;
    const { user_id, title, category, description, price, location } = req.body;
    const servicesService = new ServicesService();

    try {
      const service = await servicesService.updateService(id, {
        user_id,
        title,
        category,
        description,
        price,
        location,
      });
      return res.json(service);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async deleteService(req, res) {
    const { id } = req.params;
    const servicesService = new ServicesService();

    try {
      const service = await servicesService.deleteService(id);
      return res.json(service);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showServicesFromUser(req, res) {
    const { user_id } = req.params;
    const servicesService = new ServicesService();

    try {
      const userAllServices = await servicesService.showServicesFromUser(
        user_id
      );
      return res.json(userAllServices);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

module.exports = ServicesController;
