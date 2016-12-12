import * as types from '../constants/actionTypes';

const INITIAL_STATE = { all: [], load_pages: 0, search_result: [], favorite_list: {} };

function clearExtraData(arr) {
    return arr.map(({id, title, poster_path, release_date}) => { return { id, title, poster_path, release_date } })
}

export default function (state = INITIAL_STATE, action) {
    console.log('reducer state:', state);
    console.log('reducer action:', action);
    switch (action.type) {
        case types.FETCH_MOVIES:
            if (!action.payload.data) {
                console.log('reducer no data');
                return {...state };
            }
            if (action.payload.data.page > 1) {
                console.log('reducer add data');
                return {...state, all: [...state.all, ...(clearExtraData(action.payload.data.results))], load_pages: action.payload.data.page };
            }
            console.log('reducer new data');
            return {...state, all: clearExtraData(action.payload.data.results), load_pages: action.payload.data.page };

        case types.SEARCH_MOVIE:
            if (action.payload.data)
                return {...state, search_result: clearExtraData(action.payload.data.results) };
            return {...state, search_result: [] }

        case types.FETCH_FAVORITE_MOVIES:
            let {page, results, total_pages, total_results} = action.payload;
            let list = { page, total_pages, total_results, results: clearExtraData(results) }
            return {...state, favorite_list: list };

        default:
            return state;
    }
}