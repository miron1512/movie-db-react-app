import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchFavoriteMovies } from '../actions';
import MovieItem from '../components/MovieItem';
import {
    BASE_IMAGE_URL,
    IMAGE_SIZES,
    LOCALSTORAGE_PATH
} from '../constants/movieConstants';

class FavoriteMoviesContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.checkUser();
        this.props.fetchFavoriteMovies()
    }

    checkUser() {
        let token = localStorage.getItem(LOCALSTORAGE_PATH);
        console.log('FavoriteMoviesContainer token', token);
        if (!token) {
            browserHistory.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.checkUser();
        let {favorite_list} = nextProps.movies;
        if (JSON.stringify(favorite_list) == JSON.stringify(this.props.movies.favorite_list)) {
            return;
        }
        if (favorite_list.results) {
            this.list = this.modifyData(favorite_list.results);
        }
    }

    modifyData(list) {
        return list.map((movie) => {
            movie.poster_path = movie.poster_path ? `${BASE_IMAGE_URL}${IMAGE_SIZES.SMALL}${movie.poster_path}` : ''
            return movie;
        });
    }

    renderList() {
        if (!this.list || this.list.length == 0) {
            return <p>List is empty</p>
        }
        return (
            <div id="favorite-results" className="list-group">
                {
                    this.list.map((movie) => {
                        return <MovieItem key={movie.id} movie={movie} />
                    })
                }
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <h1>My favorite movies</h1>
                {
                    this.renderList()
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        movies: state.movies,
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchFavoriteMovies })(FavoriteMoviesContainer);