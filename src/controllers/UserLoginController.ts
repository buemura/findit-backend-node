import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../database/db";
import bcrypt from "bcrypt";

class UserLoginController {
  async userRegister(req: Request, res: Response) {
    const { name } = req.body;
    const { email } = req.body;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, hashedPassword]
      );

      res.status(StatusCodes.OK).send({
        message: "Registered Successfully",
        user: { name, email },
      });
    } catch (error) {
      console.log({ message: `ERROR: ${error.detail}` });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: `ERROR: ${error.detail}` });
    }
  }

  async userLogin(req: Request, res: Response) {
    const { email } = req.body;
    const { password } = req.body;

    try {
      const results = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      // Check if the query result is true, if so it will proceed with the authentication
      if (results.rows.length > 0) {
        const user = results.rows[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          }

          if (isMatch) {
            console.log({ status: StatusCodes.OK, message: "Successful" });
            res.status(StatusCodes.OK).send({ message: "Successful" });
          } else {
            console.log({
              status: StatusCodes.BAD_REQUEST,
              message: "Password is not correct",
            });
            res
              .status(StatusCodes.BAD_REQUEST)
              .send({ message: "Password is not correct" });
          }
        });
      } else {
        console.log({
          status: StatusCodes.NOT_FOUND,
          message: "Email is not registered",
        });
        res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: "Email is not registered" });
      }
    } catch (error) {
      console.log({ message: `ERROR: ${error.detail}` });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: `ERROR: ${error.detail}` });
    }
  }
}

export default UserLoginController;
