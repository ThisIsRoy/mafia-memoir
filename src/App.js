import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import GameList from './GameList.js';
import Game from './Game.js'
import seed from './seed.js';
import seedColors from "./seedColors.js";
import NewGameForm from './NewGameForm.js';
import seedPlayers from './seedPlayers.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: seed
    }
  }

  findSeed = id => this.state.games.find(game => game.url === id);
  
  createGame = (players, gameName) => {
    let gameLen = parseInt(this.state.games[this.state.games.length - 1].url.split("-")[1]) + 1;

    let game = {
      players: players,
      gameName: gameName,
      url: "game-" + gameLen.toString()
    }

    this.setState(state => ({
      games: state.games.concat([game])
    }));
  }

  deleteGame = (id) => {
    this.setState(prevState => ({
      games: prevState.games.filter(game => game.url !== id)
    }));
    // database todo
  }

  render() {
    return(
      <div>
        <Switch>
          <Route exact path="/game/new"   
            render={routerProps => <NewGameForm playerList={seedPlayers} 
              createGame={this.createGame} 
              {...routerProps}
            />}
          />

          <Route exact path="/game/:id" 
            render={routerProps => (
              <Game 
                players={this.findSeed(routerProps.match.params.id).players}
              />
            )}
          />
          <Route exact path ="/" render={(routeProps) => 
            <GameList 
              games={this.state.games} 
              deleteGame={this.deleteGame}
              {...routeProps}
            />}
          />
        </Switch>
      </div>
    )
  }
}

export default App;
