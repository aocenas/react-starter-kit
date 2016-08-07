// @flow
import {createReducer} from '../utils';

const defaultState = {};

export default createReducer(defaultState, {
    'DATA_GET_DATA': (state, action) => {
        return {
            ...state,
            data: action.payload,
        };
    },
});

