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

module.exports = server;
