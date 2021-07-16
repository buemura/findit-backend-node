const jwt = require("jsonwebtoken");
const database = require("../database/models");
const NotFound = require("../errors/NotFound");
require("dotenv").config();

class ChatService {
  async showAllChatRooms() {
    return await database.Chats.findAll();
  }

  async showAllMessages(id) {
    return await database.Messages.findAll({ where: { chat_id: id } });
  }

  async createChat(receiver_id, id) {
    const userExists = await database.Users.findOne({ where: { id } });

    if (!userExists) {
      throw new NotFound("Service associated");
    }

    await database.Chats.create({ sender_id: id, receiver_id });
    return { message: `Chat Room created successfully!` };
  }

  async sendMessage({ sender_id, content }, id) {
    const chatExists = await database.Chats.findOne({ where: { id } });

    if (!chatExists) {
      throw new NotFound("Chat associated");
    }

    await database.Messages.create({ chat_id: id, sender_id, content });
    return { message: `Message sent successfully!` };
  }
}

module.exports = ChatService;
