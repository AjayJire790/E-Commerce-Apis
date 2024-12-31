import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import userRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserController {
  constructor() {
    this.userRepository = new userRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async signIn(req, res, next) {
    try {
      //1.Find user by email
      const user = await this.userRepository.findByEmail(req.body.email);

      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        //2.Compare password with hash password
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // 3. Create token.
          const token = jwt.sign(
            {
              userID: result.id,
              email: result.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );

          // 4. Send token.
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect Credentials");
        }
      }
    } catch (err) {
      throw new ApplicationError("Something went wrong.", 500);
    }
  }
}
