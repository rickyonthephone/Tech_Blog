const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// Expect to use controllers and helper functions - but currently none to import
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');
const sequelize = require('./config/connect');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 8080





sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });