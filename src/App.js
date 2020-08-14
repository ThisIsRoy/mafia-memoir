import React, {Component} from 'react';
import Game from './Game.js'
import seed from './seed.js';

class App extends Component {
  render() {
    return(
      <div>
        <Game townColors={seed[0].colors} townPlayers={seed[1].players} />
      </div>
    )
  }
}

export default App;
