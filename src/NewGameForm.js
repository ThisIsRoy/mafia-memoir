import React from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
import TextField from '@material-ui/core/TextField';
import { arrayMove } from 'react-sortable-hoc';
import NewGameFormNav from './NewGameFormNav.js';


const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    mafiaSelect: {
      display: "inline-block",
      marginRight: "1.5rem",
      verticalAlign: "super"
    },
    content: {
      flexGrow: 1,
      height: "calc(100vh - 64px)",
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));

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
          classes={classes}
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
          <Divider />
          <Typography variant="h4">Create Teams</Typography>

          <div>
            <TextField 
              required={true} 
              onChange={e => updateGameName(e.target.value)} 
              value={gameName} 
              placeholder="Game Name"
              inputProps={{
                maxLength: 20
              }}
            />
          </div>
          
          <div>
            <InputLabel className={classes.mafiaSelect} id="mafia">Number of Mafia</InputLabel>
            <Select labelId="mafia" id="mafiaSelect" defaultValue={3} onChange={e => updateMafiaNum(e.target.value)}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </div>

          <div>
            <Button variant="contained" 
              color="primary" 
              disabled={mafiaNum * 2 + 2 < players.length ? false : true}
              onClick={handleAssign}
            >Assign Roles</Button>
            <Button variant="contained" color="secondary" onClick={handleClear}>Clear Players</Button>
          </div>

            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Choose Players</FormLabel>
                <FormGroup>
                  {props.playerList.map(player => (
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