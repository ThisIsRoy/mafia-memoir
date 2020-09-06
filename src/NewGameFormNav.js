import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
 
class NewGameFormNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, open, handleDrawerOpen, createGame, gameName, players, hasAssignedRoles} = this.props;

        return(
            <div>
                <CssBaseline />
                <AppBar
                    color="default"
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
                
                        <Button variant="contained" 
                            color="primary" 
                            onClick={createGame}
                            disabled={gameName === "" || players.length === 0 || !hasAssignedRoles() ? true : false}
                        >
                        Create Game
                        </Button>
                        <Link to="/">
                            <Button variant ="contained" color="secondary">
                                Home
                            </Button>
                        </Link>
                    </Toolbar>

                </AppBar>
            </div>
        )
    }
}

export default NewGameFormNav;