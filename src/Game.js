import React, {Component} from 'react';
import Player from './Player/Player.js';
import './Game.css';
import Navbar from './Navbar.js';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: 3
        }
    }

    updateWinner = newWinner => {
        this.setState({winner: newWinner});
    }

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
                <Navbar winner={this.state.winner} updateWinner={this.updateWinner} />
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