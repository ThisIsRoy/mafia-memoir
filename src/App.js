import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import GameList from './GameList.js';
import Game from './Game.js'
import seed from './seed.js';

class App extends Component {
  findSeed = id => seed.find(val => val.id === id);
  

  render() {
    // const testGame = <Game townColors={seed[0].colors} 
    //                     townPlayers={seed[1].players} 
    //                     mafiaColors={seed[0].colors} 
    //                     mafiaPlayers={seed[2].players} 
    //                   />

    return(
      <div>
        <Switch>
          <Route exact path ="/" render={() => <GameList seed={seed}/>}/>
          <Route exact path ="/game/:id" 
            render={routerProps => (
              <Game 
                townColors={this.findSeed("seed-colors")}
                mafiaColors={this.findSeed("seed-colors")}
                townPlayers={this.findSeed(routerProps.match.params.id + "-town-seed")}
                mafiaPlayers={this.findSeed(routerProps.match.params.id + "-mafia-seed")}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default App;
