import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Toast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
const Login = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setshowPassword(!showPassword);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the details",
        duration: 2000,
        status: "error",
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        },
        config
      );

      toast({
        title: "login Successfull",
        duration: 1000,
        isClosable: true,
        position: "bottom",
        status: "success",
      });
      setLoading(false);
      history?.push("/chats");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occured",
        description: error?.response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <Flex width={"full"} justifyContent="center" align="center">
      <Box p={2} width="full" borderWidth={1} borderRadius={8} boxShadow="lg">
        <form onSubmit={submitHandler}>
          <FormControl isRequired={true}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="text"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>

          <FormControl mt={6} isRequired={true}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter Your Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement width={"3rem"}>
                <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                  {showPassword ? "hide" : "show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            variant={"outline"}
            type={"submit"}
            mt={6}
            width={"full"}
            colorScheme="blue"
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
