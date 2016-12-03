import axios from 'axios';
import * as types from '../constants/actionTypes';
import { LOCALSTORAGE_PATH } from '../constants/movieConstants';

const loginUserSuccess = (response) => {
    return {
        type: types.LOGIN_USER_SUCCESS,
        payload: response
    };
};

const loginUserError = (response) => {
    return {
        type: types.LOGIN_USER_ERROR,
        payload: response
    };
};

const signupUserError = (response) => {
    return {
        type: types.SIGNUP_USER_ERROR,
        payload: response
    };
};

export function initAuth() {
    return dispatch => {
        const accessToken = localStorage.getItem(LOCALSTORAGE_PATH);
        if (!accessToken) {
            return;
        }
        axios.get(`/api/me?token=${accessToken}`)
            .then(response => {
                console.log('initAuth', response);
                if (response.data.success) {
                    dispatch(loginUserSuccess(response.data.username));
                }
                else {
                    localStorage.removeItem(LOCALSTORAGE_PATH);
                }
            });
    }
}

export function loginUser(username, password) {
    console.log('loginUser', username, password);
    return dispatch => {
        axios.post('/api/authenticate', {
            username,
            password
        })
            .then(response => {
                if (response.data.success) {
                    console.log('loginUserSuccess response', response);
                    localStorage.setItem(LOCALSTORAGE_PATH, response.data.token);
                    return dispatch(loginUserSuccess(response.data.username));
                }

                console.log('loginUserError response', response);
                dispatch(loginUserError(response.data.message));

            })
            .catch(error => {
                console.log('loginUserError catch error', error);
                dispatch(loginUserError(error.message));
            });
    };
}

export function logoutUser() {
    localStorage.removeItem(LOCALSTORAGE_PATH);
    return {
        type: types.LOGOUT_USER
    }
}

export function signupUser(username, password) {
    console.log('signupUser', username, password);
    return dispatch => {
        axios.post('/api/signup', {
            username,
            password
        })
            .then(response => {
                if (!response.data.success) {
                    console.log('signupUserError response', response);
                    return dispatch(signupUserError(response.data.message));
                }

                dispatch(loginUser(username, password));
            })
            .catch(error => {
                console.log('signupUserError catch error', error);
                dispatch(signupUserError(error.message));
            });
    };
}