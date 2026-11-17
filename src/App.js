import {Component} from 'react';
import Timer from './components/timer';
import Buttons from './components/buttons';
import './App.css';

const always = 'always';
const default_state = {hour: 0, minute: 0, second: 0, timer: false, kill: false};
const pre_key = 'pre_key';

const loadState = (key = always) => {
    const saved_state = localStorage.getItem(key);

    if (saved_state === null) {
        return {...default_state};
    }

    try {
        const parsed_state = JSON.parse(saved_state);

        if (!parsed_state || typeof parsed_state !== 'object') {
            throw new Error('Saved app state must be an object.');
        }

        // sending the object by comparison

        return {...default_state, ...parsed_state};
    } catch (error) {
        console.error('Could not load saved app state; using defaults.', error);

        // using default data if does not exist

        return {...default_state};
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = loadState();
    }

    timerFormatter = (value) => String(Number(value)).padStart(2, '0');

    callTimer = () => {
        this.interval = setInterval(() => {
            this.setState((state) => {
                let need;

                if (state.hour <= 0 && state.minute <= 0 && state.second <= 0) {
                    clearInterval(this.interval);
                    return default_state;
                } else if (state.second <= 0) {
                    if (state.minute <= 0) {
                        need = {
                            hour: state.hour - 1,
                            minute: 59,
                            second: 59,
                        };
                    } else {
                        need = {
                            minute: state.minute - 1,
                            second: 59,
                        };
                    }
                } else {
                    need = {second: state.second - 1};
                }
                need.timer = true;
                need.kill = true;

                return need;
            });
        }, 1000);
    };

    killTimer = () => {
        this.setState(default_state);
        clearInterval(this.interval);
    };

    resumeTimer = () => {
        if (this.state.timer) {
            clearInterval(this.interval);
            this.setState({timer: false});
        } else this.callTimer();
    };

    startTimer = () => {
        if (this.state.kill) this.killTimer();
        else {
            this.callTimer();
            const new_one = {...this.state, timer: false, kill: false};
            localStorage.setItem(pre_key, JSON.stringify(new_one));
        }
    };

    restartTimer = () => {
        clearInterval(this.interval);
        const pre = loadState(pre_key);
        this.setState(pre);
    };

    saveState = () => {
        localStorage.setItem(always, JSON.stringify(this.state));
    };

    // saving state at the first reload

    componentDidMount() {
        this.saveState();
    }

    // saving state at each update on the page

    componentDidUpdate() {
        this.saveState();
    }

    updateTime = (field, value) => {
        if ((field == 'minute' && Number(value) >= 59) || (field == 'second' && Number(value) >= 59)) value = 59;
        else if (Number(value < 0)) value = 0;
        this.setState({[field]: Number(value)});
    };

    render() {
        return (
            <div className="whole d-flex h-100 justify-content-center flex-column align-items-center gap-5">
                <Timer
                    hour={this.timerFormatter(this.state.hour)}
                    minute={this.timerFormatter(this.state.minute)}
                    second={this.timerFormatter(this.state.second)}
                    onUpdate={this.updateTime}
                />
                <Buttons resume={this.resumeTimer} start={this.startTimer} restart={this.restartTimer} states={this.state} />
            </div>
        );
    }
}

export default App;
