
const styles = {
    root: {
        cursor: "pointer",
        display: "inline-block",
        height: "25%",
        margin: "0 auto",
        marginBottom: "-3.5px",
        position: "relative",
        width: "20%",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.3)",
            transition: "all 0.3s ease-in-out"
        }
    },
    boxContent: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "100%"
    },
    delete: {
        color: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        paddingTop: "0.5rem",
        paddingRight: "0.5rem",
        right: "1rem",
        top: "1rem",
    },
    playerName: {
        color: "white",
        fontSize: "1.8vw",
        fontFamily: "Roboto",
        fontWeight: "300"
    }
}

export default styles;