import { useState, useEffect } from 'react';
import API_CACHE from '../utils/apiCache';

/**
 * Custom hook for API data fetching with caching and state management
 * 
 * @param {Function} apiFunction - API function to call
 * @param {any} params - Parameters to pass to the API function
 * @param {Object} options - Configuration options
 * @returns {Object} Data, loading, error states and refetch function
 */
export const useApiData = (apiFunction, params = null, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(0);
  
  const {
    cacheKey = null,
    cacheTime = 5 * 60 * 1000, // 5 minutes default
    enabled = true,
    onSuccess = null,
    onError = null,
    skipCache = false
  } = options;
  
  // Generate a cache key if not provided
  const effectiveCacheKey = cacheKey || 
    `${apiFunction.name}_${JSON.stringify(params)}`;
  
  // Function to trigger a manual refetch
  const refetch = () => {
    setShouldRefetch(prev => prev + 1);
  };
  
  useEffect(() => {
    // Skip if disabled
    if (!enabled) return;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check cache first unless skipCache is true
        if (!skipCache) {
          const cachedData = API_CACHE.get(effectiveCacheKey);
          if (cachedData) {
            setData(cachedData);
            setLoading(false);
            if (onSuccess) onSuccess(cachedData);
            return;
          }
        }
        
        // Make the API call
        const response = await apiFunction(params);
        
        // Cache the successful response
        if (!skipCache) {
          API_CACHE.set(effectiveCacheKey, response, cacheTime);
        }
        
        setData(response);
        
        if (onSuccess) onSuccess(response);
      } catch (err) {
        setError(err.message || 'An error occurred');
        if (onError) onError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [effectiveCacheKey, enabled, shouldRefetch, skipCache, apiFunction, params, cacheTime, onSuccess, onError]);
  
  return { data, loading, error, refetch };
};