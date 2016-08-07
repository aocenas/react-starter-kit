// @flow
const {actionFactory} = require('../utils');

const getDataAction = actionFactory('DATA_GET_DATA');

export function getData (): Thunk {
    return (dispatch, getState, api) => {
        return api
            .getData()
            .then(res => {
                return dispatch(getDataAction(res.data));
            });
    };
}
