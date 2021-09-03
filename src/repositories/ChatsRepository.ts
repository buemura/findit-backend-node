import { EntityRepository, Repository } from "typeorm";
import { Chat } from "../models/Chat";

@EntityRepository(Chat)
class ChatsRepository extends Repository<Chat> {}

export { ChatsRepository };
