import React from 'react';
import {withStyles} from '@material-ui/styles';
import cop from './icons/cop.svg';
import mafia from './icons/mafia.svg';
import medic from './icons/medic.svg';
import town from './icons/town.svg';
import vigi from './icons/vigi.svg';
import unknown from './icons/unknown.svg';
import './NewGamePlayer.css';
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';
import styles from './NewGamePlayerStyles.js';

const NewGamePlayer = SortableElement((props) => {
    const {classes, player} = props;

    const role = player.role;
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
                img = unknown;
                break;
        }

    return (
        <div className={classes.root } style={{backgroundColor: player.color}}>
            <div className={classes.boxContent}>
                <div className={classes.delete}><DeleteIcon  onClick={props.handleDelete} /></div>
                <div className={classes.playerName}>{player.name}</div>
                {/* css styling is in Players.css */}
                <img className="RoleImage" src={img} alt="role"/> 
            </div>
            
        </div>
    );
})

export default withStyles(styles)(NewGamePlayer);