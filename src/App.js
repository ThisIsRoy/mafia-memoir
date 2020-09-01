import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
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

  findSeed = id => this.state.games.find(val => val.url === id);
  
  createGame = players => {
    console.log(players);
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
          <Route exact path ="/" render={(routeProps) => <GameList games={this.state.games} {...routeProps}/>}/>
        </Switch>
      </div>
    )
  }
}

export default App;
