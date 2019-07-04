import userModel from '../models/userModel';
import db from '../db';
import authtok from './authok';

const { createUser, allUser } = userModel;

export default class userObjects {
  static async newUser(req) {
    const hash = authtok.hashPassword(req.body.password);
    const values = [
      req.body.email,
      req.body.mobileno,
      req.body.firstname,
      req.body.lastname,
      hash,
      req.body.address,
    ];
    const { rows } = await db.query(createUser, values);
    return rows[0];
  }

  static async allUsers() {
    const { rows } = await db.query(allUser);
    return rows;
  }

  static async userByEmail(uemail) {
    const users = await userObjects.allUsers();
    const currentUser = users.find(user => user.email === uemail);
    return currentUser;
  }

  static async userByMobile(umobile) {
    const users = await userObjects.allUsers();
    const currentUser = users.find(user => user.mobileno === umobile);
    return currentUser;
  }

  static generateUserToken(user) {
    const {
      id, firstname, lastname, email, isadmin,
    } = user;
    const userToken = authtok.generateToken(id, isadmin, email, firstname, lastname);
    const data = { id, isadmin, token: userToken };
    return data;
  }
}
