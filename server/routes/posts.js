import express from 'express';

import postController from '../controllers/postController';
import validatepost from '../helpers/validatepost';
import allValidator from '../middleware/allValidator';
import auth from '../helpers/auth';

const router = express.Router();
const {
  createPosts, getPosts, getPostById, updatePost, deletePost,
} = postController;
const { verifyToken } = auth;

router.post('/', verifyToken, allValidator(validatepost), createPosts);

router.get('/', getPosts);

router.get('/:id', getPostById);

router.put('/:id', verifyToken, allValidator(validatepost), updatePost);

router.delete('/:id', verifyToken, deletePost);

export default router;
