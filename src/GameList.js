import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import GamePreview from './GamePreview.js';
import {withStyles} from "@material-ui/styles";

const styles = {
    root: {
        backgroundColor: "lightblue",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    nav: {
        color: "white",
        display: "flex",
        width: "100%",
        justifyContent: "space-between"
    },
    games: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
    }
}

class GameList extends Component {
    render() {
        const {gamesInfo, classes} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Mafia Games</h1>
                    </nav>

                    <div className={classes.games}>
                        {gamesInfo.map(gameInfo => (
                            <GamePreview gameInfo={gameInfo}/>
                        ))}

                        <Link to={`/game/${gamesInfo[0][0].url}`}>
                            {gamesInfo[0][0].gameName}
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(GameList);