const ChatService = require("../services/ChatService");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

class ChatController {
  static async showAllChatRooms(req, res) {
    const chatService = new ChatService();

    try {
      const chats = await chatService.showAllChatRooms();
      return res.json(chats);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async showAllMessages(req, res) {
    const { id } = req.params;
    const chatService = new ChatService();

    try {
      const messages = await chatService.showAllMessages(id);
      return res.json(messages);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async createChat(req, res) {
    const { id } = req.params;
    const { receiver_id } = req.body;
    const chatService = new ChatService();

    try {
      const messages = await chatService.createChat(receiver_id, id);
      return res.json(messages);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async sendMessage(req, res) {
    const { id } = req.params;
    const { sender_id, content } = req.body;
    const chatService = new ChatService();

    try {
      const messages = await chatService.sendMessage(
        { sender_id, content },
        id
      );
      return res.json(messages);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

module.exports = ChatController;