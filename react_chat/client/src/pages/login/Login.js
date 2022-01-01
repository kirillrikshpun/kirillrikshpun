import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress, Box, makeStyles } from "@material-ui/core";

import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
  login: {
    backgroundColor: "#2E2E4F",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  loginWrapper: {
    width: "70%",
    height: "70%",
    display: "flex",
  },

  loginSide: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  loginBox: {
    height: "300px",
    padding: "20px",
    backgroundColor: "#DCDDF5",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  loginInput: {
    height: "50px",
    borderRadius: "10px",
    border: "1px solid gray",
    fontSize: "18px",
    paddingLeft: "20px",
  },

  loginButton: {
    height: "50px",
    color: "#DCDDF5",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#232342",
    color: "white",
    fontSize: "20px",
    fontWeight: "500",
    cursor: "pointer",
  },

  loginRegisterButton: {
    width: "60%",
    color: "#DCDDF5",
    alignSelf: "center",
    height: "50px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#2E2E4F",
    color: "white",
    fontSize: "20px",
    fontWeight: "500",
    cursor: "pointer",
  },
}));

export default function Login() {
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const { isFetching, dispatch } = useContext(AuthContext);

  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const handleRegister = () => {
    history.push("/register");
  };

  return (
    <Box className={classes.login}>
      <Box className={classes.loginWrapper}>
        <Box className={classes.loginSide}>
          <h3
            style={{
              color: "#DCDDF5",
              fontSize: "50px",
              fontWeight: "800",
              marginBottom: "10px",
            }}
          >
            The ROOM
          </h3>
          <span style={{ color: "#DCDDF5", fontSize: "24px" }}>
            Connect with friends and the world around you.
          </span>
        </Box>
        <Box className={classes.loginSide}>
          <form className={classes.loginBox} onSubmit={handleClick}>
            <input
              className={classes.loginInput}
              placeholder="Email"
              type="email"
              required
              ref={email}
            />
            <input
              className={classes.loginInput}
              placeholder="Password"
              type="password"
              required
              minLength="6"
              ref={password}
            />
            <button
              className={classes.loginButton}
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? <CircularProgress size="20px" /> : "Log In"}
            </button>
            <button
              className={classes.loginRegisterButton}
              onClick={() => handleRegister()}
            >
              {isFetching ? (
                <CircularProgress size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
