import React, {Component} from 'react';
import Player from './Player/Player.js';
import './Game.css';
import Navbar from './Navbar.js';
import trophy from './icons/trophy.svg'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: 3 // 1 - mafia victory, 2 - game in progres, 3 - town victory
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
        
        let mafiaTitle;
        let townTitle;
        switch (this.state.winner) {
            case 1:
                mafiaTitle = <h1 className={`FactionHeader FactionMafia`}><img src={trophy} className="Trophy" /> Mafia </h1>
                townTitle = <h1 className={`FactionHeader FactionTown`}>Town</h1>
                break;
            case 3:
                mafiaTitle = <h1 className={`FactionHeader FactionMafia`}> Mafia </h1>
                townTitle = <h1 className={`FactionHeader FactionTown`}><img src={trophy} className="Trophy" /> Town</h1>
                break;
            default:
                mafiaTitle = <h1 className={`FactionHeader FactionMafia`}>Mafia </h1>
                townTitle = <h1 className={`FactionHeader FactionTown`}>Town</h1>
        }

        return (
            <div className="Game">
                <Navbar winner={this.state.winner} updateWinner={this.updateWinner} />
                <div className="Faction">
                    <div>
                        {mafiaTitle}
                        {mafiaPlayers}
                    </div>
                </div>
                <div className="Faction">
                    <div>
                        {townTitle}
                        {townPlayers}
                    </div>
                </div>
            </div>
        )
    };
}

export default Game; 