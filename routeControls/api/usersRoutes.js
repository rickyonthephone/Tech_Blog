const router = require('express').Router();
const { users } = require('../../models');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)


router.get('/', (req, res) => {
  users.findAll ({
    attributes: {exclude: ['password'] }
  })
  .then (dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});





//add a new user to api using sign up data
router.post('/', (req, res) => {
  users.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then (dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
  //   try {
  //     const userData = await users.create(req.body);
  
  //     req.session.save(() => {
  //       req.session.user_id = userData.id;
  //       req.session.logged_in = true;
  
  //       res.status(200).json(userData);
  //     });
  //   } catch (err) {
  //     res.status(400).json(err);
  //   }
  // });

//to log users in, first validate email from the users model (READ method of CRUD)
router.post('/login', async (req, res) => {
    try {
      const userData = await users.findOne({ where: { email: req.body.email } });
  //if userData does not equal what email found send message
      if (!userData) {
        res.status(400).json({ message: 'Email does not exist, please try again' });
        return;
      }
  //validate user's password
      const validPassword = await userData.checkPassword(req.body.password);
  //if password provided does not match, send message otherwise authenticate log in
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //Log out - end session
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;