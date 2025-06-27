import { createClient, RedisClientType } from 'redis';

class TransformersRedisClient {
  private static instance: RedisClientType;
  private static isConnectionSuccess = true;

  static getInstance() {
    if (this.instance) return this.instance;

    this.instance = createClient({
      url: process.env.TRANSFORMERS_REDIS_URL
    });

    this.instance.on('error', (err: Error) => {
      if (!this.isConnectionSuccess) return;
      this.isConnectionSuccess = false;
      console.log('Transformers Redis Client Error.', err.message);
    });

    this.instance.once('connect', () => console.log('Transformers Redis Connected.'));

    this.instance.connect();
    return this.instance;
  }
}

export default TransformersRedisClient.getInstance();
