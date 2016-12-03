import React, { Component } from 'react';
import {
    Alert,
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
    HelpBlock
} from 'react-bootstrap';

function FieldGroup({id, label, error, ...props}) {
    return (
        <FormGroup controlId={id} validationState={error ? 'error' : null}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {error && <HelpBlock>{error}</HelpBlock>}
        </FormGroup>
    );
}

const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {}
        };
    }

    handleOnInputChange(input, value) {
        console.log('input', input);
        console.log('value', value);
        this.setState({ [input]: value });
    }

    handleOnSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        let {username, password} = this.state;
        if (!this.validate()) {
            return;
        }
        this.props.onSubmitClick({ username, password });
        this.setState({ username: '', password: '', errors: {} });
    }

    validate() {
        let errors = {};
        let {username, password} = this.state;
        let userFieldRegexp = /^[a-zA-Z0-9_]{3,25}$/;

        if (!userFieldRegexp.test(username)) {
            errors.username = 'Username may only contain "a-z", "A-Z" or "_" and length must be from 3 to 25 characters.';
        }

        if (!userFieldRegexp.test(password)) {
            errors.password = 'Password may only contain "a-z", "A-Z" or "_" and length must be from 3 to 25 characters.';
        }

        this.setState({ errors });
        if (errors.username || errors.password) {
            return false;
        }
        return true;
    }

    render() {
        let {username, password, errors} = this.state;
        return (
            <div className="panel panel-default" style={wellStyles}>
                <div className="auth-form panel-body">
                    <div className="auth-form-header">
                        <h3>{this.props.formHeader}</h3>
                    </div>
                    <form onSubmit={e => this.handleOnSubmit(e)}>
                        <div className="auth-form-body">
                            <FieldGroup
                                id="formControlsUsername"
                                type="text"
                                label="Username"
                                placeholder="Enter username"
                                value={username}
                                error={errors.username}
                                onChange={e => this.handleOnInputChange('username', e.target.value)}
                                />
                            <FieldGroup
                                id="formControlsPassword"
                                label="Password"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                error={errors.password}
                                onChange={e => this.handleOnInputChange('password', e.target.value)}
                                />
                            {
                                this.props.error &&
                                <Alert bsStyle="danger">{this.props.error}</Alert>
                            }
                            <Button bsStyle="primary" type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UserForm;
