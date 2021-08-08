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

  async showAllChatRoomsByUser(id) {
    return await database.Chats.findAll({ where: { sender_id: id } });
  }

  async showAllMessages(id) {
    return await database.Messages.findAll({ where: { chat_id: id } });
  }

  async createChatRoom(chatInfo) {
    // Check if Users associated exists
    const senderExists = await database.Users.findOne({
      where: { id: chatInfo.sender_id },
    });
    const receiverExists = await database.Users.findOne({
      where: { id: chatInfo.receiver_id },
    });
    if (!senderExists || !receiverExists) {
      throw new NotFound("Users associated");
    }

    // Check if the Chat Room already exists
    const chatExists = await database.Chats.findOne({
      where: {
        [Op.and]: [
          { sender_id: chatInfo.sender_id },
          { receiver_id: chatInfo.receiver_id },
        ],
      },
    });
    if (chatExists) {
      return { chat_id: chatExists.id, message: `Chat Room already exists!` };
    }

    // Create Chat Room
    const data = await database.Chats.create(chatInfo);
    return { chat_id: data.id, message: `Chat Room created successfully!` };
  }

  async sendMessage({ sender_id, content }, id) {
    // Check if Chat Room exists
    const chatExists = await database.Chats.findOne({ where: { id } });
    if (!chatExists) {
      throw new NotFound("Chat associated");
    }

    // Check if sender_id is associated to chat room
    const userAssociated = await database.Chats.findOne({
      where: {
        [Op.or]: [{ sender_id }, { receiver_id: sender_id }],
      },
    });
    if (!userAssociated) {
      throw new NotFound("User associated");
    }

    // Send message
    const message = await database.Messages.create({
      chat_id: id,
      sender_id,
      content,
    });
    return { message: `Message ${message.id} sent successfully!` };
  }
}

module.exports = ChatService;
