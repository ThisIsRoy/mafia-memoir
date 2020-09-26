const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: "pointer",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        "&:hover svg": {
            opacity: "1"
        }
    },
    imageBox: {
        backgroundColor: "#dae1e4",
        height: "150px",
        borderRadius: "5px",
        width: "100%",
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",    
        fontSize: "1rem",
        position: "relative"
    }, 
    image: {
        backgroundColor: "orange",
        height: "100%",
        width: "100%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3.5px"
    },
    delete: {
        
    },
    deleteIcon: {
        backgroundColor: "#FF4136",
        color: "white",
        height: "20px",
        position: "absolute",
        right: "0px",
        top: "0px",
        padding: "10px",
        width: "20px",
        opacity: "0",
        zIndex: "999"
    }
}

export default styles;