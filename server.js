const express = require('express');
const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');

const server = express();

server.use(express.json());
server.use('/users', logger, userRoutes);
server.use('/posts', logger, postRoutes)

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`${req.method}, ${req.url}, ${now}`);
  next();
};



module.exports = server;
