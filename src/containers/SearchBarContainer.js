import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { searchMovie } from '../actions';
import SearchBar from '../components/SearchBar';
import {
    BASE_IMAGE_URL,
    IMAGE_SIZES
} from '../constants/movieConstants';

class SearchBarContainer extends Component {
    constructor(props) {
        super(props);


        this.state = { searchRequest: '' };
        this.list = [];

        browserHistory.listen(location => {
            this.pathChanged(location);
        });

        this.handleOnInputChange = this.handleOnInputChange.bind(this);

    }

    pathChanged(location) {
        this.handleOnInputChange('');
    }

    handleOnInputChange(query) {
        console.log('SearchBarContainer handleOnInputChange', query);
        this.setState({ searchRequest: query }, () => {
            this.props.searchMovie(query);
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('SearchBarContainer componentWillReceiveProps', nextProps);
        let {results} = nextProps;
        if (results) {
            this.list = this.modifyData(results);
        }
    }

    modifyData(list) {
        return list.map((movie) => {
            let poster_path = movie.poster_path ? `${BASE_IMAGE_URL}${IMAGE_SIZES.XSMALL}${movie.poster_path}` : '';
            return Object.assign({}, movie, { poster_path });
        });
    }

    render() {
        return (
            <div className="container">
                <SearchBar
                    value={this.state.searchRequest}
                    onInputChange={value => this.handleOnInputChange(value)}
                    searchResults={this.list}
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