import jwt from 'jsonwebtoken';
import db from '../db';
import userModel from '../models/userModel';

const { getUserById } = userModel;

const auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) { res.status(401).json({ status: 403, message: 'Your token is missing' }); }
    try {
      const decoded = await jwt.verify(token, process.env.jwtPrivateKey);
      const {
        userid, admin, uemail, fname, lname,
      } = decoded;
      const { rows } = await db.query(getUserById, [userid]);
      if (!rows[0]) { res.status(401).json({ status: 401, message: 'Your token is invalid' }); }
      req.user = {
        id: userid,
        isadmin: admin,
        email: uemail,
        firstname: fname,
        lastname: lname,
      };
      next();
    } catch (error) {
      res.status(401).json({ status: 401, message: 'Your token is invalid' });
      res.status(500).json(error);
    }
  },
};

export default auth;
