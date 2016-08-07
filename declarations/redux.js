declare type Thunk = (dispatch: Function, getState: Function, api: Object) => Promise;

declare type Action = {
    type: string,
    payload?: any,
    error?: bool
}

