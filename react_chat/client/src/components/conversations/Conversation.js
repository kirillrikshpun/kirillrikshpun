import { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, Typography, Box } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteConvButton from "../conversations/DeleteConvButton/DeleteConvButton";
import photo from "../../photo.png";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  const useStyles = makeStyles((theme) => ({
    conversation: {
      backgroundColor: "#3D3D5D",
      transition: "0.7s",
      flex: "1 1 30%",
      margin: "0.1px",
      "&:hover": {
        backgroundColor: "#363656",
      },
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    const companionId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + companionId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <Card className={classes.conversation} sx={{ display: "flex" }}>
      <Box
        className={classes.conversation}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <CardContent
          sx={{
            color: "#DBD9FA",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardMedia
            component="img"
            style={{
              borderRadius: "50%",
              display: "flex",
            }}
            sx={{ width: 70 }}
            image={photo}
          />

          <Typography
            style={{ cursor: "pointer" }}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {user?.username}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
            }}
          >
            <DeleteConvButton currConv={conversation} currentUser={user} />
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
