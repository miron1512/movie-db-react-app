import React from 'react';
import {
    Navbar,
    Nav,
} from 'react-bootstrap';

import { Link } from 'react-router';

const MyLink = (props) => {
    let {children, to, className} = props;
    return (
        <Link to={to} className={className} >{children}</Link>
    );
};

const renderUserNav = (user) => {
    if (user) {
        return (
            <Nav pullRight>
                <MyLink className="btn navbar-btn" to="/myfavorites">{user}</MyLink>
                <MyLink className="btn btn-default navbar-btn" to="/logout">Log out</MyLink>
            </Nav>
        );
    }
    return (
        <Nav pullRight>
            <MyLink className="btn btn-default navbar-btn" to="/login">Log in</MyLink>
            <MyLink className="btn btn-success navbar-btn" to="/signup">Sign up</MyLink>
        </Nav>
    );
};

const MyNavbar = (props) => {
    return (
        <div>
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">movie-db-react-app</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {renderUserNav(props.username)}
                </Navbar.Collapse>
            </Navbar>
        </div >
    );
};

export default MyNavbar;
