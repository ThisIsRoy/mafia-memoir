import React from 'react';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NewGamePlayer from './NewGamePlayer.js';
import {ValidatorForm, SelectValidator} from 'react-material-ui-form-validator';


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
    const [playerToAdd, updatePlayerToAdd] = React.useState(""); //playerToAdd is one Player object
    const [mafiaNum, updateMafiaNum] = React.useState(3);
    const [disableAdd, updateDisableAdd] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const componentDidMount = () => {
      // custom rule will have name 'isPasswordMatch'
      ValidatorForm.addValidationRule('isNewPlayer', value => {
         return players.every(
           player => player.name.toLowerCase() !== value.toLowerCase()
         );
      });
    };

    const handleSelect = e => {
      updatePlayerToAdd(e.target.value);

      let notInGame = players.every(
        player => player.name !== e.target.value.name
      );

      if (!notInGame) {
        updateDisableAdd(true);
      } else {
        updateDisableAdd(false);
      }
    }

    const handleSubmit = () => {
      updatePlayers(players.concat(playerToAdd));
      
      updateDisableAdd(true);
    }

    const handleClear = () => {
      updatePlayers([]);
      updateDisableAdd(false);
    }
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>
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
            <InputLabel className={classes.mafiaSelect} id="mafia">Number of Mafia</InputLabel>
            <Select labelId="mafia" id="mafiaSelect" defaultValue={3} onChange={e => updateMafiaNum(e.target.value)}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </div>

          <div>
            <Button variant="contained" color="primary">Assign Roles</Button>
            <Button variant="contained" color="secondary" onClick={handleClear}>Clear Players</Button>
          </div>

          <div>
            <Select id="playerSelect" onChange={handleSelect}>
              {props.playerList.map(player => (
                <MenuItem value={player}>{player.name}</MenuItem>
              ))}
            </Select>
          </div>
          
          <ValidatorForm onSubmit={handleSubmit} >
            {/* <SelectValidator
              value={playerToAdd}
              validators={["isNewPlayer"]}
              errorMessages={["Player is already in the game!"]}
              onChange={handleSelect}
            >
              {props.playerList.map(player => (
                <MenuItem value={player}>{player.name}</MenuItem>
              ))}
            </SelectValidator> */}

            <Button 
              variant="contained" 
              color="primary"
              type="submit" 
              disabled={disableAdd}
            >
              Add Player
            </Button>
          </ValidatorForm>

          
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          
          {players.map(player =>(
            <NewGamePlayer player={player} />
          ))}
        </main>
      </div>
    );
  }