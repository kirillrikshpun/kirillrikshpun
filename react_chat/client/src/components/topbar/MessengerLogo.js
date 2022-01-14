import React from "react";
import Typography from "@mui/material/Typography";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  conversationsHead: {
    color: "#DBD9FA",
    height: "50px",
    padding: "10px",
    backgroundColor: "#2E2E4F",
  },
}));

export default function MessengerLogo() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.conversationsHead}>
        <Typography variant="h3">The ROOM</Typography>
      </Box>
    </>
  );
}
