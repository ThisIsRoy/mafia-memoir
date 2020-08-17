import React, {Component} from 'react';
import Player from './Player/Player.js';
import './Game.css';
import Navbar from './Navbar.js';
import trophy from './icons/trophy.svg';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "summary", // (1) summary or (2) notes
            winner: "in progress" //(1) in progress, (2) town, or (3) mafia
        }
    }

    updateWinner = val => {
        let newWinner;
        switch(val) {
            case 1: 
                newWinner = "mafia";
                break;
            case 3:
                newWinner = "town";
                break;
            default:
                newWinner = "in progress"
        }   

        this.setState({winner: newWinner});
    }

    changePage = newPage => {
        this.setState({page: newPage});
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
            case "mafia":
                mafiaTitle = <h1 className={`FactionHeader FactionMafia`}><img src={trophy} className="Trophy" /> Mafia </h1>
                townTitle = <h1 className={`FactionHeader FactionTown`}>Town</h1>
                break;
            case "town":
                mafiaTitle = <h1 className={`FactionHeader FactionMafia`}> Mafia </h1>
                townTitle = <h1 className={`FactionHeader FactionTown`}><img src={trophy} className="Trophy" /> Town</h1>
                break;
            default:
                mafiaTitle = <h1 className={`FactionHeader FactionMafia`}>Mafia </h1>
                townTitle = <h1 className={`FactionHeader FactionTown`}>Town</h1>
        }

        let pageSummary = <div>
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

        let pageNotes = <div>Placeholder Page!</div>

        let page;
        switch (this.state.page) {
            case "summary":
                page = pageSummary;
                break;
            case "notes":
                page = pageNotes;
                break;
            default:
                page = pageSummary;
                console.log("Error in rendering game page, hit default");
        }

        return (
            <div>
                <Navbar 
                    winner={this.state.winner} 
                    updateWinner={this.updateWinner} 
                    changePage={this.changePage}
                />
                <div className="Game">
                
                {page}
            </div>
            </div>
            
            
        )
    };
}

export default Game; 