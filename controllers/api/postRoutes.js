const express = require('express');
const router = express.Router();
const { Post, User } = require('../../models');

// Post creation route
router.post('/create', async (req, res) => {
  try {
    const newPost = await Post.create({
      post_title: req.body.post_title,
      post_body: req.body.post_body,
      user_id: req.session.user_id,
    });
    res.redirect('/posts'); 
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post detail route
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render('postDetail', { post, title: 'Post Detail' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
