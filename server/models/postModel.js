const postModel = {
  createPost: `INSERT INTO
  posts(title, descriptions, category, tag, images)
  values($1, $2, $3, $4, $5)
  returning *`,
};

export default postModel;
