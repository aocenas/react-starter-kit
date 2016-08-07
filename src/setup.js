if (process.env.NODE_ENV == 'development') {
    const dotenv = require('dotenv');
    dotenv.load();
}

const Promise = require('bluebird');
global.Promise = Promise;
