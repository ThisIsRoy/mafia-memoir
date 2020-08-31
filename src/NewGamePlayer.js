import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {
    root: {
        cursor: "pointer",
        display: "inline-block",
        height: "25%",
        margin: "0 auto",
        marginBottom: "-3.5px",
        position: "relative",
        width: "20%"
    }
}

function NewGamePlayer(props) {
    return (
        <div className={props.classes.root } style={{backgroundColor: props.player.color}}>
            {props.player.name}
            {props.role ? props.role : "?"}
        </div>
    )
}

export default withStyles(styles)(NewGamePlayer);