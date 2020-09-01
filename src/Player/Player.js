import React, {Component} from 'react';
import './Player.css';
import cop from '../icons/cop.svg';
import mafia from '../icons/mafia.svg';
import medic from '../icons/medic.svg';
import town from '../icons/town.svg';
import vigi from '../icons/vigi.svg';

class Player extends Component {
    render() {
        const role = this.props.player.role;
        let img;
        switch (role) {
            case "Mafia":
                img = mafia;
                break;
            case "Vigilante":
                img = vigi;
                break;
            case "Cop":
                img = cop;
                break;
            case "Vanilla Town":
                img = town;
                break;
            case "Medic":
                img = medic;
                break;
            default:
                console.log("Error in finding role for Player.js");
        }

        return (
            <div style={{background: this.props.player.color}} className="Player">
                <div className="BoxContainer">
                    <span>{this.props.player.name}</span>
                    <div>
                        <img className="RoleImage" src={img} />
                    </div>
                </div>
            </div>
        )
    };
}

export default Player; 