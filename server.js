const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/api');
const sequelize = require('./config/connection'); // Import connection.js
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

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
      db: sequelize
    })
  };

app.use(session(sess));

// Set up Handlebars.js engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' })); // Specify the default layout file
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Specify the directory for views

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
