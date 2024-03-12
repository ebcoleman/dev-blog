const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all posts
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Internal server error' }); 
  }
});

// Route to get post by id
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!postData) {
      // Handle case where post is not found
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = postData.get({ plain: true });

    res.render('postDetail', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get user profile
router.get('/profile', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    if (!userData) {
        return res.status(404).json({ error: 'User not found' });
    }

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
