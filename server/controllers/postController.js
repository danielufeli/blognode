import postObjects from '../helpers/postObjects';
import db from '../db';

const { newPost } = postObjects;

class postController {
  static async createPosts(req, res) {
    try {
      const post = await newPost(req);
      return res.status(201).json({
        status: 201,
        data: {
          status: 'success',
          message: 'You have Successfully created a new Article',
          post,
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deletePost(req, res) {
    const deleteQuery = 'DELETE FROM posts WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ error: 'post not found' });
      }
      return res.status(200).json({
        status: 200,
        data: { message: 'Post successfully deleted' },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getPosts(req, res) {
    const findAllPosts = await db.query('SELECT * FROM posts');
    const result = findAllPosts.rows;
    try {
      return res.status(200).json({
        status: 200,
        data: [result],
      });
    } catch (error) {
      return res.status(400).json({ error: 'No Posts found' });
    }
  }

  static async getPostById(req, res) {
    const post = 'SELECT * FROM posts WHERE id = $1';
    try {
      const { rows } = await db.query(post, [req.params.id]);
      if (!rows[0]) {
        return res.status(400).json({ error: 'The Post with the given ID was not found' });
      }
      return res.status(200).json({
        status: 200,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(400).json({ error: 'The Post with the given ID was not found' });
    }
  }

  static async updatePost(req, res) {
    const findPostById = 'SELECT * FROM posts WHERE id=$1';
    const updateApost = `UPDATE posts
      SET title=$1,descriptions=$2,category=$3,tag=$4,images=$5
      WHERE id=$6 returning *`;
    try {
      const { rows } = await db.query(findPostById, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ error: 'Post not found' });
      }
      const values = [
        req.body.title || rows[0].title,
        req.body.descriptions || rows[0].descriptions,
        req.body.category || rows[0].category,
        req.body.tag || rows[0].tag,
        req.body.images || rows[0].images,
        req.params.id,
      ];
      const response = await db.query(updateApost, values);
      const result = response.rows[0];
      return res.status(200).json({
        status: 200,
        data: { message: `You have successfully updated the post with title: ${result.title}`, result },
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}
export default postController;
