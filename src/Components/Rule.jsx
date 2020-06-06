import React, { Component } from 'react';

class Rule extends Component {
    constructor(props) {
        super(props);
    }
    handleBlur = (e) => {
        if (e.target.value) {
            this.props.ruleMethod(e.target.value);
        }
    }
    render() {
        return (
            <div className="rule">
                <span>{this.props.label}</span>
                <input type="number" onBlur={this.handleBlur} placeholder={this.props.defaultValue}></input>
            </div>
        )
    }
}

export default Rule;