import { Box, makeStyles } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles(() => ({
  chatMessageInput: {
    display: "flex",
    width: "100%",
    padding: "10px",
  },

  chatTextArea: {
    width: "90%",
  },

  chatSubmitButton: {
    width: "70px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#222241",
    color: "white",
  },
}));

export default function InputArea({ setNewMessage, handleSubmit }) {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.chatMessageInput}>
        <OutlinedInput
          className={classes.chatTextArea}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Please enter text"
        />
        <button className={classes.chatSubmitButton} onClick={handleSubmit}>
          Send
        </button>
      </Box>
    </>
  );
}
