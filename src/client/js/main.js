// @flow
/* global window, document */

declare var $: any;

// setup bluebird as global Promise
const Bluebird = require('bluebird');
Bluebird.config({
    cancellation: true,
});
window.Promise = Bluebird;

const axios = require('axios');
const React = require('react');
const {render} = require('react-dom');
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {trigger} from 'redial';


import routes from '../../config/reactRoutes';
import configureStore from '../../redux/configureStore';
import apiFactory from '../../redux/apiFactory';


$(() => {
    'use strict';

    const initialState = window.__initialState;

    // create api with bound csrf token
    const api = apiFactory(
        axios.create({
            baseURL: '/api/v0',
            headers: {
                'x-csrf-token': $('head meta[name="csrf-token"]').attr('content'),
            },
        })
    );
    const store = configureStore(initialState, api);

    // see https://github.com/markdalgleish/redial/issues/34
    function routerOnUpdate() {
        const {components, location, params} = this.state;
        const locals = {
            path: location.pathname,
            query: location.query,
            params,
            dispatch: store.dispatch,
        };
        trigger('fetch', components, locals);
    }

    render(
        <Provider store={store}>
            <Router
                history={browserHistory}
                onUpdate={routerOnUpdate}
            >
                {routes}
            </Router>
        </Provider>,
        document.getElementById('app-root')
    );
});
