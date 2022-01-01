import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import UsersBar from "../../components/usersBar/UsersBar";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ConvContext } from "../../context/ConvContext";

import { useTheme } from "@mui/material/styles";
import {
  OutlinedInput,
  Box,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Card } from "react-bootstrap";

import axios from "axios";
import { io } from "socket.io-client";

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

  messengerHead: {
    color: "#DBD9FA",
    height: "50px",
    padding: "10px",
    backgroundColor: "#2E2E4F",
  },

  chat: {
    height: "calc(100vh - 170px)",
    overflowY: "auto",
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

  chatBoxBottom: {
    marginTop: "5px",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  chatWrapper: { padding: "10px", height: "100%" },

  chatMessageInput: {
    display: "flex",
    width: "100%",
    padding: "10px",
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

  noConversationText: {
    position: "absolute",
    top: "10%",
    fontSize: "50px",
    color: "#8785AB",
    cursor: "default",
  },
}));

export default function Messenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef(io("ws://localhost:8900"));
  const { user } = useContext(AuthContext);
  const { conv } = useContext(ConvContext);

  const classes = useStyles();

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  console.log(socket);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.current.on("getMessage", (data) => {});
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const InsideDrower = (
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
      <>
        <Grid classes={{ root: classes.messenger }} container>
          <Grid item xs={2} style={{ backgroundColor: "#2E2E4F" }}>
            <Box className={classes.conversationList}>
              <Box className={classes.messengerHead}>
                <Typography variant="h1">The ROOM</Typography>
              </Box>

              <Box>
                {conv.map((c) => (
                  <>
                    <Box
                      className={classes.conversationItem}
                      key={c._id}
                      onClick={() => setCurrentChat(c)}
                    >
                      <Card className={classes.conversationCard}>
                        <Conversation conversation={c} currentUser={user} />
                      </Card>
                    </Box>
                  </>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Box className={classes.messengerHead}>
                <Typography variant="h1">{user.username}</Typography>
              </Box>
              <Box className={classes.chatWrapper}>
                {currentChat ? (
                  <>
                    <Box className={classes.chat}>
                      {messages.map((m) => (
                        <Box ref={scrollRef}>
                          <Message message={m} own={m.sender === user._id} />
                        </Box>
                      ))}
                    </Box>
                    <Box className={classes.chatBoxBottom}>
                      <Box className={classes.chatMessageInput}>
                        <OutlinedInput
                          className={classes.chatTextArea}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Please enter text"
                        />
                        <button
                          className={classes.chatSubmitButton}
                          onClick={handleSubmit}
                        >
                          Send
                        </button>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <Box className={classes.noConversationText}>
                    Open a conversation to start a chat...
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box className={classes.userslist}>{InsideDrower}</Box>
          </Grid>
        </Grid>
      </>
    </>
  );
}
