const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// User login route
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// User signup route
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' });
});

// User profile route
router.get('/profile', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    res.render('profile', { user, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
