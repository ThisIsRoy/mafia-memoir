import React, {Component} from 'react';
import Player from './Player.js';
import './Game.css';

class Game extends Component {
    render() {
        let townColor;
        const townPlayers = this.props.townPlayers.map(townPlayer => {
            townColor = this.props.townColors[Math.floor(Math.random() * this.props.townColors.length)].color;
            return <Player player={townPlayer.name} color={townColor}/>
        });

        return (
            <div className="Game">
                <div className="MafiaPlayers">

                </div>
                <div className="TownPlayers">
                    {townPlayers}
                </div>
            </div>
        )
    };
}

export default Game; 