import React, { Component } from 'react';

class TimerDisplay extends Component {
    render() {
        if (this.props.display === "clock") { 
            return (
                <div className="display">
                {this.props.minutes}:{this.props.seconds}
            </div>
            )
        } else {
            return (
                <div className="display">
                    Time's Up
                </div>
            )
        }
    }
}

export default TimerDisplay;