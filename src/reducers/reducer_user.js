import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
    username: null,
    error: null
};

export default function (state = INITIAL_STATE, action) {
    console.log('reducer User state:', state);
    console.log('reducer User action:', action);
    switch (action.type) {
        case types.LOGIN_USER_SUCCESS:
            console.log('LOGIN_USER_SUCCESS');
            return { username: action.payload, error: null };
        case types.LOGIN_USER_ERROR:
        case types.SIGNUP_USER_ERROR:
            console.log('LOGIN_USER_ERROR/SIGNUP_USER_ERROR');
            return { username: null, error: action.payload };
        case types.LOGOUT_USER:
            console.log('LOGOUT_USER');
            return { username: null, error: null };
        default:
            return state;
    }
}