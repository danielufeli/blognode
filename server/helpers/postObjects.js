import postModel from '../models/postModel';
import db from '../db';

const { createPost } = postModel;

export default class tripObjects {
  static async newPost(req) {
    const values = [
      req.body.title,
      req.body.descriptions,
      req.body.category,
      req.body.tag,
      req.body.images,
    ];
    const { rows } = await db.query(createPost, values);
    return rows[0];
  }
}
