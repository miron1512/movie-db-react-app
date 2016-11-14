import axios from 'axios';
import * as types from '../constants/actionTypes';
import { LOCALSTORAGE_PATH } from '../constants/movieConstants';



function fetchAuthedUser(accessToken) {
    console.log('fetchAuthedUser accessToken:', accessToken);

    // const request = axios.get(`/api/me?token=${accessToken}`)
    //     .then(response => {
    //         console.log('fetchAuthedUser', response);
    //         if (response.data.success) {
    //             return {
    //                 type: types.FETCH_AUTHED_USER,
    //                 payload: response
    //             };
    //         }
    //     });

    return axios.post('/api/me', {
        token: accessToken
    });
}

export function initAuth() {
    const accessToken = localStorage.getItem(LOCALSTORAGE_PATH);
    if (accessToken) {
        return fetchAuthedUser(accessToken);
    }
    return { type: 'qwe' };
}

export function loginUser(username, password) {
    // const request = axios.post('/api/authenticate', {
    //     username,
    //     password
    // })
    //     .then(response => {
    //         console.log('loginUser', response);
    //         if (response.data.success) {
    //             localStorage.setItem(LOCALSTORAGE_PATH, response.data.token);
    //             console.log('localStorage', localStorage.getItem(LOCALSTORAGE_PATH));
    //             return { type: types.FETCH_AUTHED_USER, payload: response.data.user };
    //         }
    //     });
    const request = axios.post('/api/authenticate', {
        username,
        password
    });
    return {
        type: types.FETCH_AUTHED_USER,
        payload: request
    };
}


export function logoutUser() {

}