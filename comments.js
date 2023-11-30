// Create web server

var express = require('express');
var router = express.Router();

// Load model
var Comment = require('../models/comment');

// Get all comments
router.get('/', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) {
            res.send(err);
        } else {
            res.json(comments);
        }
    });
});

// Get comment by id
router.get('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.send(err);
        } else {
            res.json(comment);
        }
    });
});

// Create new comment
router.post('/', function(req, res) {
    var comment = new Comment();
    comment.user_id = req.body.user_id;
    comment.content = req.body.content;
    comment.post_id = req.body.post_id;

    comment.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Comment created!' });
        }
    });
});

// Update comment
router.put('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.send(err);
        } else {
            comment.user_id = req.body.user_id;
            comment.content = req.body.content;
            comment.post_id = req.body.post_id;

            comment.save(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'Comment updated!' });
                }
            });
        }
    });
});

// Delete comment
router.delete('/:id', function(req, res) {
    Comment.remove({
        _id: req.params.id
    }, function(err, comment) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Comment deleted!' });
        }
    });
});

module.exports = router;