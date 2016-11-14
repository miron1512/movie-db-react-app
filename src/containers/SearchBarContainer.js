import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchMovie } from '../actions';
import SearchBar from '../components/SearchBar';

class SearchBarContainer extends Component {
    constructor(props) {
        super(props);

        this.handleOnInputChange = this.handleOnInputChange.bind(this);
    }

    handleOnInputChange(query) {
        console.log('SearchBarContainer handleOnInputChange', query);
        this.props.searchMovie(query);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
    }

    modifyData() {
        const BASE_URL = 'https://image.tmdb.org/t/p/';
        const POSTER_SIZES = ["w92", "w154", "w185", "w342", "w500", "w780", "original"];

        return this.props.results.map((movie) => {
            movie.poster_path = movie.poster_path ? `${BASE_URL}${POSTER_SIZES[0]}${movie.poster_path}` : ''
            return movie;
        })
    }

    render() {
        return (
            <div className="container">
                <SearchBar
                    onInputChange={value => this.handleOnInputChange(value)}
                    searchResults={this.modifyData()}
                    />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.movies.search_result
    };
}

export default connect(mapStateToProps, { searchMovie })(SearchBarContainer);