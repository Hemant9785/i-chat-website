import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassowrd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {};
  const showPasswordHandler = () => {
    setshowPassword(!showPassword);
  };

  const showConfirmPasswordHandler = () => {
    setshowConfirmPassowrd(!showConfirmPassword);
  };

  const postDetails = (img) => {};
  return (
    <Flex width={"full"} justifyContent="center" align="center">
      <Box p={2} width="full" borderWidth={1} borderRadius={8} boxShadow="lg">
        <form onSubmit={submitHandler}>
          <FormControl isRequired={true}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>

          <FormControl mt={6} isRequired={true}>
            <FormLabel>Email Address</FormLabel>
            <Input
              placeholder="Enter Your Email Address"
              type="text"
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
                <Button h="1.5rem" size="sm" onClick={showPasswordHandler}>
                  {showPassword ? "hide" : "show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mt={6} isRequired={true}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter Your Password Again !."
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <InputRightElement width={"3rem"}>
                <Button
                  h="1.5rem"
                  size="sm"
                  onClick={showConfirmPasswordHandler}
                >
                  {showConfirmPassword ? "hide" : "show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mt={6} id={"pic"}>
            <FormLabel>Upload your Picture</FormLabel>
            <Input
              type="file"
              p={1.5}
              accept={"image/*"}
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </FormControl>

          <Button
            variant={"outline"}
            type={"submit"}
            mt={6}
            width={"full"}
            colorScheme="blue"
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Signup;
