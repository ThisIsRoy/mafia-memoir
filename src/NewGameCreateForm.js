import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function NewGameCreateForm({ createGame, disabled, updateGameName, handleClose }) {
    const [open, setOpen] = React.useState(true);
  
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Game</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter a name for the game. Recommended format is date of game 
                (e.g., "August 23rd 2020").
            </DialogContentText>
            <TextField 
                fullWidth 
                label="Game Name" 
                inputProps={{
                    maxLength: 20
                }}
                onChange={e => updateGameName(e.target.value)} 
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button variant="contained" 
                color="primary" 
                onClick={createGame}
                disabled={disabled}
            >
                Create Game
            </Button> 
            </DialogActions>
        </Dialog>
    );
  }