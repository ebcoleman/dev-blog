// 
// Import necessary modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/api');
const sequelize = require('./config/connection'); // Import connection.js
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3001;

const helpers = {
  // Define your helper functions here
  // For example:
  formatTime: (date) => {
    return date.toLocaleTimeString();
  },
  // Add more helper functions as needed
};

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
      tableName: 'Sessions' // Set custom table name for sessions
    })
};

app.use(session(sess));

// Set up Handlebars.js engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use API routes
app.use(routes);

// Sync sequelize models to the database, then start Express app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
