import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './GamePreviewStyles.js';
import DeleteIcon from '@material-ui/icons/Delete';


class GamePreview extends Component {
    constructor(props) {
        super(props);
    }

    deleteGame = (e) => {
        e.stopPropagation();
        this.props.deleteGame(this.props.id);
    } 

    render() {
        const {classes, game, handleClick} = this.props;
        return (
            <div className={classes.root} onClick={handleClick}>
                <DeleteIcon    
                    className={classes.deleteIcon} 
                    style={{transition: "all 0.3s ease-in-out"}} 
                    onClick={this.deleteGame}
                />
    
                <div className={classes.imageBox}>
                    <div className={classes.image} />
                </div>
                <h5 className={classes.title}>{game.gameName}</h5>
            </div>
        )       
    }    
}

export default withStyles(styles)(GamePreview);