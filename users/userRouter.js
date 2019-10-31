const express = 'express';
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, async(req, res) => {
    try {
        const userToPost = await userDb.insert(req.body);
        return res.status(201).json(userToPost)
    } catch {
    return res.status(500).json({message: 'internal server error'})
    }
});

router.post('/:id/posts', validateUserId, validatePost, async(req, res) => {
    try {
        const newPost = await postDb.insert(req.body)
        return res.status(201).json(newPost);
    } catch {
        return res.status(500).json({message: 'internal server error'})
    }
});

router.get('/', async(req, res) => {
    try {
        const users = userDb.get();
        res.status(200).json(users)
    } catch {
        return res.status(500).json({message: 'internal server error'})
    }
});

router.get('/:id', validateUserId, async(req, res) => {
    try {
        const userById = await userDb.getById(req.user);
        res.status(200).json(userById);
    } catch {
        return res.status(500).json({message: 'internal server error'})
    }
});

router.get('/:id/posts', validateUserId, async(req, res) => {
    try {
        const userPosts = await userDb.getUserPosts(req.user);
        res.status(200).json(userPosts);
    } catch {
        return res.status(500).json({message: 'internal server error'})
    }
});

router.delete('/:id', validateUserId, async(req, res) => {
    try {
        await userDb.remove(req.user);
        res.status(200).json({message: "The user has been successfully deleted"})
    } catch {
        return res.status(500).json({message: 'internal server error'})
    }
});

router.put('/:id', validateUserId, validateUser, async(req, res) => {
    try {
        userDb.update(req.user, req.body);
        res.status(200).json({message: "user has been updated"})
    } catch {
        return res.status(500).json({message: 'internal server error'})
    }
});

//custom middleware

function validateUserId(req, res, next) {
    const {id} = req.params;
  
    if(id) {
      req.user = id;
      next()
    } else {
      return res.status(400).json({message: "invalid user id"})
    }
}
  
function validateUser(req, res, next) {
    const {name} = req.body;

    if(!req.body) {
        res.status(400).json({ message: "missing user data" })
    } else if (!name) {
        res.status(400).json({ message: "missing required name field" })
    } else {
        next();
    }
}
  
function validatePost(req, res, next) {
const {text} = req.body;

if(!req.body) {
    res.status(400).json({ message: "missing post data" })
} else if (!text) {
    res.status(400).json({ message: "missing required text field" })
} else {
    next();
}
}

module.exports = router;
