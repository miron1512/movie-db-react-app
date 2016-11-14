import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import DiscoverMovieContainer from './containers/DiscoverMovieContainer';
import MoviePageContainer from './containers/MoviePageContainer';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={DiscoverMovieContainer} />
        <Route path='movie/:id' component={MoviePageContainer} />
    </Route>
);