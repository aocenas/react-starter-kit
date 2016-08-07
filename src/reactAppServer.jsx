
const axios = require('axios');
const React = require('react');
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {trigger} from 'redial';

import routes from './config/reactRoutes';
import configureStore from './redux/configureStore';
import apiFactory from './redux/apiFactory';

module.exports = function reactAppServer (app) {
    app.get('*', (req, res, next) => {

        // TODO: change or take prod hostname from config/hosting meta data
        const axiosOptions = {
            baseURL: process.env.NODE_ENV == 'production' ?
                'http://www.example.com/api/v0': 'http://localhost:3000/api/v0',
        };

        // we need to resend cookie so session is preserved for api calls, but first request does not have cookies
        // and axios does not take that very well
        if (req.headers.cookie) {
            axiosOptions.headers = {cookie: req.headers.cookie};
        }
        const api = apiFactory(axios.create(axiosOptions));


        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
                next(error);
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {

                let store = configureStore(null, api);
                // locals will be available for redial hooks
                const locals = {
                    path: renderProps.location.pathname,
                    query: renderProps.location.query,
                    params: renderProps.params,
                    dispatch: store.dispatch,
                };

                trigger('fetch', renderProps.components, locals)
                    .then(() => {
                        // this renders layout.jade in views dir
                        res.render(
                            'layout',
                            Object.assign({
                                __pageContent: renderToString(
                                    <Provider store={store}>
                                        <RouterContext {...renderProps} />
                                    </Provider>
                                ),
                                __initialState: JSON.stringify(store.getState()),
                            }, {

                            })
                        );
                    })
                    .catch(next);

            } else {
                next();
            }
        });
    });
};