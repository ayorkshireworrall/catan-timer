import React, { Component } from 'react';
import Rule from './Rule';

class GameRules extends Component {
    constructor(props) {
        super(props);
    }
    setInitialTime = (value) => {
        this.props.setInitialTime(value);
    }
    setAdditionalTime = (value) => {
        this.props.setAdditionalTime(value);
    }
    render() {
        return(
            <div>
                <Rule ruleMethod={this.setAdditionalTime} label="Additional Time" defaultValue={this.props.additionalTime}/>
                <Rule ruleMethod={this.setInitialTime} label="Start Time" defaultValue={this.props.ruleDefinedTotal}/>
                <button className="btn-rules" onClick={this.props.acceptRules}>Set Rules</button>
            </div>
        )
    }
}

export default GameRules;