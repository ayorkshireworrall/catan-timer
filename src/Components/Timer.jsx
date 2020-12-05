import React, { Component } from 'react';
import TimerDisplay from './TimerDisplay';
import GameRules from './GameRules';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds:"00",
            minutes:"1",
            ruleDefinedTotal:60,
            totalInSeconds:60,
            additionalTime: 60,
            display:"clock",
            rulesOpen: true
        }
        this.handleAddTime = this.handleAddTime.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.countDown = this.countDown.bind(this);
        this.startCountDown = this.startCountDown.bind(this);
        this.pauseCountDown = this.pauseCountDown.bind(this);
        this.intervalHandle = "";
        this.toggleRules = this.toggleRules.bind(this);
        this.timerRunning = false;
    }

    changeAdditionalTime = (additionalTime) => {
        this.setState({additionalTime});
    }

    changeStartTime = (totalInSeconds) => {
        var min = Math.floor(totalInSeconds / 60);
            var sec = totalInSeconds - (min * 60);
            
            sec = sec < 10 ? "0" + sec : sec;
            
            this.setState({
                minutes: min,
                seconds: sec,
                totalInSeconds,
                ruleDefinedTotal: totalInSeconds
            })
    }

    toggleRules() {
        this.setState({rulesOpen:!this.state.rulesOpen})
    }

    countDown() {
        if (this.state.totalInSeconds > 1) {

            var secondsRemaining = this.state.totalInSeconds;
            secondsRemaining--;
            var min = Math.floor(secondsRemaining / 60);
            var sec = secondsRemaining - (min * 60);
            
            sec = sec < 10 ? "0" + sec : sec;
            
            this.setState({
                minutes: min,
                seconds: sec,
                totalInSeconds: secondsRemaining
            })
            
            if (min === 0 & sec === 0) {
                clearInterval(this.intervalHandle);
            }
        } else {
            this.setState({display:"noTime"})
            clearInterval(this.intervalHandle);
        }
    }

    startCountDown() {
        if (!this.state.timerRunning) {
            this.intervalHandle = setInterval(this.countDown, 1000);
            this.setState({timerRunning: true})
        }
    }

    pauseCountDown() {
        clearInterval(this.intervalHandle);
        this.setState({timerRunning: false})
    }

    handleAddTime() {
        console.log(this.state.additionalTime);
        var newTotal = parseInt(this.state.totalInSeconds) + parseInt(this.state.additionalTime);
        console.log(newTotal);
        var min = Math.floor(newTotal / 60);
        var sec = newTotal - (min * 60);

        sec = sec < 10 ? "0" + sec : sec;
    
        this.setState({
            minutes: min,
            seconds: sec,
            totalInSeconds: newTotal
        })
    }

    handleReset() {
        this.changeStartTime(this.state.ruleDefinedTotal);
        this.setState({display:"clock", timerRunning: false});
        clearInterval(this.intervalHandle);
    }

    render() {
        if (this.state.rulesOpen) {
            return(
                <div className="rules">
                    <GameRules 
                        setAdditionalTime={this.changeAdditionalTime} 
                        setInitialTime={this.changeStartTime}
                        acceptRules={this.toggleRules}
                        ruleDefinedTotal={this.state.ruleDefinedTotal}
                        additionalTime={this.state.additionalTime}
                    />
                </div>
            )
        } else {
            return (
                <div className="timer">
                    <div className="timer-buttons">
                        <button className="timer-button" onClick={this.startCountDown}>Start</button>
                        <button className="timer-button" onClick={this.handleAddTime}>Add Time</button>
                    </div>
                    <TimerDisplay 
                        display={this.state.display}
                        minutes={this.state.minutes} 
                        seconds={this.state.seconds} 
                        total={this.state.totalInSeconds} 
                    />
                    <div className="timer-buttons">
                        <button className="timer-button" onClick={this.handleReset}>Reset</button>
                        <button className="timer-button" onClick={this.pauseCountDown}>Pause</button>
                    </div>
                    <button className="btn-rules" onClick={this.toggleRules}>Redefine Rules</button>
            </div>
            )
        }
    }
}

export default Timer;