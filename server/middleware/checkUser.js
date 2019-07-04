import userObjects from '../helpers/userObjects';
import authtok from '../helpers/authok';

const { userByEmail, userByMobile } = userObjects;

export default class checkUser {
  static async checkUserEmail(req, res, next) {
    try {
      const user = await userByEmail(req.body.email);
      if (!user) { return next(); }
      return res.status(409).json({ status: 409, error: 'The user with this email has already registered' });
    } catch (error) {
      return next(error);
    }
  }

  static async checkUserMobile(req, res, next) {
    try {
      const user = await userByMobile(req.body.mobileno);
      if (!user) { return next(); }
      return res.status(409).json({ status: 409, error: 'The user with this mobileno has already registered' });
    } catch (error) {
      return next(error);
    }
  }

  static async checkEmailSignin(req, res, next) {
    try {
      const user = await userByEmail(req.body.email);
      if (!user) { return res.status(401).json({ status: 401, error: 'Your email is incorrect' }); }
      if (!authtok.comparePassword(user.password, req.body.password)) { return res.status(401).json({ status: 401, error: 'Your password is incorrect' }); }
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
