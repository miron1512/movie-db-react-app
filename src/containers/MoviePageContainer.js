import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchMovie,
    fetchMovieVideos,
    fetchMovieImages,
    fetchMovieAltTitles,
    fetchMovieUserStates,
    markMovieAsFavorite
} from '../actions';
import MoviePage from '../components/MoviePage';

class MoviePageContainer extends Component {
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        const {id} = this.props.params;
        console.log('props', this.props);
        console.log('location', this.props.location);
        console.log('MoviePageContainer componentWillMount');
        this.fetchMovie(id);
    }

    componentWillReceiveProps(nextProps) {
        const newId = nextProps.params.id;
        if (this.props.params.id === newId) {
            return;
        }

        this.fetchMovie(newId);
    }

    fetchMovie(id) {
        this.props.fetchMovie(id);
        this.props.fetchMovieVideos(id);
        this.props.fetchMovieImages(id);
        this.props.fetchMovieAltTitles(id);
        this.props.fetchMovieUserStates(id);
    }

    handleFavoriteButton(isFavorite) {
        console.log('handleFavoriteButton', isFavorite);
        this.props.markMovieAsFavorite(this.props.params.id, isFavorite);
    }

    render() {
        const {images, basicInfo, userStates} = this.props.movie;
        const isAuth = !!this.props.user.username;

        console.log('MoviePageContainer', this.props.movie);
        return (
            <MoviePage
                images={images}
                basicInfo={basicInfo}
                isAuth={isAuth}
                userStates={userStates}
                onFavoriteButtonClick={(isFavorite) => this.handleFavoriteButton(isFavorite)}
                />
        );
    }
}

function mapStateToProps(state) {
    return {
        movie: state.movieInfo,
        user: state.user
    }
}

export default connect(mapStateToProps, {
    fetchMovie,
    fetchMovieVideos,
    fetchMovieImages,
    fetchMovieAltTitles,
    fetchMovieUserStates,
    markMovieAsFavorite
})(MoviePageContainer);