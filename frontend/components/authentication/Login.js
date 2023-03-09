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
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setshowPassword(!showPassword);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    alert("submit");
    console.log(email, password);
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
