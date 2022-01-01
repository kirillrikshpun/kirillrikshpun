import React, { useContext } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@material-ui/core";

import { AuthContext } from "../../../context/AuthContext";
import { ConvContext } from "../../../context/ConvContext";

export default function DeleteConvButton({ currConv }) {
  const { user: currentUser, fetchUser } = useContext(AuthContext);
  const { getConversations } = useContext(ConvContext);

  const removeConversation = () => {
    if (currConv.members.includes(currentUser._id)) {
      currConv.members.forEach(async (e) => {
        if (e !== currentUser._id) {
          try {
            await axios.delete(`/conversations/${e}`);
            await axios.put(`/users/${e}/unfollow`, {
              userId: currentUser._id,
            });
            fetchUser();
            getConversations();
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  };

  return (
    <Box style={{ cursor: "pointer" }}>
      <DeleteIcon onClick={removeConversation} />
    </Box>
  );
}
