const { connect, connection } = require('mongoose');

connect('mongodb://localhost/videosAndResponses', { //Change videosAndResponses
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
