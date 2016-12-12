import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions';
import FilterTools from '../components/FilterTools';
import MovieList from '../components/MovieList';

class DiscoverMovieContainer extends Component {
    constructor(props) {
        super(props);

        this.query = {
            selectYear: 'All',
            selectSortOption: 0,
            sortAsc: false,
            page: 0
        }

        this.handlerClickFilterTools = this.handlerClickFilterTools.bind(this);
        this.handlerClickGetMore = this.handlerClickGetMore.bind(this);
    }


    componentWillMount() {
        console.log('DiscoverMovieContainer', this.props.movies);
        this.props.fetchMovies(this.query);
    }


    handlerClickFilterTools(query) {
        this.query = {...query, page: 0 };
        this.props.fetchMovies(this.query);
        console.log(this.query);
    }

    handlerClickGetMore() {
        this.query.page = this.props.movies.load_pages;
        this.props.fetchMovies(this.query);
        console.log(this.query);
    }

    render() {
        return (
            <div className="container">
                <FilterTools onFilterToolsClick={this.handlerClickFilterTools} />

                <MovieList movies={this.props.movies} onGetMoreClick={this.handlerClickGetMore} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps, { fetchMovies })(DiscoverMovieContainer);
