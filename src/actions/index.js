import axios from 'axios';
import * as types from '../constants/actionTypes';
import {
    SORT_BY,
    LOCALSTORAGE_PATH,
    API_KEY,
    DISCOVER_BASE_URL,
    MOVIE_BASE_URL,
    SEARCH_URL
} from '../constants/movieConstants';

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

const fetchMovieUserFavoriteSuccess = (response) => {
    return {
        type: types.FETCH_MOVIE_USER_FAVORITE,
        payload: response
    };
};

const fetchMovieUserRatingSuccess = (response) => {
    return {
        type: types.FETCH_MOVIE_USER_RATING,
        payload: response
    };
};

export function fetchMovieUserStates(id) {
    return dispatch => {
        const token = localStorage.getItem(LOCALSTORAGE_PATH);
        if (!token) {
            return;
        }

        axios.get(`/api/movie/${id}/account_states?token=${token}`)
            .then(response => {
                if (response.data.success) {
                    console.log('fetchMovieUserStates response', response);
                    dispatch(fetchMovieUserFavoriteSuccess(response.data.favorite));
                    dispatch(fetchMovieUserRatingSuccess(response.data.rating));
                }
            })
            .catch(error => {
                throw (error);
            });
    }
}

export function markMovieAsFavorite(id, favorite) {
    console.log('markMovieAsFavorite id:', id, 'favorite:', favorite);
    return dispatch => {
        const token = localStorage.getItem(LOCALSTORAGE_PATH);
        if (!token) {
            return;
        }

        axios.post(`/api/user/favorite`, {
            token,
            movieId: id,
            favorite
        })
            .then(response => {
                if (response.data.success) {
                    console.log('markMovieAsFavorite response', response);
                    dispatch(fetchMovieUserFavoriteSuccess(response.data.favorite));
                }
            })
            .catch(error => {
                throw (error);
            });
    }
}

const fetchFavoriteMoviesSuccess = (response) => {
    return {
        type: types.FETCH_FAVORITE_MOVIES,
        payload: response
    };
};

export function fetchFavoriteMovies(page) {
    return dispatch => {
        const token = localStorage.getItem(LOCALSTORAGE_PATH);
        if (!token) {
            return;
        }

        let total_pages, total_results;
        axios.get(`/api/user/favorite?page=${page}&token=${token}`)
            .then(response => {
                console.log('fetchFavoriteMovies response', response);
                if (!response.data.success) {
                    console.log('fetchFavoriteMovies response', response);
                }
                total_pages = response.data.total_pages;
                total_results = response.data.total_results;
                return Promise.resolve(response.data.results.map(id => axios.get(`${MOVIE_BASE_URL}/${id}?api_key=${API_KEY}`)))
            })
            .then(promises => {
                console.log('fetchFavoriteMovies promises', promises);
                return Promise.resolve(Promise.all(promises))
            })
            .then(results => {
                console.log('fetchFavoriteMovies results', results);
                console.log('fetchFavoriteMovies newResults', results.map(v => v.data));
                dispatch(fetchFavoriteMoviesSuccess({
                    page,
                    results: results.map(v => v.data),
                    total_pages,
                    total_results
                }));

            })
            .catch(error => {
                throw (error);
            });
    }
}