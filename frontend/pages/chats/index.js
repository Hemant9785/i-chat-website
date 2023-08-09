import React, { useEffect } from "react";
import { Stack, HStack, VStack, Flex } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "@/context/chatProvider";
import SideDrawer from "@/components/miscellaneous/SideDrawer";
import MyChats from "../../components/MyChats";
import ChatBox from "@/components/chatBox";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
const chats = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  // console.log(user);
  return (
    <Box borderWidth={"10px"} borderColor="yellow" h={"100vh"}>
      {user && <SideDrawer fetchAgain={fetchAgain} />}
      <Box
        borderWidth={"10px"}
        borderColor="blue"
        d="flex"
        justifyContent="space-between"
        w="100%"
        h="93%"
        // h="91.5vh"
        p="10px"
      >
        <div
          style={{
            height: "100%",
            border: "5px solid green",
          }}
        >
          <Flex justify={"space-between"}>
            {/* <div
            style={{
              display: "flex",
            }}
          > */}
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && (
              <ChatBox
                borderWidth={"10px"}
                borderColor="red"
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            )}
            {/* </div> */}
          </Flex>
        </div>
      </Box>
    </Box>
    // <Box width="100%">
    //   {user && <SideDrawer />}
    //   {user && <MyChat />}
    //   {user && <chatBox />}
    // </Box>
  );
};

export default chats;
