import React, { Component } from 'react';
import { Link } from 'react-router'
import {
    BASE_IMAGE_URL,
    IMAGE_SIZES
} from '../constants/movieConstants';

class MovieList extends Component {
    constructor(props) {
        super(props);

        this.handlerClickButton = this.handlerClickButton.bind(this);
    }

    handlerClickButton() {
        this.props.onGetMoreClick()
    }

    renderList() {
        // if (this.props.movies.load_pages < 2)
        //     this.props.fetchMovies(this.props.movies.load_pages + 1);
        console.log(this.props.movies);
        // if (!this.props.movies.load_pages)
        //     return ''
        return this.props.movies.all.map((movie) => {
            console.log(movie);
            const img_src = movie.poster_path ? `${BASE_IMAGE_URL}${IMAGE_SIZES.MEDIUM}${movie.poster_path}` : '';
            return (
                <div className='movie-item' key={movie.id}>
                    <Link to={`/movie/${movie.id}`}><img src={img_src} /></Link>
                </div>
            )
        });
    }

    render() {
        return (
            <div className='movie-list' >
                {
                    this.renderList()
                }
                <button className='btn btn-primary col-xs-12' onClick={this.handlerClickButton}>Get More</button>
            </div>
        );
    }
}

export default MovieList;