import React, { Component } from 'react';

export default class SortByButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortAsc: !(props.defaultDesc || false)
        }

        this.handlerClickButton = this.handlerClickButton.bind(this);
    }

    handlerClickButton() {
        this.setState({ sortAsc: !this.state.sortAsc }, () => { this.props.onSortByButtonClick(this.state.sortAsc) });
    }

    render() {
        return (
            <div className="btn btn-primary" onClick={this.handlerClickButton} >
                <span className={`glyphicon glyphicon-sort-by-attributes${this.state.sortAsc ? '' : '-alt'}`}></span>
            </div>
        );
    }
}