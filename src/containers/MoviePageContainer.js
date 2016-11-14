import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchMovie,
    fetchMovieVideos,
    fetchMovieImages,
    fetchMovieAltTitles
} from '../actions';
import MoviePage from '../components/MoviePage';

class MoviePageContainer extends Component {
    constructor(props) {
        super(props);

        this.id = props.params.id;
    }


    componentWillMount() {
        const {id} = this.props.params;
        console.log('props', this.props);
        console.log('location', this.props.location);
        console.log('MoviePageContainer componentWillMount');
        this.props.fetchMovie(id);
        this.props.fetchMovieVideos(id);
        this.props.fetchMovieImages(id);
        this.props.fetchMovieAltTitles(id);
    }

    componentWillReceiveProps(nextProps) {
        const newId = nextProps.params.id;
        if (this.props.params.id === newId) {
            return;
        }

        this.props.fetchMovie(newId);
        this.props.fetchMovieVideos(newId);
        this.props.fetchMovieImages(newId);
        this.props.fetchMovieAltTitles(newId);
    }


    render() {
        const {images, basicInfo} = this.props.movie;
        
        console.log('MoviePageContainer', this.props.movie);
        return (
            <MoviePage images={images} basicInfo={basicInfo} />
        );
    }
}

function mapStateToProps(state) {
    return {
        movie: state.movieInfo
    }
}

export default connect(mapStateToProps, { fetchMovie, fetchMovieVideos, fetchMovieImages, fetchMovieAltTitles })(MoviePageContainer);