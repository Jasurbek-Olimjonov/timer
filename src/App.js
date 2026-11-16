import {Component} from 'react';
import Timer from './components/timer';
import Buttons from './components/buttons';
import './App.css';

const base = {hour: 0, minute: 0, second: 0, timer: false};
const pre = {};

class App extends Component {
    constructor() {
        super();
        this.state = base;
    }

    timerFormatter = (value) => String(Number(value)).padStart(2, '0');

    killTimer = () => {
        this.setState(base);
        clearInterval(this.interval);
    };

    componentDidUpdate() {
        // this.setState(base);
    }

    updateTime = (field, value) => {
        if ((field == 'minute' && Number(value) > 60) || (field == 'second' && Number(value) > 60)) value = 60;
        else if (Number(value < 0)) value = 0;
        this.setState({[field]: Number(value)});
    };

    startTimer = () => {
        if (this.state.timer) {
            this.killTimer();
        } else {
            this.interval = setInterval(() => {
                this.setState((state) => {
                    let need;

                    if (state.second >= 3) {
                        if (state.minute >= 3) {
                            need = {
                                hour: state.hour + 1,
                                minute: 0,
                                second: 0,
                            };
                        } else {
                            need = {
                                minute: state.minute + 1,
                                second: 0,
                            };
                        }
                    } else {
                        need = {second: state.second + 1};
                    }
                    need.timer = true;

                    return need;
                });
            }, 1000);
        }
    };

    componentWillUnmount() {}

    render() {
        return (
            <div className="whole d-flex h-100 justify-content-center flex-column align-items-center gap-5">
                <Timer
                    hour={this.timerFormatter(this.state.hour)}
                    minute={this.timerFormatter(this.state.minute)}
                    second={this.timerFormatter(this.state.second)}
                    onUpdate={this.updateTime}
                />
                <Buttons start={this.startTimer} restart={this.restartTimer} timer={this.state.timer} />
            </div>
        );
    }
}

export default App;
