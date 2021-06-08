const router = require('express').Router();
const { cpuUsage } = require('process');
const { comments } = require('../../models');
//require authorization 
const withAuth = require('../../utils/auth');

//To retrieve comments
router.get ('/', (req, res) => {
    comments.findAll()
    .then (commentData => res.json(commentData))
    .catch(err => {
        res.status(500).json(err);
    });
});

//To post a comment
router.post ('/', withAuth, (req, res) => {
    if (req.session) {
        comments.create (
            {
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
            }
        )
        .then (commentData => res.json.apply(commentData))
        .catch (err => {
            res.status(400).json(err);
        });
    }
});

//To delete comment
router.delete ('/:id', withAuth, (req, res) =>{
    comments.destroy ({
        where: {id} = req.params
    })
    .then (commentData => {
        if(!commentData) {
            res.status(400).json({message: 'No such comment exists'});
            return;
        }
        res.json(commentData);
    })
    .catch (err => {
        res.status(500).json(err);
    });
});
