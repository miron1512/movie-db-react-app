import React, { Component } from 'react';
import { Link } from 'react-router'
import MovieItem from './MovieItem';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(term) {
        this.setState({ term });
        this.props.onInputChange(term);
    }

    // renderMovieItem(movie) {
    //     const releaseYear = movie.release_date
    //         ? (<small>({(new Date(movie.release_date)).getFullYear()}) </small>)
    //         : '';
    //     return (
    //         <Link className='list-group-item' key={movie.id} to={`/movie/${movie.id}`}>
    //             <div className="media">
    //                 <div className="media-left">
    //                     <img className="media-object" src={movie.poster_path} />

    //                 </div>
    //                 <div className="media-body">
    //                     <h4 className="media-heading">
    //                         {movie.title} {' '} {releaseYear}
    //                     </h4>
    //                 </div>
    //             </div>
    //         </Link>
    //     );
    // }

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
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)}
                    />
                <span className="form-control-feedback glyphicon glyphicon-search" />
                {this.props.searchResults.length > 0 ? this.renderSearchResults() : ''}
            </div>
        );
    }
}

export default SearchBar;