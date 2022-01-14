import { useContext } from "react";
import { Box, makeStyles } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  messengerHead: {
    color: "#DBD9FA",
    height: "50px",
    padding: "10px",
    backgroundColor: "#2E2E4F",
  },
}));

export default function Topbar({ user, toggleDrawerOpen }) {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.messengerHead}>
        <Typography variant="h3">{user.username}</Typography>
        <IconButton
          onClick={toggleDrawerOpen}
          // sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </>
  );
}
