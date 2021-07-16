const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const database = require("../database/models");
const AlreadyExists = require("../errors/AlreadyExists");
const NotFound = require("../errors/NotFound");
require("dotenv").config();

class ChatService {
  async showAllChatRooms() {
    return await database.Chats.findAll();
  }

  async showAllMessages(id) {
    return await database.Messages.findAll({ where: { chat_id: id } });
  }

  async createChatRoom(chatInfo) {
    const senderExists = await database.Users.findOne({
      where: { id: chatInfo.sender_id },
    });

    const receiverExists = await database.Users.findOne({
      where: { id: chatInfo.receiver_id },
    });

    if (!senderExists || !receiverExists) {
      throw new NotFound("Users associated");
    }

    const chatExists = await database.Chats.findOne({
      where: {
        [Op.and]: [
          { sender_id: chatInfo.sender_id },
          { receiver_id: chatInfo.receiver_id },
        ],
      },
    });

    if (chatExists) {
      throw new AlreadyExists("Chat room already created");
    }

    await database.Chats.create(chatInfo);
    return { message: `Chat Room created successfully!` };
  }

  async sendMessage({ sender_id, content }, id) {
    const chatExists = await database.Chats.findOne({ where: { id } });

    if (!chatExists) {
      throw new NotFound("Chat associated");
    }

    const message = await database.Messages.create({
      chat_id: id,
      sender_id,
      content,
    });
    return { message: `Message ${message.id} sent successfully!` };
  }
}

module.exports = ChatService;
