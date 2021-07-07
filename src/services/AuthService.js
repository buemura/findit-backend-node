const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../models");
const blacklist = require("../middlewares/handleBlacklist");
require("dotenv").config();

class AuthService {
  async registerUser({ name, email, password }) {
    const userAlreadyExists = await database.Users.findOne({
      where: { name, email },
    });

    if (userAlreadyExists) {
      throw new Error("User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await database.Users.create({
      name,
      email,
      password: hashedPassword,
    });

    return { message: "User registered successfully!" };
  }

  async loginUser({ email, password }) {
    const user = await database.Users.findOne({ where: { email } });
    const payload = { id: user.id, email: user.email };
    const expiration = { expiresIn: "1h" };

    if (!user) {
      return { auth: false, message: `Email ${email} is not registered` };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return { auth: false, message: "Authentication Failed" };
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);

    return { auth: true, message: "Authentication Successful", token };
  }

  async logoutUser(token) {
    try {
      const tokenInBlackList = await blacklist.tokenExists(token);

      if (tokenInBlackList) {
        throw new jwt.JsonWebTokenError("Already Logged out.");
      }

      await blacklist.add(token);

      return { auth: true, message: "Signed out successfully" };
    } catch (error) {
      return { auth: false, message: error.message };
    }
  }
}

module.exports = AuthService;
