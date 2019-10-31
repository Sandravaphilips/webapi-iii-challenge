const express = 'express';

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

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

module.exports = server;
