import { Request, Response } from "express";
import { CategoriesService } from "../services/CategoriesService";
import { StatusCodes } from "http-status-codes";

class CategoriesController {
  static async showAllCategories(_: Request, res: Response) {
    const categoriesService = new CategoriesService();

    try {
      const categories = await categoriesService.showAllCategories();
      return res.json(categories);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

export { CategoriesController };
