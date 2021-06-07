const router = require('express').Router();
const { users, posts, comments } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
      // Get posts and JOIN on user data, join comment data later on post page
      const postData = await posts.findAll({
        include: [
          {
            model: users,
            attributes: ['username'],
          },
        ],
      });
      //Serialization
      const userPosts = postData.map((userPosts) => userPosts.get({ plain: true }));

      res.render('home', {
          userPosts,
          logged_in: req.session.logged_in
      });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
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