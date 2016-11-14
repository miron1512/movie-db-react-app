import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBarContainer from './SearchBarContainer';
import { loginUser, initAuth } from '../actions/user';

class App extends Component {

  componentWillMount() {
    console.log('App this.props', this.props);
    // this.props.loginUser('user1', 'user1');
    //this.props.initAuth();
  }

  componentWillReceiveProps(nextProps) {

  }



  render() {
    return (
      <div>
        <SearchBarContainer />
        {this.props.children}
      </div>
    );
  }
}

// function mapStateToProps(state) {
//     return {
//         user: state.user
//     }
// }

export default connect(null, { initAuth, loginUser })(App);
