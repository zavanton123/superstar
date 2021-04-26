const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const subscriber = redisClient.duplicate();

subscriber.on('message', (channel, index) => {
  redisClient.hset('values', index, calculateFibonacci(parseInt(index)));
});

function calculateFibonacci(index) {
  if (index < 2) return 1;
  return calculateFibonacci(index - 1) + calculateFibonacci(index - 2);
}

subscriber.subscribe('insert');
