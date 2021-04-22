import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database/db";

class UserController {
  async getUsers(req: Request, res: Response) {
    const response = await db.query("SELECT * FROM users");
    res.status(StatusCodes.OK).json(response.rows);
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(StatusCodes.OK).json(response.rows);
  }

  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    await db.query("INSERT INTO users (name, email) VALUES ($1, $2)", [
      name,
      email,
    ]);
    res.status(StatusCodes.CREATED).json({
      message: "User created succesfully",
      body: {
        user: { name, email },
      },
    });
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    await db.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [
      name,
      email,
      id,
    ]);
    res.status(StatusCodes.CREATED).json("User updated successfully");
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(StatusCodes.CREATED).json(`User ${id} deleted successfully`);
  }
}

export default UserController;
