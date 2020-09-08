import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NewGamePlayerList from './NewGamePlayerList.js';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { arrayMove } from 'react-sortable-hoc';
import NewGameFormNav from './NewGameFormNav.js';
import useStyles from './NewGameFormStyles.js';


export default function NewGameForm(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [players, updatePlayers] = React.useState([]); // players is a list of Player objects that are currently in the game
    const [mafiaNum, updateMafiaNum] = React.useState(3);
    const [gameName, updateGameName] = React.useState("");
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleClear = () => {
      updatePlayers(players.map(player => {
        delete player["role"];
        return player;
      }));
      updatePlayers([]);
    }

    const handleCheck = e => {
      if (e.target.checked) {
        updatePlayers(players.concat(props.playerList.find(player => player.name.toLowerCase() === e.target.name.toLowerCase())));
      } else {
        updatePlayers(players.filter(player => player.name.toLowerCase() !== e.target.name.toLowerCase()));
      }
    }

    const handleAssign = (newGame) => {
      let random = [];
      let i;

      // grab random indices for roles
      while (random.length < mafiaNum + 3) {
        i = Math.floor(Math.random() * players.length);
        if (random.indexOf(i) === -1) {
          random.push(i);
        }
      }

      let newPlayers = players.slice();

      // delete old roles
      let player;
      for (player of newPlayers) {
        delete player["role"];
      }

      // assign mafia
      for (i = 0; i < mafiaNum; i++) {
        newPlayers[random[i]]["role"] = "Mafia"  
      }

      // assign power roles
      const powerRoles = ["Cop", "Medic", "Vigilante"];
      for (i = mafiaNum; i < random.length; i++) {
        newPlayers[random[i]]["role"] = powerRoles[i - mafiaNum];
      }

      // assign vanilla town
      for (player of newPlayers) {
        if (!player.role) {
          player["role"] = "Vanilla Town";
        }
      }

      updatePlayers(newPlayers);
    }

    const createGame = () => {
      props.createGame(players, gameName);
      props.history.push("/");
    }

    const hasAssignedRoles = () => {
      for (let player of players) {
        if (!player.hasOwnProperty("role")) {
          return false;
        }
      }

      return true; 
    }

    const handleDelete = (playerName) => {
      updatePlayers(players.filter(player => player.name !== playerName));
      console.log("got here");
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
      updatePlayers(arrayMove(players, oldIndex, newIndex));
    }
  
    return (
      <div className={classes.root}>
        <NewGameFormNav 
          updateGameName={updateGameName}
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          createGame={createGame}
          gameName={gameName}
          players={players}
          hasAssignedRoles={hasAssignedRoles}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
          </div>
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>Create Teams</Typography>
            <Divider />
      
            <div>
              <InputLabel className={classes.mafiaSelect} id="mafia">Number of Mafia</InputLabel>
              <Select labelId="mafia" id="mafiaSelect" defaultValue={3} onChange={e => updateMafiaNum(e.target.value)}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </div>

            <div className={classes.buttons}>
              <Button variant="contained" 
                color="primary" 
                disabled={mafiaNum * 2 + 2 < players.length ? false : true}
                onClick={handleAssign}
                className={classes.button}
              >Assign Roles</Button>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleClear}
                className={classes.button}
              >Clear Players</Button>
            </div>

            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Choose players</FormLabel>
                <FormGroup >
                  {props.playerList.slice(0, Math.floor(props.playerList.length / 2)).map(player => (
                    <FormControlLabel 
                      control={<Checkbox checked={players.indexOf(player) >= 0 ? true : false} name={player.name} />}
                      label={player.name}
                      onChange={handleCheck}
                      key={player.name}
                    />
                  ))}
                </FormGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend">!</FormLabel>
                <FormGroup >
                  {props.playerList.slice(Math.ceil(props.playerList.length / 2), props.playerList.length).map(player => (
                    <FormControlLabel 
                      control={<Checkbox checked={players.indexOf(player) >= 0 ? true : false} name={player.name} />}
                      label={player.name}
                      onChange={handleCheck}
                      key={player.name}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </div>
          </div>
          
          
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          
          <NewGamePlayerList 
            players={players}   
            handleDelete={handleDelete} 
            axis="xy"
            onSortStart={(_, event) => event.preventDefault()}
            onSortEnd={onSortEnd}
          />
        </main>
      </div>
    );
  }