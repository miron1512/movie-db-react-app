import React, { Component } from 'react';
import {
    ButtonToolbar,
    ButtonGroup,
    MenuItem,
    DropdownButton
} from 'react-bootstrap';

import SortByButton from '../components/SortByButton';
import { SORT_BY } from '../constants/movieConstants';

class FilterTools extends Component {
    constructor(props) {
        super(props);

        this.SORT_BY = SORT_BY.map(v => v.replace('_', '#'));

        this.state = {
            selectYear: 'All',
            selectSortOption: 0,
            sortAsc: false,

        };

        this.handlerClickSearchByButton = this.handlerClickSearchByButton.bind(this);
        this.handlerClickYearDropdown = this.handlerClickYearDropdown.bind(this);
        this.handlerClickSortByDropdown = this.handlerClickSortByDropdown.bind(this);
    }

    renderYearsDropdown() {
        const YEAR = (new Date()).getYear();
        let YEARS = Array(YEAR + 1).fill(1900 + YEAR).map((val, i) => (val - i).toString());
        YEARS.unshift('All');
        return (
            YEARS.map(year => <MenuItem eventKey={year} key={year}>{year}</MenuItem>)
        )
    }

    renderSortDropdown() {
        return (
            this.SORT_BY.map((option, i) => <MenuItem eventKey={i} key={i}>{option}</MenuItem>)
        )
    }

    handlerClickSearchByButton(sortAsc) {
        this.setState({ sortAsc }, () => { this.combineQuery(this.state) });
    }

    handlerClickYearDropdown(eventKey) {
        this.setState({ selectYear: eventKey }, () => { this.combineQuery(this.state) });
    }

    handlerClickSortByDropdown(eventKey) {
        this.setState({ selectSortOption: eventKey }, () => { this.combineQuery(this.state) });
    }

    combineQuery({sortAsc, selectYear, selectSortOption}) {
        this.props.onFilterToolsClick(
            { sortAsc, selectYear, selectSortOption }
        );
    }

    render() {
        const {sortAsc, selectYear, selectSortOption} = this.state;
        return (
            <div>
                <ButtonToolbar>
                    <DropdownButton className='myclass' title={selectYear} id="dropdown-years" onSelect={this.handlerClickYearDropdown}>
                        {this.renderYearsDropdown()}
                    </DropdownButton>

                    <ButtonGroup>
                        <DropdownButton className='myclass' title={this.SORT_BY[selectSortOption]} id="dropdown-sort-by" onSelect={this.handlerClickSortByDropdown}>
                            {this.renderSortDropdown()}
                        </DropdownButton>

                        <SortByButton onSortByButtonClick={this.handlerClickSearchByButton} defaultDesc={!sortAsc} />
                    </ButtonGroup>

                </ButtonToolbar>
            </div>
        );
    }
}

export default FilterTools