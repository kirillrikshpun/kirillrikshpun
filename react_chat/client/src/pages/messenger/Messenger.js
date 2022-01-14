import MessengerLogo from "../../components/topbar/MessengerLogo";
import ConversationsList from "../../components/conversations/ConversationsList";

import UsersBar from "../../components/usersBar/UsersBar";
import Chat from "../../components/chat/Chat";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ConvContext } from "../../context/ConvContext";
import Drawer from "@mui/material/Drawer";
import { Box, Grid, makeStyles } from "@material-ui/core";

import { io } from "socket.io-client";
import Topbar from "../../components/topbar/Topbar";

const useStyles = makeStyles((theme) => ({
  messenger: {
    height: "100vh",
    backgroundColor: "#DCDDF5",
  },

  conversationList: {
    backgroundColor: "#3D3D5D",
    height: "100%",
  },

  userslist: {
    backgroundColor: "#eeeef5",
    height: "100%",
  },

  chatBoxWrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#DCDDF5",
    justifyContent: "space-between",
    position: "relative",
  },

  conversationItem: {
    transition: "0.7s",
    flex: "1 1 30%",
    margin: "0.1px",
  },

  chatTextArea: {
    width: "90%",
  },

  conversation: {
    flex: "1 1 30%",
    margin: "0.1px",
    "&:hover": {
      backgroundColor: "#363656",
    },
  },

  chatWrapper: { padding: "10px", height: "100%" },

  chatMessageInput: {
    display: "flex",
    width: "100%",
    padding: "10px",
  },
}));

const drawerWidth = 240;

export default function Messenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef(io("ws://localhost:8900"));
  const { user } = useContext(AuthContext);
  const { conv } = useContext(ConvContext);
  const [open, setOpen] = useState(false);

  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {});
  }, []);

  const InsideDrawer = (
    <>
      <Box style={{ flex: 1.5 }}>
        <section>
          <Box style={{ padding: "10px", height: "100%" }}>
            <UsersBar />
          </Box>
        </section>
      </Box>
    </>
  );

  return (
    <>
      <Grid classes={{ root: classes.messenger }} container>
        <Grid item xs={3} style={{ backgroundColor: "#2E2E4F" }}>
          <Box className={classes.conversationList}>
            <MessengerLogo />
            <ConversationsList
              conversationsList={conv}
              currentUser={user}
              setCurrentChat={setCurrentChat}
            />
          </Box>
        </Grid>

        <Grid item xs={9}>
          <Box>
            <Topbar user={user} toggleDrawerOpen={toggleDrawerOpen} />
            <Chat currentChat={currentChat} user={user} />
          </Box>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <Box className={classes.userslist}>{InsideDrawer}</Box>
          </Drawer>
        </Grid>
      </Grid>
    </>
  );
}
