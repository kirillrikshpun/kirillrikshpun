import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const INITIAL_STATE = {};

export const ConvContext = createContext(INITIAL_STATE);

export const ConvContextProvider = ({ children }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [conv, setConv] = useState([]);

  const getConversations = async () => {
    try {
      const res = await axios.get("/conversations/" + currentUser?._id);
      console.log(res.data);
      setConv(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConversations();
  }, [currentUser?._id]);

  return (
    <ConvContext.Provider value={{ conv, getConversations }}>
      {children}
    </ConvContext.Provider>
  );
};
