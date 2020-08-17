import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class GameList extends Component {
    render() {
        const {seed} = this.props;

        return (
            <div>
                <Link to={`/game/${seed[0].url}`}>
                    {seed[0].gameName}
                </Link>
            </div>
        )
    }
}

export default GameList;