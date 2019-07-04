import express from 'express';

import homeController from '../controllers';

const router = express.Router();

router.get('/', homeController.homeMessage);

export default router;
