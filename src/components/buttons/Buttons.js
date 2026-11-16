import {Component} from 'react';
import './Buttons.css';

class Buttons extends Component {
    render() {
        return (
            <div className="d-flex align-items-center gap-4 justify-content-center">
                <button className="controls d-flex align-items-center justify-content-center fs-3 text-white rounded-circle bg-transparent shadow">
                    {!this.props.timer ? <span></span> : <span className="pause fw-bold">||</span>}
                </button>
                <button onClick={this.props.start} id="killer" className="rounded-circle text-white btn-danger btn fs-1">
                    {!this.props.timer ? <span>▷</span> : <span>■</span>}
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
