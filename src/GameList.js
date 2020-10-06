import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GamePreview from './GamePreview.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles } from "@material-ui/styles";
import styles from './GameListStyles.js';

class GameList extends Component {
    handleClick = url => {
        this.props.history.push(`/game/${url}`)
    }

    render() {
        const {games, classes, deleteGame} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Team Mafia Games</h1>
                        <Link to="/game/new">Create Game</Link>
                    </nav>

                    <TransitionGroup className={classes.games}>
                        {games.map(game => (
                            <CSSTransition key={game.url} classNames="fade" timeout={500}>
                                <GamePreview 
                                    game={game}
                                    deleteGame={deleteGame}     
                                    handleClick={() => this.handleClick(game.url)} 
                                    key={game.url}
                                    id={game.url}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>  
                    
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(GameList);