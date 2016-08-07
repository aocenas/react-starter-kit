// @flow

/**
 * Creates function that creates actions, so you only have to supply payload and type and error property are handled
 * for you.
 * @param name
 * @returns {function(any)}
 */
export function actionFactory(name: string) {
    return (payload?: any): Action => {
        let action: Action = {
            type: name,
            payload,
        };

        if (payload instanceof Error) {
            action.error = true;
        }
        return action;
    };
}


/**
 * From http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 * @param initialState
 * @param handlers
 * @returns {reducer}
 */
export function createReducer(initialState: any, handlers: Object) {
    return function reducer(state: any = initialState, action: Action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}



