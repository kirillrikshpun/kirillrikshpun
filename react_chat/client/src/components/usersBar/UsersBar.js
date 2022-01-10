import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

import { AuthContext } from "../../context/AuthContext";
import { ConvContext } from "../../context/ConvContext";

const useStyles = makeStyles(() => ({
  rightbarFollowButton: {
    width: "50%",
    justifyContent: "center",
    marginTop: "30px",
    marginBottom: "10px",
    border: "none",
    backgroundColor: "#3D3D5D",
    color: "white",
    borderRadius: "5px",
    padding: "5px 10px",
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    width: "7em",
  },

  input: {
    backgroundColor: "#eeeef5",
    "&:focus": {
      outline: "none!important",
    },
    borderWidth: "0px",
    width: "70%",
  },
}));

export default function UsersBar() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(``);
  const { user: currentUser, fetchUser } = useContext(AuthContext);
  const { getConversations } = useContext(ConvContext);

  const classes = useStyles();

  useEffect(() => {
    console.log("render");
  }, []);

  useEffect(() => {
    fetchUsersBar();
  }, [currentUser]);

  for (let i = 0; i < users.length; i++) {
    if (users[i]._id === currentUser._id) {
      users.splice(i, 1);
    }
  }

  const fetchUsersBar = () => {
    const getUsers = async () => {
      const res = await axios.get("/users/all");
      setUsers(res.data);
    };
    getUsers();
  };

  const handleClick = async (item, followed) => {
    try {
      await axios.put(
        `/users/${item._id}/${followed ? "unfollow" : "follow"}`,
        {
          userId: currentUser._id,
        }
      );
      fetchUser();
      getConversations();
    } catch (err) {
      console.log(err);
    }
  };

  const usersBar = (search) => {
    if (search.length === 0) {
      return "";
    } else
      return (
        <Typography>
          {users
            .filter((u) =>
              u.username.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, key) => (
              <Box
                style={{
                  alignItems: "baseline",
                  justifyContent: "space-around",
                  display: "flex",
                }}
              >
                <Typography
                  style={{ width: "50%", color: "#3D3D5D" }}
                  key={key}
                >
                  {item.username}
                </Typography>
                <button
                  className={classes.rightbarFollowButton}
                  onClick={() => {
                    handleClick(
                      item,
                      currentUser.followings.includes(item._id)
                    );
                  }}
                >
                  {currentUser.followings.includes(item._id)
                    ? "unfollow"
                    : "follow"}
                </button>
              </Box>
            ))}
        </Typography>
      );
  };

  return (
    <Box>
      <section>
        <input
          className={classes.input}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        {usersBar(search)}
      </section>
    </Box>
  );
}
