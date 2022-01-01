import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const fetchUser = async () => {
    const res = await axios.get("/auth/getUser", {
      headers: { authorization: `berar ${state.user.token}` },
    });
    console.log(res.data);
    dispatch({ type: "FETCH_USER", payload: res.data });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
