// const express = require('express');
// const router = express.Router();

// // User login route
// router.get('/login', (req, res) => {
//   res.render('login', { title: 'Login' }); // Render login page using a handlebars template
// });

// // User signup route
// router.get('/signup', (req, res) => {
//   res.render('signup', { title: 'Sign Up' }); // Render signup page using a handlebars template
// });

// // User profile route
// router.get('/profile', (req, res) => {
//   // Logic to retrieve user profile data from the database
//   res.render('profile', { title: 'Profile' }); // Render profile page using a handlebars template
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

// User login route
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' }); // Render login page using a handlebars template
});

// User signup route
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' }); // Render signup page using a handlebars template
});

// User profile route
router.get('/profile', (req, res) => {
  // Logic to retrieve user profile data from the database
  res.render('profile', { title: 'Profile' }); // Render profile page using a handlebars template
});

module.exports = router;
