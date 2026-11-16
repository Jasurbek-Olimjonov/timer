import {Component} from 'react';
import './Timer.css';

class Timer extends Component {
    render() {
        const info = this.props;
        const hourWidth = `${Math.max(3, String(info.hour).length + 1)}ch`;
        return (
            <div className="times text-white fw-medium">
                <input value={info.hour} onChange={(e) => info.onUpdate('hour', e.target.value)} style={{width: hourWidth}} className="d-inline ms-3 text-white border-0 bg-transparent" type="number" /> :
                <input onChange={(e) => info.onUpdate('minute', e.target.value)} value={info.minute} className="d-inline ms-3 text-white border-0 bg-transparent" type="number" /> :
                <input value={info.second} onChange={(e) => info.onUpdate('second', e.target.value)} className="d-inline ms-3 text-white border-0 bg-transparent" type="number" />
            </div>
        );
    }
}

export default Timer;
