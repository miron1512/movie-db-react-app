import React, { Component } from 'react';
import Rating from 'react-rating';

class RatingBlock extends Component {
    render() {
        return (
            <div>
                <Rating readonly />
            </div>
        );
    }
}

export default RatingBlock;