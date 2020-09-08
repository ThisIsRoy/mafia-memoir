import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import NewGameCreateForm from './NewGameCreateForm.js';
import styles from './NewGameFormNavStyles.js';


class NewGameFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false
        }
    }

    handleClickOpen = () => {
        this.setState({showForm: true});
    }

    handleClose = () => {
        this.setState({showForm: false});
    }

    render() {
        const { classes, open, updateGameName, handleDrawerOpen, createGame, gameName, players, hasAssignedRoles } = this.props;
        return(
            <div className={classes.root}>
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
                    </Toolbar>

                    <div className={classes.navButtons}>
                        
                        {/* <Button variant="contained" 
                            color="primary" 
                            onClick={createGame}
                            disabled={gameName === "" || players.length === 0 || !hasAssignedRoles() ? true : false}
                        >
                        Create Game
                        </Button> */}
                        <Button className={classes.button} variant="contained" color="primary" onClick={this.handleClickOpen}>
                            Create Game
                        </Button>
                        <Link to="/">
                            <Button className={classes.button} variant ="contained" color="secondary">
                                Home
                            </Button>
                        </Link>
                    </div>
                </AppBar>

                {this.state.showForm && (
                    <NewGameCreateForm 
                        createGame={createGame}
                        updateGameName={updateGameName}
                        handleClose={this.handleClose}
                        disabled={gameName === "" || players.length === 0 || !hasAssignedRoles() ? true : false}
                    />
                )}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true})(NewGameFormNav);