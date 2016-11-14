import React, {Component} from 'react';

class CollapseBlock extends Component {
    constructor(props) {
        super(props);

        console.log('defaultExpanded', this.props.defaultExpanded);
        console.log('className', this.props.className);
        this.state = {
            expanded: this.props.defaultExpanded || false
        }

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const {expanded} = this.state;
        const customClass = this.props.className || 'collapse-block';
        return (
            <div className={`panel panel-default ${customClass}-panel-default`}>
                <div className={`panel-heading ${customClass}-panel-heading`}>
                    <h3 className={`panel-title ${customClass}-panel-title`} onClick={this.handleOnClick}>
                        { this.props.title }
                    </h3>
                </div>
                <div
                    className={`panel-body ${customClass}-panel-body collapse ${expanded ? 'in' : ''}`}
                    style={{ 'height': expanded ? '150px':'0px' , 'background': '#690268' }}
                    aria-hidden={!expanded}
                    >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default CollapseBlock;