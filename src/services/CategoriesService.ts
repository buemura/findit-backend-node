import { getCustomRepository, Repository } from "typeorm";
import { Category } from "../models/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

export class CategoriesService {
  private categoriesRepository: Repository<Category>;

  constructor() {
    this.categoriesRepository = getCustomRepository(CategoriesRepository);
  }

  async showAllCategories() {
    return await this.categoriesRepository.find();
  }
}
