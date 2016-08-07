// @flow
const bunyan = require('bunyan');

/**
 * Bunyan logger setup.
 * TODO: check other loggers as bunyans JSON can be pain to work with when sending logs to external services.
 */

function reqSerializer (req) {
    if (!req || !req.connection)
        return req;
    return {
        method: req.method,
        url: req.url,
        headers: req.headers,
        remoteAddress: req.connection.remoteAddress,
        remotePort: req.connection.remotePort,
        request_id: req.request_id || 'development',
    };
}

const bunyanOptions: Object = {
    name: 'logger',
    level: process.env.NODE_ENV == 'development' ? 'debug' : 'warn',
    serializers: Object.assign({}, bunyan.stdSerializers, {req: reqSerializer}),
};


// Production setup logzio is a hosted ELK stack
if (process.env.NODE_ENV == 'production') {
    const LogzioStream = require('./LogzioStream');
    const logzioLogger = require('logzio-nodejs').createLogger({
        protocol: 'https',
        token: process.env.LOGZIO_TOKEN,
    });

    bunyanOptions.streams = [{
        level: 'info',
        type: 'raw',
        stream: new LogzioStream(logzioLogger),
    }];
}


export default bunyan.createLogger(bunyanOptions);
