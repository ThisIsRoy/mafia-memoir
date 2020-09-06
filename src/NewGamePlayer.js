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

const styles = {
    root: {
        cursor: "pointer",
        display: "inline-block",
        height: "25%",
        margin: "0 auto",
        marginBottom: "-3.5px",
        position: "relative",
        width: "20%",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.3)",
            transition: "all 0.3s ease-in-out"
        }
    },
    boxContent: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "100%"
    },
    delete: {
        color: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        paddingTop: "0.5rem",
        paddingRight: "0.5rem",
        right: "1rem",
        top: "1rem",
    },
    playerName: {
        color: "white",
        fontSize: "1.8vw",
        fontFamily: "Roboto",
        fontWeight: "300"
    }
}

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