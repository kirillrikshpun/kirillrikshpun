import { format } from "timeago.js";
import photo from "../../photo.png";
import { Typography, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rootLeft: {
    display: "flex",
    justifyContent: "left",
  },
  rootRight: {
    display: "flex",
    justifyContent: "right",
    color: "#8785AB",
  },
  messageLeft: {
    display: "flex",
    padding: "10px",
    maxWidth: "300px",
    borderRadius: "20px",
    margin: "3px",
    backgroundColor: "#8785AB",
    color: "#FFFFFF",
  },

  messageRight: {
    display: "flex",
    padding: "10px",
    maxWidth: "300px",
    borderRadius: "20px",
    margin: "4px",
    backgroundColor: "#DCDDF5",
    color: "#8785AB",
  },

  messageImg: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "10px",
  },

  messageBottom: {
    fontSize: "12px",
    marginTop: "20px",
  },
}));

export default function Message({ message, own }) {
  const classes = useStyles();

  return (
    <Box className={own ? classes.rootRight : classes.rootLeft}>
      <Box className={own ? classes.messageRight : classes.messageLeft}>
        <img className={classes.messageImg} src={photo} alt="" />
        <Typography>{message.text}</Typography>
        <Box className={classes.messageBottom}>{format(message.createdAt)}</Box>
      </Box>
    </Box>
  );
}
