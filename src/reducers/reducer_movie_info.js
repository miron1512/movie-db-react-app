import * as types from '../constants/actionTypes';

const INITIAL_STATE = { basicInfo: {}, videos: [], images: {}, altTitles: [], userStates: {} };

export default function (state = INITIAL_STATE, action) {
    // console.log('reducer MovieInfo state:', state);
    // console.log('reducer MovieInfo action:', action);
    let newState;
    switch (action.type) {
        case types.FETCH_MOVIE_BASIC_INFO:
            console.log('FETCH_MOVIE_BASIC_INFO', action.payload.data);
            return {...state, basicInfo: action.payload.data };
        case types.FETCH_MOVIE_ALT_TITLES:
            console.log('FETCH_MOVIE_ALT_TITLES', action.payload.data);
            return {...state, altTitles: action.payload.data.titles };
        case types.FETCH_MOVIE_VIDEOS:
            console.log('FETCH_MOVIE_VIDEOS', action.payload.data);
            return {...state, videos: action.payload.data.results };
        case types.FETCH_MOVIE_IMAGES:
            console.log('FETCH_MOVIE_IMAGES', action.payload.data);
            return {...state, images: action.payload.data };
        case types.FETCH_MOVIE_USER_FAVORITE:
            newState = {...state };
            newState.userStates.favorite = action.payload;
            return newState;
        case types.FETCH_MOVIE_USER_RATING:
            newState = {...state };
            newState.userStates.rating = action.payload;
            return newState;
        default:
            return state;
    }
}