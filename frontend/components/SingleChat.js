import { ChatState } from "@/context/chatProvider";
import {
  Box,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import React, { useEffect, useState } from "react";
import { Center, Square, Circle } from "@chakra-ui/react";
// import "./styles.css";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import ScrollableChat from "../components/ScrollableChat";
import { io } from "socket.io-client";
import animationData from "../animations/typing1.json";
const ENDPOINT = "http://localhost:5000";
var socket;
var selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const toast = useToast();
  const {
    notifications,
    setNotifications,
    selectedChat,
    user,
    setSelectedChat,
  } = ChatState();

  const getMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/messages/${selectedChat._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages(data);
      // console.log(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "network error in fetching messages",
        duration: 1000,
        isClosable: true,
        status: "error",
      });
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    if (!newMessage) return;
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      setNewMessage("");
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/messages",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(data);
        // socket.emit("join chat", selectedChat._id);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "network error",
          duration: 1000,
          isClosable: true,
          status: "error",
        });
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    getMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //notifications
        if (!notifications.includes(newMessageRecieved)) {
          setNotifications([newMessageRecieved, ...notifications]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const getSender = (loggedUser, users, chat) => {
    if (!users) {
      // console.log(chat);
    }
    if (users[0]._id == loggedUser._id) return users[1].name;
    else return users[0].name;
  };
  const getSenderFull = (loggedUser, users, chat) => {
    if (!users) {
      // console.log(chat);
    }
    if (users[0]._id == loggedUser._id) return users[1];
    else return users[0];
  };

  // return (
  //   <>
  //     {selectedChat ? (
  //       <Box>
  //         <Box w={"100%"} h="20%" bg="whiteAlpha.400">
  //           <Flex justify={"space-between"}>
  //             <ArrowBackIcon
  //               d={{ base: "flex", md: "none" }}
  //               onClick={() => {
  //                 setSelectedChat("");
  //               }}
  //             />
  //             <Text>
  //               {!selectedChat?.isGroupChat
  //                 ? getSender(user, selectedChat.users)
  //                 : selectedChat?.chatName}
  //             </Text>
  //             {!selectedChat?.isGroupChat ? (
  //               <ProfileModal user={getSenderFull(user, selectedChat.users)}>
  //                 <ViewIcon />
  //               </ProfileModal>
  //             ) : (
  //               <UpdateGroupChatModal
  //                 fetchAgain={fetchAgain}
  //                 setFetchAgain={setFetchAgain}
  //               />
  //             )}
  //           </Flex>
  //         </Box>

  //         <Box
  //           d="flex"
  //           flexDir="column"
  //           justifyContent="flex-end"
  //           p={3}
  //           bg="#E8E8E8"
  //           w="100%"
  //           h="100%"
  //           borderRadius="lg"
  //           overflowY="hidden"
  //         >
  //           <Box d="flex">
  //             <ScrollableChat messages={messages} />
  //           </Box>
  //           <FormControl onKeyDown={sendMessage}>
  //             <InputGroup>
  //               <Input
  //                 variant="filled"
  //                 bg="#E0E0E0"
  //                 placeholder="Enter a message.."
  //                 value={newMessage}
  //                 onChange={typingHandler}
  //               />
  //             </InputGroup>
  //           </FormControl>
  //         </Box>
  //       </Box>
  //     ) : (
  //       <Center h="100vh" bg="white">
  //         <Text fontSize="3xl">Click on user to begin Chat!</Text>
  //       </Center>
  //     )}
  //   </>
  // );

  return (
    <Box h={"600px"}>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <Flex justify={"space-between"}>
              <IconButton
                d={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
              {messages &&
                (!selectedChat.isGroupChat ? (
                  <>
                    {getSender(user, selectedChat.users)}
                    <ProfileModal
                      user={getSenderFull(user, selectedChat.users)}
                    >
                      <ViewIcon />
                    </ProfileModal>
                  </>
                ) : (
                  <>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  </>
                ))}
            </Flex>
          </Text>
          <Box
            d="flex"
            flexDir="column"
            alignItems={"center"}
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="80%"
            borderRadius="lg"
            overflowY="scroll"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
          </Box>
          <Box mt="1">
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                borderLeftRadius={"15px"}
                borderRightRadius={"15px"}
                border={"1g"}
                borderWidth="1px"
                borderColor={"black"}
                variant="filled"
                bg="whiteAlpha.700"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SingleChat;
