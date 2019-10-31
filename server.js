const express = 'express';
const userRoutes = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use('/users', logger, userRoutes);

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
