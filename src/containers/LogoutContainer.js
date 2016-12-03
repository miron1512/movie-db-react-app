import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logoutUser } from '../actions/user';

const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

class LogoutContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.checkUser(this.props);
    }

    checkUser(props) {
        if (!props.user.username) {
            browserHistory.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.checkUser(nextProps);
    }


    handleOnLogoutClick() {
        this.props.logoutUser();
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default" style={wellStyles}>
                    <div className="panel-body">
                        <h3 className="text-center">Are you sure you want to sign out?</h3>
                        <button type="button" className="btn btn-default btn-lg btn-block" onClick={() => this.handleOnLogoutClick()}>Sign out</button>
                    </div>
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { logoutUser })(LogoutContainer);