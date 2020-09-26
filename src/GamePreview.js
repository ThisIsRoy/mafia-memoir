import React from 'react';
import {withStyles} from '@material-ui/styles';
import styles from './GamePreviewStyles.js';
import DeleteIcon from '@material-ui/icons/Delete';


function GamePreview(props) {
    const {classes, game} = props;

    return (
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.delete}>
                <DeleteIcon className={classes.deleteIcon} style={{transition: "all 0.3s ease-in-out"}} />
            </div>

            <div className={classes.imageBox}>
                <div className={classes.image} />
            </div>
            <h5 className={classes.title}>{game.gameName}</h5>
        </div>
    )       
}

export default withStyles(styles)(GamePreview);