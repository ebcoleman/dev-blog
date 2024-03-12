const express = require('express');
const router = express.Router();
const { Comment, User, Post } = require('../../models');

// Create comment route
router.post('/create', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_body: req.body.comment_body,
      user_id: req.session.user_id, 
      post_id: req.body.post_id, 
    });
    // Redirect to the post detail page after creating a new comment
    res.redirect('/posts/' + req.body.post_id); 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
