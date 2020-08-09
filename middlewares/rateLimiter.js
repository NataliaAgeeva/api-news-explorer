const rateLimit = require('express-rate-limit');

const TIME = 15 * 60 * 1000;
const MAX_REQUESTS = 100;

const limiter = rateLimit({
  windowMs: TIME,
  max: MAX_REQUESTS,
});

module.exports = limiter;
