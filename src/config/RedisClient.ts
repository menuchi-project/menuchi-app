import { createClient, RedisClientType } from 'redis';

class RedisClient {
  private static instance: RedisClientType;
  private static isConnectionSuccess = true;

  static getInstance() {
    if (this.instance) return this.instance;

    this.instance = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });

    this.instance.on('error', (err: Error) => {
      if (!this.isConnectionSuccess) return;
      this.isConnectionSuccess = false;
      console.log('Redis Client Error.', err.message);
    });

    this.instance.on('connect', () => console.log('Redis Connected.'));

    this.instance.connect();
    return this.instance;
  }
}

export default RedisClient.getInstance();
