import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
    user: null
};

export default function (state = INITIAL_STATE, action) {
    console.log('reducer User state:', state);
    console.log('reducer User action:', action);
    switch (action.type) {
        case types.FETCH_AUTHED_USER:
        console.log('FETCH_AUTHED_USER');
            return { user: action.payload.data.username };
        default:
            return state;
    }
}