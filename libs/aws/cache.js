// cache.js

let instance = null;

class Cache {
   constructor() {
      if (!instance) {
         instance = this;
         this.cache = {};
      }
      return instance;
   }

   get(key) {
      return this.cache[key];
   }

   set(key, value) {
      this.cache[key] = value;
   }
}

export default new Cache();
