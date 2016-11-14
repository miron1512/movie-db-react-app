import { combineReducers } from 'redux';
import MoviesReducer from './reducer_movies';
import MovieInfoReducer from './reducer_movie_info';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
  movies: MoviesReducer,
  movieInfo: MovieInfoReducer,
  user: UserReducer
});

export default rootReducer;
