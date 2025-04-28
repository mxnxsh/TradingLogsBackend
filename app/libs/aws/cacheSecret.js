const cache = require('./cache');

function getCachedSecret(secretName) {
   return cache.get(secretName);
}

module.exports = { getCachedSecret };
