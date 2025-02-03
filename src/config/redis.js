const redis = require('redis');

// Create and configure Redis client
const redisClient = redis.createClient({
  host: 'localhost',  // Redis server host (change if different)
  port: 6379,         // Redis server port (change if different)
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
  console.log('Redis error:', err);
});

// Export the redisClient for use in other files
module.exports = redisClient;
