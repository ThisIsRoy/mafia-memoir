import React, {Component} from 'react';
import './Player.css';

class Player extends Component {
    render() {
        return (
            <div style={{background: this.props.color}} className="Player">
                <span>{this.props.player}</span>
            </div>
        )
    };
}

export default Player; 