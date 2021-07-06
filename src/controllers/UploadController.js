const UploadService = require("../services/UploadService");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

class UploadController {
  static async uploadProfileImage(req, res) {
    const { id } = req.params;
    const serviceInfo = req.body;
    const { filename } = req.file;
    const uploadService = new UploadService();

    try {
      const upload = await uploadService.uploadProfileImage(filename, id);
      return res.json(upload);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  static async getProfileImage(req, res) {
    const { id } = req.params;
    const uploadService = new UploadService();

    try {
      const profileImage = await uploadService.getProfileImage(id);
      return res.sendFile(
        path.resolve(__dirname, "..", "..", "uploads", profileImage)
      );
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}

module.exports = UploadController;
