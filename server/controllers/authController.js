import dotenv from 'dotenv';
import userObjects from '../helpers/userObjects';

const { newUser, generateUserToken, userByEmail } = userObjects;
dotenv.config();

class authController {
  static async userSignup(req, res) {
    try {
      const user = await newUser(req);
      const data = generateUserToken(user);
      res.status(201).json({ status: 'success', message: 'You have successfully Created an account', data });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async userSignin(req, res) {
    try {
      const user = await userByEmail(req.body.email);
      const data = generateUserToken(user);
      return res.status(200).json({ status: 'success', message: 'You have successfully Sigined in', data });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default authController;
