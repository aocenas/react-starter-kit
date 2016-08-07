/* @flow */

/**
 * Simple caching in redis. You need to setup REDIS_CACHE_URL which probably should be different then your
 * session redis because you want to set evictions policy to something like allkeys-lru
 */

const redis = require('redis');
const bluebird = require('bluebird');

import log from './logging';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
export const client = redis.createClient(process.env.REDIS_CACHE_URL);

client.on('error', function (err) {
    log.error(err, 'redis_cache error');
});

export function get (key: string): Promise<string> {
    return client
        .getAsync(key)
        .catch(err => {
            log.error(err, `error: get cache key ${key}`);
            return null;
        });
}

export function set (key: string, value: string, ttl?: number): Promise {
    let command = client.setAsync(key, value);
    if (ttl) {
        command = command.then(() => {
            return client.expireAsync(key, ttl);
        });
    }
    return command.catch(err => {
        log.error(err, `error: setting cache key ${key}`);
    });
}
