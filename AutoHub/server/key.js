const crypto = require('crypto');

// Generate a random string as secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);
