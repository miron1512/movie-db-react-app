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
        let {basicInfo, images} = this.props;
        return (
            <div className="container">
                <Media>
                    <Media.Left className="media-left poster col-xs-12 col-sm-4 col-md-5">
                        {
                            basicInfo && basicInfo.poster_path
                                ? < img className="media-object img-responsive" src={`${BASE_IMAGE_URL}${IMAGE_SIZES.XMEDIUM}${basicInfo.poster_path}`} alt="PosterImage" />
                                : null
                        }
                        <Button bsStyle="primary" className="col-xs-12">Add to favorite</Button>
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