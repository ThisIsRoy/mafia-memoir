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
    imageBox: {
        backgroundColor: "#dae1e4",
        height: "150px",
        borderRadius: "5px",
        width: "100%",
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",    
        fontSize: "1rem",
        position: "relative"
    }, 
    image: {
        backgroundColor: "green",
        height: "100%",
        width: "100%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3.5px"
    }
}

function GamePreview(props) {
    const {classes, game} = props;

    return (
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.imageBox}>
                <div className={classes.image} style={{backgroundColor: "green"}} />
            </div>
            <h5 className={classes.title}>{game.gameName}</h5>
        </div>
    )       
}

export default withStyles(styles)(GamePreview);