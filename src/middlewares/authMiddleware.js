const jwt = require("jsonwebtoken");
const MissingTokenJWT = require("../errors/MissingTokenJWT");
const { StatusCodes } = require("http-status-codes");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new MissingTokenJWT();
    }

    const token = authorization.replace("Bearer", "").trim();
    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: error.message });
  }
};
