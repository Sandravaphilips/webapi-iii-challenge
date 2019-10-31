// code away!
const server = require('./server');

server.listen(process.env.PORT || 5000, () => {
    console.log('listening on ' + (process.env.PORT || 5000));
})