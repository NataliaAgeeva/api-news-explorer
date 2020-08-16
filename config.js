require('dotenv').config();

const PORT = process.env.PORT || 3000;
module.exports.PORT = PORT;

if (process.env.NODE_ENV === 'production') {
  module.exports.JWT_SECRET = process.env.JWT_SECRET;
  module.exports.dbURL = process.env.dbURL;
} else {
  module.exports.JWT_SECRET = 'secret key';
  module.exports.dbURL = 'mongodb://localhost:27017/newsdb';
}
