import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
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
      verticalAlign: "super",
      padding: "2rem 0"
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
    container: {
      height: "100%", 
      width: "90%",
      paddingLeft: "2rem",
    },
    buttons: {
      paddingBottom: "3rem",
      width: "100%"
    },
    button: {
      width: "50%"
    },
    formGroup: {
      alignItems: "center",
      display: 'flex',
    }
}));

export default useStyles;