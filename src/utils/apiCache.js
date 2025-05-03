/**
 * Simple API caching system to prevent duplicate requests
 * and improve performance by caching responses.
 */
const API_CACHE = {
  cache: new Map(),
  
  /**
   * Store data in cache with expiration time
   * @param {string} key - Cache key
   * @param {any} data - Data to store
   * @param {number} expiresInMs - Expiration time in milliseconds
   */
  set(key, data, expiresInMs = 5 * 60 * 1000) {
    const expiresAt = Date.now() + expiresInMs;
    this.cache.set(key, { data, expiresAt });
  },
  
  /**
   * Get data from cache if available and not expired
   * @param {string} key - Cache key
   * @returns {any|null} Cached data or null if not found/expired
   */
  get(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    // Check if expired
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  },
  
  /**
   * Clear specific cache entry
   * @param {string} key - Cache key to clear
   */
  clear(key) {
    this.cache.delete(key);
  },
  
  /**
   * Clear all cache entries
   */
  clearAll() {
    this.cache.clear();
  }
};

export default API_CACHE;