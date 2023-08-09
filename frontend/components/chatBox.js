import { ChatState } from "@/context/chatProvider";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    // <div
    //   style={
    //     {
    //       // height: "10%",
    //     }
    //   }
    // >
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      // borderWidth={"10px"}
      borderColor="red"
      h={"90%"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
    // </div>
  );
};

export default ChatBox;
