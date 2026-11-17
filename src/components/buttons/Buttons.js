import {Component} from 'react';
import './Buttons.css';

class Buttons extends Component {
    render() {

        const state = this.props.states
        return (
            <div className="d-flex align-items-center gap-4 justify-content-center">
                <button onClick={this.props.resume} className="controls d-flex align-items-center justify-content-center fs-3 text-white rounded-circle bg-transparent shadow">
                    {!state.timer ? <span>▷</span> : <span className="pause fw-bold">||</span>}
                </button>
                <button onClick={this.props.start} id="killer" className="rounded-circle text-white btn-danger btn fs-1">
                    {!state.kill ? <span>▷</span> : <span>■</span>}
                </button>
                <button
                    onClick={this.props.restart}
                    className="controls d-flex align-items-center justify-content-center fs-3 text-white rounded-circle bg-transparent shadow"
                >
                    ↺
                </button>
            </div>
        );
    }
}

export default Buttons;
