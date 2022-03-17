import { Flex, Switch, useColorMode } from "@chakra-ui/react";
import React from "react";
import SignInButton from "../SignInButton";

// import { Container } from './styles';

const Header: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Flex w="100%" justifyContent="end" p={4} h={100} align="center" gap={8}>
      <Switch size="lg" onChange={() => toggleColorMode()} />
      <SignInButton />
    </Flex>
  );
};

export default Header;
