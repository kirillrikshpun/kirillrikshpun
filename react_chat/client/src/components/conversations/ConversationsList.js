import Conversation from "../../components/conversations/Conversation";

import { Box } from "@material-ui/core";

export default function ConversationsList({
  conversationsList,
  currentUser,
  setCurrentChat,
}) {
  return (
    <>
      <Box>
        {conversationsList.map((c) => (
          <Conversation
            conversation={c}
            currentUser={currentUser}
            setCurrentChat={setCurrentChat}
          />
        ))}
      </Box>
    </>
  );
}
