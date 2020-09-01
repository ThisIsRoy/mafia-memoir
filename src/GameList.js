import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import GamePreview from './GamePreview.js';
import {withStyles } from "@material-ui/styles";
import styles from './GameListStyles.js';

class GameList extends Component {
    handleClick = url => {
        this.props.history.push(`/game/${url}`)
    }

    render() {
        const {games, classes} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Team Mafia Games</h1>
                        <Link to="/game/new">Create Game</Link>
                    </nav>

                    <div className={classes.games}>
                        {games.map(game => (
                            <GamePreview game={game} handleClick={() => this.handleClick(game.url)} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(GameList);