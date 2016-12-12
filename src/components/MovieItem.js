import React from 'react';
import { Link } from 'react-router'

const MovieItem = ({movie}) => {
    const releaseYear = movie.release_date
        && (<small>({(new Date(movie.release_date)).getFullYear()}) </small>);
    return (
        <Link className='list-group-item' to={`/movie/${movie.id}`}>
            <div className="media">
                <div className="media-left">
                    <img className="media-object" src={movie.poster_path} />
                </div>
                <div className="media-body">
                    <h4 className="media-heading">
                        {movie.title} {' '} {releaseYear}
                    </h4>
                </div>
            </div>
        </Link>
    );
};

export default MovieItem;