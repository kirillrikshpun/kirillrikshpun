import { useContext } from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles(() => ({
  topbarContainer: {
    height: "50px",
    width: "100%",
    backgroundColor: "#42108800",
    alignItems: "center",
    display: "flex",
    alignItems: "center",
    position: "sticky",
    top: "0",
    zIndex: "999",
  },
}));

export default function Topbar() {
  const { user } = useContext(AuthContext);

  const classes = useStyles();

  return (
    <Box className={classes.topbarContainer}>
      <Box style={{ flex: "3" }}>
        <Typography variant="h1">{user.username}</Typography>
      </Box>
    </Box>
  );
}
