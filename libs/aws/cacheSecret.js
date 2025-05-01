import cache from './cache';

function getCachedSecret(secretName) {
   return cache.get(secretName);
}

export default { getCachedSecret };
