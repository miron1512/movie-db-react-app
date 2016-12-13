import React, { Component } from 'react';
import { Link } from 'react-router'
import MovieItem from './MovieItem';

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    renderSearchResults() {
        return (
            <div id="search-results" className="list-group">
                {
                    this.props.searchResults.map((movie) => {
                        return <MovieItem key={movie.id} movie={movie} />
                    })
                }
            </div>
        );
    }

    render() {
        return (
            <div className="has-feedback has-feedback-left">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={this.props.value}
                    onChange={event => this.props.onInputChange(event.target.value)}
                    />
                <span className="form-control-feedback glyphicon glyphicon-search" />
                {this.props.searchResults.length > 0 ? this.renderSearchResults() : ''}
            </div>
        );
    }
}

export default SearchBar;