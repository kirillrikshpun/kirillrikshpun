import axios from "axios";
import { useRef } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
  register: {
    backgroundColor: "#2E2E4F",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  registerWrapper: {
    width: "70%",
    height: "70%",
    display: "flex",
  },

  registerSide: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  registerBox: {
    height: "400px",
    padding: "20px",
    backgroundColor: "#DCDDF5",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  registerInput: {
    height: "50px",
    borderRadius: "10px",
    border: "1px solid gray",
    fontSize: "18px",
    paddingLeft: "20px",
  },

  registerButton: {
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

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const classes = useStyles();

  const handleLogin = () => {
    history.push("/login");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        handleLogin();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box className={classes.register}>
      <Box className={classes.registerWrapper}>
        <Box className={classes.registerSide}>
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
        <Box className={classes.registerSide}>
          <form className={classes.registerBox} onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className={classes.registerInput}
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className={classes.registerInput}
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className={classes.registerInput}
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className={classes.registerInput}
              type="password"
            />
            <button className={classes.registerButton} type="submit">
              Sign Up
            </button>
            <button
              className={classes.loginRegisterButton}
              onClick={() => handleLogin()}
            >
              Log into Account
            </button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
