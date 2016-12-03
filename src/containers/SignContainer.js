import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loginUser, signupUser } from '../actions/user';
import UserForm from '../components/UserForm';

class SignContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.checkUser(props);
        this.detectRoutePath(props);
    }

    detectRoutePath(props) {
        switch (props.route.path) {
            case 'login':
                this.formHeader = 'Sign in';
                break;
            case 'signup':
                this.formHeader = 'Sign up';
                break;
        }
    }

    checkUser(props) {
        if (props.user.username) {
            browserHistory.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.checkUser(nextProps);
        this.detectRoutePath(nextProps);
    }

    handleOnSubmitClick(params) {
        switch (this.props.route.path) {
            case 'login':
                this.props.loginUser(params.username, params.password);
                break;
            case 'signup':
                this.props.signupUser(params.username, params.password);
                break;
        }
    }

    render() {
        return (
            <div className="container">
                <UserForm formHeader={this.formHeader} onSubmitClick={param => this.handleOnSubmitClick(param)} error={this.props.user.error} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { loginUser, signupUser })(SignContainer);