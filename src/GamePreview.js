import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
            cursor: "pointer"
        }
    },
    colors: {
        backgroundColor: "gray"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative"
    }
}

function GamePreview(props) {
    const {classes, gameInfo} = props;

    return (
        <div className={classes.root}>
            <div className={classes.color}>{gameInfo[0].gameName}</div>
    <h5 className={classes.title}>{gameInfo[0].url}</h5>
        </div>
    )       
}

export default withStyles(styles)(GamePreview);