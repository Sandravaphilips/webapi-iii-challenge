const express = require('express');
const postDb = require('./postDb');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts)
    } catch {
        return res.status(500).json({message: 'internal server error'})
    }
});

router.get('/:id', validatePostId, async(req, res) => {
    try {
        const postById = await postDb.getById(req.post);
        res.status(200).json(postById);
    } catch {
        return res.status(500).json({message: 'internal server error'})
    }
});

router.delete('/:id', validatePostId, async(req, res) => {
    try {
        const count = await postDb.remove(req.post);
        res.status(200).json(count)
    } catch {
        return res.status(500).json({message: 'internal server error'})
    }
});

router.put('/:id', validatePostId, async(req, res) => {
    const post = await postDb.getById(req.post)
    const userToUpdate = {
        // id: req.post,
        text: req.body.text,
        user_id: post["user_id"]
    }

    try {
        const postUpdate = postDb.update(req.post, userToUpdate);
        res.status(200).json(postUpdate)
    } catch {
        return res.status(500).json({message: 'internal server error'})
    }
});

// custom middleware

function validatePostId(req, res, next) {
    const {id} = req.params;
  
    postDb.getById(id)
    .then(data => {
        if (!data) {
            return res.json({ message: "invalid user id" })
        } else {
            req.post = id;
            next();
        }
    })
};

module.exports = router;