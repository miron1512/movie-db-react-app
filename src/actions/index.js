import axios from 'axios';
import * as types from '../constants/actionTypes';
import { SORT_BY } from '../constants/movieConstants';

const API_KEY = '696f3e52c68040e7494e899843a4339a';
const POPULAR_MOVIES_REQUEST = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
const DISCOVER_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/movie';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?';

const fetchMoviesSuccess = (response) => {
    return {
        type: types.FETCH_MOVIES,
        payload: response
    };
};

export function fetchMovies(query) {
    console.log('fetchMovies query:', query);
    console.log('SORT_BY:', SORT_BY);
    let query_url = ''
        + (query.selectYear === 'All' ? '' : `&year=${query.selectYear}`)
        + `&sort_by=${SORT_BY[query.selectSortOption]}.${query.sortAsc ? 'asc' : 'desc'}`
        + `&page=${query.page + 1}`;



    console.log('fetchMovies query_url:', query_url);
    console.log('fetchMovies request:', `${DISCOVER_BASE_URL}?api_key=${API_KEY}${query_url}`);

    return dispatch => {
        axios.get(`${DISCOVER_BASE_URL}?api_key=${API_KEY}${query_url}`)
            .then(response => {
                dispatch(fetchMoviesSuccess(response));
            })
            .catch(error => {
                throw (error);
            });
    };
};

const searchMovieSuccess = (response) => {
    return {
        type: types.SEARCH_MOVIE,
        payload: response
    };
};

export function searchMovie(query) {
    return dispatch => {
        query = query.trim();
        if (query === '') {
            return dispatch(searchMovieSuccess({}));
        }
        axios.get(`${SEARCH_URL}&page=1&api_key=${API_KEY}&query=${query}`)
            .then(response => {
                dispatch(searchMovieSuccess(response));
            })
            .catch(error => {
                throw (error);
            });

    };
};

const fetchMovieSuccess = (response) => {
    return {
        type: types.FETCH_MOVIE_BASIC_INFO,
        payload: response
    };
};

export function fetchMovie(id) {
    console.log('fetchMovie request:', `${MOVIE_BASE_URL} / ${id}?api_key=${API_KEY}`);
    return dispatch => {
        axios.get(`${MOVIE_BASE_URL}/${id}?api_key=${API_KEY}`)
            .then(response => {
                dispatch(fetchMovieSuccess(response));
            })
            .catch(error => {
                throw (error);
            })
    };
};

const fetchMovieVideosSuccess = (response) => {
    return {
        type: types.FETCH_MOVIE_VIDEOS,
        payload: response
    };
};

export function fetchMovieVideos(id) {
    console.log('fetchMovieVideos request:', `${MOVIE_BASE_URL}/${id}/videos?api_key=${API_KEY}`);
    return dispatch => {
        axios.get(`${MOVIE_BASE_URL}/${id}/videos?api_key=${API_KEY}`)
            .then(response => {
                dispatch(fetchMovieVideosSuccess(response));
            })
            .catch(error => {
                throw (error);
            });
    };
};

const fetchMovieImagesSuccess = (response) => {
    return {
        type: types.FETCH_MOVIE_IMAGES,
        payload: response
    };
};

export function fetchMovieImages(id) {
    console.log('fetchMovieImages request:', `${MOVIE_BASE_URL}/${id}/images?api_key=${API_KEY}`);
    return dispatch => {
        axios.get(`${MOVIE_BASE_URL}/${id}/images?api_key=${API_KEY}`)
            .then(response => {
                dispatch(fetchMovieImagesSuccess(response));
            })
            .catch(error => {
                throw (error);
            });
    };
};

const fetchMovieAltTitlesSuccess = (response) => {
    return {
        type: types.FETCH_MOVIE_ALT_TITLES,
        payload: response
    };
};

export function fetchMovieAltTitles(id) {

    console.log('fetchMovieAltTitles request:', `${MOVIE_BASE_URL}/${id}/alternative_titles?api_key=${API_KEY}`);

    return dispatch => {
        axios.get(`${MOVIE_BASE_URL}/${id}/alternative_titles?api_key=${API_KEY}`)
            .then(response => {
                dispatch(fetchMovieAltTitlesSuccess(response));
            })
            .catch(error => {
                throw (error);
            });
    };
};