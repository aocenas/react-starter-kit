// @flow

// see https://github.com/jksdua/bunyan-logzio

const stream = require('stream');

class LogzioStream extends stream.Writable {
    logzioLogger: Object;
    constructor (logzioLogger: Object, options?: Object) {
        super(options);
        this.logzioLogger = logzioLogger;
    }

    //noinspection JSCheckFunctionSignatures
    write (chunk: any): bool {

        if (typeof chunk !== 'object' && !Array.isArray(chunk)) {
            throw new Error('bunyan-logzio requires a raw stream. Please define the type as raw when setting up the bunyan stream.');
        }

        this.logzioLogger.log(chunk);
        return true;
    }
}


module.exports = LogzioStream;
