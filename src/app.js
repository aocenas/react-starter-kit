// @flow
'use strict';
if (process.env.NODE_ENV === 'production') {
    require('newrelic');
}

// setup global settings
require('./setup');

const path = require('path');

/**
 * Module dependencies.
 */
const express = require('express');
const compress = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const passport = require('passport');
const expressValidator = require('express-validator');
const sass = require('node-sass-middleware');
const RedisStore = require('connect-redis')(session);
const raygun = require('raygun');
const throng = require('throng');

const autoprefixer = require('autoprefixer');
const postcssMiddleware = require('postcss-middleware');
const raygunClient = new raygun.Client().init({ apiKey: process.env.RAYGUN_APIKEY });

import logger from './common/logging';


function createApp () {
    /**
     * Create Express server.
     */
    var app = express();

    // used for maxAge
    const fiveDays = (60000 * 60) * ( 24 * 5 );
    const isDev = process.env.NODE_ENV == 'development';

    /**
     * Uncaught errors
     */
    process.on('uncaughtException', (err) => {
        // actually only unhandledRejection should go through here as all other errors should go through express
        // error handling, but just in case this is bit safer and makes sure everything is sent to raygun
        logger.fatal(err, 'uncaughtException');
        if (process.env.NODE_ENV == 'production') {
            raygunClient.send(err, {}, function () { });
        }
        process.exit();
    });

    process.on('unhandledRejection', (err) => {
        // throw so uncaughtException handler will handle it
        throw err;
    });


    /**
     * Express configuration.
     */
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use((req, res, next) => {
        // request id from heroku
        req.request_id = req.get('X-Request-ID');
        logger.info({req});
        next();
    });

    app.use(compress());
    app.use('/static/css', sass({
        // seems like up and back path, but because this will be eventually called from dist and css are not copied
        // to dist at this moment we need to go to src
        src: path.join(__dirname, '../src/client/css'),
        dest: path.join(__dirname, '../public/css'),
        sourceMap: isDev,
        debug: true,
        indentedSyntax: true,
        error: err => console.error(err),
    }));

    app.use('/static/css', postcssMiddleware({
        plugins: [
            autoprefixer({
                browsers: ['last 2 versions'],
            }),
        ],
        src: function(req) {
            return path.join(path.join(__dirname, '../public/css'), req.url);
        },
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(session({
        // TODO: setup redis
        // store: new RedisStore({url: process.env.REDIS_URL}),
        // TODO secret from env
        secret: 'process.env.SESSION_SECRET',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: fiveDays},
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(lusca.csrf());
    app.use(lusca.xframe('SAMEORIGIN'));
    app.use(lusca.xssProtection(true));

    app.use(function(req, res, next) {
        // this will be available in jade templates
        res.locals.isDev = isDev;
        res.locals.data = {};

        // init session variables
        if (!req.session.data) {
            req.session.data = {};
        }
        next();
    });

    require('./config/staticServer')(app);

    // for testing error handling
    require('./routes/error')(app);

    // register all api routes
    require('./routes/api/index')(app);

    // register react route
    require('./reactAppServer')(app);


    /**
     * Error Handler.
     */
    if (process.env.NODE_ENV === 'production') {
        app.use(raygunClient.expressHandler);
    } else {
        app.use(errorHandler());
    }

    // log error through bunyan
    app.use((err, req, res, next) => {
        logger.error({err, req, res});
        next(err);
    });

    /**
     * Start Express server.
     */
    app.listen(app.get('port'), function() {
        console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
    });
}


if (process.env.NODE_ENV === 'development') {
    // easier and quicker debugging
    createApp();
} else {
    // best practice for heroku
    throng(
        {
            workers: process.env.WEB_CONCURRENCY || 1,
        },
        createApp
    );
}

