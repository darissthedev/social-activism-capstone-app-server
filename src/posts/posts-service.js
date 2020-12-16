const PostService = {
  //relevant
  getPosts(db) {
    return db
      .select('*')
      .from('posts')
      .orderBy('id', 'desc')
      .limit(10);
  },
  getPostById(db, post_id) {
    return db
      .select('*')
      .from('posts')
      .where('posts.id', post_id)
      .first();
  },
  //relevant
  insertPost(db, newPost) {
    return db
      .insert(newPost)
      .into('posts')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  //relevant
  updatePost(db, post_id, newPost) {
    return db('posts')
      .update(newPost, returning = true)
      .where({
        id: post_id
      })
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  //relevant
  deletePost(db, post_id) {
    return db('posts')
      .delete()
      .where({
        'id': post_id
      });
  }
};
  
module.exports = PostService;