import { Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

// import { Container } from './styles';

const Title: React.FC = () => {
  return (
    <Flex mb={6}>
      <Heading size='2xl' color="#1db954">Spot</Heading>
      <Text fontWeight="light" fontSize="4xl">
        MyArtist
      </Text>
    </Flex>
  );
};

export default Title;
