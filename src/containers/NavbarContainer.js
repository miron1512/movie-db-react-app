import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

class NavbarContainer extends Component {
    render() {
        return (
            <div>
                <Navbar username={this.props.user.username} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(NavbarContainer);