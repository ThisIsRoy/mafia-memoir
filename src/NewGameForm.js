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
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


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

    const handleAssign = () => {
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
      for (let player of newPlayers) {
        if (!player.role) {
          player["role"] = "Vanilla Town";
        }
      }

      updatePlayers(newPlayers);
      console.log(players);
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
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </div>

          <div>
            <Button variant="contained" 
              color="primary" 
              disabled={mafiaNum * 2 + 3 < players.length ? false : true}
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
          
          {players.map(player =>(
            <NewGamePlayer player={player} />
          ))}
        </main>
      </div>
    );
  }