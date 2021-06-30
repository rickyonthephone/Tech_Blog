const router = require('express').Router();
const { posts, users, comments } = require('../models');
const withAuth = require('../utils/auth');


router.get('/home', async (req, res) => {
    try {
      // Get posts and JOIN on user data, join comment data later on post page
      const postData = await posts.findAll({
        include: [
          {
            model: users,
            attributes: ['username']
          },
        ],
      });
      //Serialization
      const userPosts = postData.map((userPosts) => userPosts.get({ plain: true }));
      console.log(userPosts);
      res.render('home', {
          userPosts,
          logged_in: req.session.logged_in
      });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('home');
    return;
  }

  res.render('login');
});

router.get('/sign-up', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('home');
    return;
  }

  res.render('sign-up');
});

router.get('/posts/:id', withAuth, async (req, res) => {
    try {
      const postData = await posts.findByPk(req.params.id, {
        include: [
          {
            model: users,
            attributes: ['name'],
          },
          {
            model: comments,
            attributes: ['comment_text']
          }
        ],
      });

      const userPosts = userPosts.get({ plain: true });
      res.render('post', {
          ...userPosts,
          logged_in: req.session.logged_in
      });
    } catch (err) {
        res.status(400).json('No such post exists');
    }
});

module.exports = router;