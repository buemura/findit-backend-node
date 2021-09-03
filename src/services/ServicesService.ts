import { getCustomRepository, Repository } from "typeorm";
import { Service } from "../models/Service";
import { User } from "../models/User";
import { ServicesRepository } from "../repositories/ServicesRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { NotFound } from "../errors/NotFound";

interface IServicesCreate {
  user_id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  city: string;
  state: string;
  country: string;
}

export class ServicesService {
  private servicesRepository: Repository<Service>;
  private usersRepository: Repository<User>;

  constructor() {
    this.servicesRepository = getCustomRepository(ServicesRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async checkServiceExists(id: string) {
    const serviceExists = await this.servicesRepository.findOne({
      where: { id },
    });

    if (!serviceExists) {
      throw new NotFound("Service");
    }

    return serviceExists;
  }

  async createService(serviceInfo: IServicesCreate) {
    const services = this.servicesRepository.create(serviceInfo);
    await this.servicesRepository.save(services);
    return services;
  }

  async showAllServices(where: any) {
    return await this.servicesRepository.find({
      where: { ...where },
      relations: ["user"],
    });
  }

  async showOneService(id: string) {
    return await this.servicesRepository.findOne(id, { relations: ["user"] });
  }

  async showServicesQuantity() {
    const [list, count] = await this.servicesRepository.findAndCount();
    return count;
  }

  async updateService(id: string, serviceInfo: IServicesCreate) {
    // const serviceExists = await this.servicesRepository.findOne(id);

    // if (!serviceExists) {
    //   throw new NotFound("Service");
    // }

    await this.checkServiceExists(id);

    await this.servicesRepository.update(id, serviceInfo);

    return { message: `UPDATED service id ${id}` };
  }

  async deleteService(id: string) {
    await this.servicesRepository.delete(id);
    return { message: `DELETED service id ${id}` };
  }

  async showServicesFromUser(id: string) {
    const userExists = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userExists) {
      throw new NotFound("User associated");
    }

    return await this.servicesRepository.find({
      where: { user_id: id },
      relations: ["user"],
    });
  }
}
