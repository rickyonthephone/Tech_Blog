const router = require('express').Router();
const { users, posts, comments } = require('../../models');
//require authorization 
const withAuth = require('../../utils/auth');

//Add new post to blog API using CREATE method of CRUD
router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await posts.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //Get a specific post by it's id
  router.get('/:id', (req, res) => {
      posts.findbyPk({
          where: {
            id: req.params.id
          },
          attributes: [
            "id",
            "title",
            "snippet",
            "post",
            "industry_years",
            "date_posted"
          ],
          include: [{
            model: comments, 
            attributes: [
                'id',
                'comment_text', 
                'post_id', 
                'user_id'
            ],
            model: users,
            attributes: [
                'username'
            ]
        }]
      })

    .then (postData => {
       if(!postData) {
           res.status(404).json({ message:'No such post exists'});
           return;
       } res.json(postData);
    })
    .catch (err => {
        res.status(500).json(err);
    });
});

//Delete a post by it's id
router.delete('/:id', withAuth, (req, res) => {
    posts.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No such post found' });
          return;
        }
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;