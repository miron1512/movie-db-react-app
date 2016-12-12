import React, { Component } from 'react';
import {
    Panel,
    Button,
    Media
} from 'react-bootstrap';

import RatingBlock from './RatingBlock';

import {
    BASE_IMAGE_URL,
    IMAGE_SIZES
} from '../constants/movieConstants';

const FavoriteButton = ({user, isFavorite, onButtonClick}) => {
    if (!user) {
        return (
            <Button bsStyle="primary" className="col-xs-12" disabled>Add to favorite</Button>
        );
    }

    return isFavorite
        ? <Button bsStyle="default" className="col-xs-12" onClick={() => onButtonClick(false)}>Delete from favorite</Button>
        : <Button bsStyle="primary" className="col-xs-12" onClick={() => onButtonClick(true)}>Add to favorite</Button>
}

class MoviePage extends Component {
    renderImages(images, className) {
        if (!images) return null
        return (
            <div className={images} style={{ 'overflowX': 'auto', 'whiteSpace': 'nowrap' }}>
                {images.map((v) => <img key={v.file_path} src={`${BASE_IMAGE_URL}${IMAGE_SIZES.MEDIUM}${v.file_path}`} />)}
            </div>
        )
    }

    render() {
        console.log('MoviePage', this.props.movie);
        let {basicInfo, images, userStates} = this.props;
        return (
            <div className="container">
                <Media>
                    <Media.Left className="media-left poster col-xs-12 col-sm-4 col-md-5">
                        {
                            basicInfo && basicInfo.poster_path
                                ? < img className="media-object img-responsive" src={`${BASE_IMAGE_URL}${IMAGE_SIZES.XMEDIUM}${basicInfo.poster_path}`} alt="PosterImage" />
                                : null
                        }
                        <FavoriteButton
                            user={this.props.isAuth}
                            isFavorite={userStates.favorite}
                            onButtonClick={(isFavorite) => this.props.onFavoriteButtonClick(isFavorite)}
                            />
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>{basicInfo.original_title}</Media.Heading>
                        <p>{basicInfo.overview}</p>
                        <RatingBlock />
                    </Media.Body>
                </Media>
                <Panel header="Backdrops" collapsible >
                    {this.renderImages(images.backdrops, 'backdrops')}
                </Panel>
                <Panel header="Posters" collapsible >
                    {this.renderImages(images.posters, 'posters')}
                </Panel>
            </div>
        );
    }
}

export default MoviePage;