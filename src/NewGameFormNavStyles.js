const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      hide: {
        display: 'none',
      },
      menuButton: {
        marginRight: theme.spacing(2),
    },
    navButtons: {
        marginRight: "1rem"
    },
    button: {
        margin: "0 0.5rem"
    }
});

const drawerWidth = 400; // need to refractor in NewGameFormStyles.js as well

export default styles;