import express from 'express';

import authController from '../controllers/authController';
import allValidator from '../middleware/allValidator';
import validateUser from '../helpers/validateuser';
import checkUser from '../middleware/checkUser';
import validateSignin from '../helpers/signin';

const router = express.Router();
const { checkUserEmail, checkUserMobile, checkEmailSignin } = checkUser;
const { userSignup, userSignin } = authController;

router.post('/signup', allValidator(validateUser), checkUserEmail, checkUserMobile, userSignup);

router.post('/signin', allValidator(validateSignin), checkEmailSignin, userSignin);

export default router;
