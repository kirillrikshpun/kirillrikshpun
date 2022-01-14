import { useState, useRef, useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import Message from "../message/Message";
import axios from "axios";
import { io } from "socket.io-client";
import InputArea from "./InputArea";

const useStyles = makeStyles((theme) => ({
  messengerHead: {
    color: "#DBD9FA",
    height: "50px",
    padding: "10px",
    backgroundColor: "#2E2E4F",
  },

  chatWrapper: { padding: "10px", height: "100%" },

  chat: {
    height: "calc(100vh - 170px)",
    overflowY: "auto",
  },

  chatBoxBottom: {
    marginTop: "5px",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  chatMessageInput: {
    display: "flex",
    width: "100%",
    padding: "10px",
  },

  chatTextArea: {
    width: "90%",
  },

  chatBoxBottom: {
    marginTop: "5px",
    alignItems: "center",
    justifyContent: "space-evenly",
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

export default function Chat({ user, currentChat }) {
  const classes = useStyles();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const socket = useRef(io("ws://localhost:8900"));

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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
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
              <InputArea
                setNewMessage={setNewMessage}
                handleSubmit={handleSubmit}
              />
            </Box>
          </>
        ) : (
          <Box className={classes.noConversationText}>
            Open a conversation to start a chat...
          </Box>
        )}
      </Box>
    </>
  );
}
