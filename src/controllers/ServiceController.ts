import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database/db";

class ServiceController {
  async getServices(req: Request, res: Response) {
    const response = await db.query("SELECT * FROM services");
    res.status(StatusCodes.OK).json(response.rows);
  }

  async getServiceById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await db.query("SELECT * FROM services WHERE id = $1", [
      id,
    ]);
    res.status(StatusCodes.OK).json(response.rows);
  }

  async createService(req: Request, res: Response) {
    const { title, category, description, price, postal_code } = req.body;
    await db.query(
      "INSERT INTO services (title, category, description, price, postal_code) VALUES ($1, $2, $3, $4, $5)",
      [title, category, description, price, postal_code]
    );
    res.status(StatusCodes.CREATED).json({
      message: "Service created succesfully",
      body: {
        service: { title, category, description, price, postal_code },
      },
    });
  }

  async updateService(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const response = await db.query(
      "UPDATE services SET title = $1, description = $2, category = $3 WHERE id = $4",
      [title, description, category, id]
    );
    res.status(StatusCodes.CREATED).json("Service updated successfully");
  }

  async deleteService(req: Request, res: Response) {
    const { id } = req.params;
    const response = await db.query("DELETE FROM services WHERE id = $1", [id]);
    res.status(StatusCodes.CREATED).json(`Service ${id} deleted successfully`);
  }
}

export default ServiceController;
