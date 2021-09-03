import { EntityRepository, Repository } from "typeorm";
import { Service } from "../models/Service";

@EntityRepository(Service)
class ServicesRepository extends Repository<Service> {}

export { ServicesRepository };
