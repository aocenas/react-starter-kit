// @flow
const _ = require('lodash');
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import dataReducer from './data/dataReducer';

export default (initialState: Object, api: Object) => {

    const rootReducer = combineReducers({
        data: dataReducer,
        // TODO: add reducers here
    });
    const args = [rootReducer];

    // if we put initial state as null, our defaults in reducers would be overwritten
    if (initialState) {
        args.push(initialState);
    }

    // construct middlewares, redux does not take very well null values so we remove null values with _.compact
    const middlewares = _.compact([
        thunkMiddleware.withExtraArgument(api),
        process.env.NODE_ENV == 'development' ? createLogger({collapsed: true}): null,
    ]);

    args.push(applyMiddleware.apply(null, middlewares));
    return createStore.apply(null, args);
};
