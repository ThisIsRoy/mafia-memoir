import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import NewGamePlayer from './NewGamePlayer.js';

const NewGamePlayerList = SortableContainer((props) => {
    return (
        <div style={{height: "100% "}}>
            {props.players.map((player, i) =>(
                <NewGamePlayer 
                    index={i}
                    player={player} 
                    handleDelete={() => props.handleDelete(player.name)} 
                    key={player.name}
                />
            ))}
        </div> 
    );
})

export default NewGamePlayerList;