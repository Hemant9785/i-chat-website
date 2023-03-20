import { ChatState } from "@/context/chatProvider";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Center, Square, Circle } from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, user, setSelectedChat } = ChatState();
  const getSender = (loggedUser, users, chat) => {
    if (!users) {
      console.log(chat);
    }
    if (users[0]._id == loggedUser._id) return users[1].name;
    else return users[0].name;
  };
  const getSenderFull = (loggedUser, users, chat) => {
    if (!users) {
      console.log(chat);
    }
    if (users[0]._id == loggedUser._id) return users[1];
    else return users[0];
  };
  return (
    <>
      {selectedChat ? (
        <Box>
          <Box w={"100%"} h="20%" bg="whiteAlpha.400">
            <Flex justify={"space-between"}>
              <ArrowBackIcon
                d={{ base: "flex", md: "none" }}
                onClick={() => {
                  setSelectedChat("");
                }}
              />
              <Text>
                {!selectedChat?.isGroupChat
                  ? getSender(user, selectedChat.users)
                  : selectedChat?.chatName}
              </Text>
              {!selectedChat?.isGroupChat ? (
                <ProfileModal user={getSenderFull(user, selectedChat.users)}>
                  <ViewIcon />
                </ProfileModal>
              ) : (
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              )}
            </Flex>
          </Box>
        </Box>
      ) : (
        <Center h="100vh" bg="white">
          <Text fontSize="3xl">Click on user to begin Chat!</Text>
        </Center>
      )}
    </>
  );
};

export default SingleChat;
