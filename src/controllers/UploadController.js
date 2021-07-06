const UploadService = require("../services/UploadService");
const { StatusCodes } = require("http-status-codes");

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
}

module.exports = UploadController;
