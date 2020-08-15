import React, {Component} from 'react';
import Player from './Player/Player.js';
import './Game.css';
import Navbar from './Player/Navbar.js';

class Game extends Component {
    render() {
        let townColor;
        const townPlayers = this.props.townPlayers.map(townPlayer => {
            townColor = this.props.townColors[Math.floor(Math.random() * this.props.townColors.length)].color;
            return <Player player={townPlayer} color={townColor}/>
        });

        let mafiaColor;
        const mafiaPlayers = this.props.mafiaPlayers.map(mafiaPlayer => {
            mafiaColor = this.props.mafiaColors[Math.floor(Math.random() * this.props.mafiaColors.length)].color;
            return <Player player={mafiaPlayer} color={mafiaColor}/>
        });

        return (
            <div className="Game">
                <Navbar winner="Town"/>
                <div className="Faction">
                    <h1 className={`FactionHeader FactionMafia`}>Mafia</h1>
                    {mafiaPlayers}
                </div>
                <div className="Faction">
                    <h1 className={`FactionHeader FactionTown`}>Town</h1>
                    {townPlayers}
                </div>
            </div>
        )
    };
}

export default Game; 