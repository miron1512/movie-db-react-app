import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import DiscoverMovieContainer from './containers/DiscoverMovieContainer';
import MoviePageContainer from './containers/MoviePageContainer';
import SignContainer from './containers/SignContainer';
import LogoutContainer from './containers/LogoutContainer';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={DiscoverMovieContainer} />
        <Route path='movie/:id' component={MoviePageContainer} />
        <Route path='login' component={SignContainer} />
        <Route path='signup' component={SignContainer} />
        <Route path='logout' component={LogoutContainer} />
    </Route>
);