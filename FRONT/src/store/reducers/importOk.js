/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import * as actions from '../actions';

const initialState = false;

export function importOkReducer(state = initialState, action) {
    switch (action.type) {
    case actions.importIsOk:
        return true;
    default:
        return state;
    }
}
