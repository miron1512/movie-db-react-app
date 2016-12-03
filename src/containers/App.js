import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBarContainer from './SearchBarContainer';
import NavbarContainer from './NavbarContainer';
import { initAuth } from '../actions/user';

class App extends Component {
  componentWillMount() {
    console.log('App this.props', this.props);
    this.props.initAuth();
  }

  render() {
    return (
      <div>
        <NavbarContainer />
        <SearchBarContainer />
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, { initAuth })(App);
