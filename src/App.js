import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import GameList from './GameList.js';
import Game from './Game.js'
import seed from './seed.js';
import seedColors from "./seedColors.js";
import NewGameForm from './NewGameForm.js';
import seedPlayers from './seedPlayers.js';

class App extends Component {
  findSeed = id => seed.find(val => val[0].url === id);
  

  render() {
    // const testGame = <Game townColors={seed[0].colors} 
    //                     townPlayers={seed[1].players} 
    //                     mafiaColors={seed[0].colors} 
    //                     mafiaPlayers={seed[2].players} 
    //                   />

    return(
      <div>
        <Switch>
          <Route exact path="/game/new"   
            render={() => <NewGameForm playerList={seedPlayers} />}
          />
          <Route exact path="/game/:id" 
            render={routerProps => (
              <Game 
                townColors={seedColors}
                mafiaColors={seedColors}
                townPlayers={this.findSeed( routerProps.match.params.id)[1]}
                mafiaPlayers={this.findSeed(routerProps.match.params.id)[2]}
              />
            )}
          />
          <Route exact path ="/" render={(routeProps) => <GameList gamesInfo={seed} {...routeProps}/>}/>
        </Switch>
      </div>
    )
  }
}

export default App;
