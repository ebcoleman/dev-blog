const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('home', { title: 'Home' }); // Render home page using a handlebars template
});

module.exports = router;
