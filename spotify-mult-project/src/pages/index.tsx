import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { format } from "date-fns";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import Header from "../components/Header";
import Search from "../components/Search";
import Title from "../components/Title";
import { useArtistDataContext } from "../contexts/ArtistDataContext";

const Home: NextPage = () => {
  const { colorMode } = useColorMode();
  const { artistData, isLoading } = useArtistDataContext();

  useEffect(() => {
    console.log(artistData);
  }, [artistData]);

  const session = useSession();

  return (
    <Box>
      <Flex h="100vh" direction="column" gap={20}>
        <Header />
        <Flex
          justifySelf="center"
          alignSelf="center"
          direction="column"
          align="center"
          p={6}
        >
          <Title />
          <Search />
          {isLoading && session.status === "authenticated" ? (
            <Flex direction="column" gap={6} align="center">
              <Spinner />
              <Text>Carregando resultados</Text>
            </Flex>
          ) : session.status === "authenticated" && artistData ? (
            <Flex
              w={500}
              h="fit-content"
              // maxH={500}
              // overflowY="auto"
              bg={colorMode === "light" ? "gray.200" : "gray.800"}
              boxShadow="md"
              borderRadius="md"
              p={8}
              align="start"
              sx={{ scrollbarWidth: "none" }}
            >
              {artistData ? (
                <Flex key={artistData.id} w="100%" direction="column">
                  <Flex w="100%" justify="center">
                    <Flex gap={4} direction="column" align="center">
                      <Image
                        alt={artistData.name}
                        borderRadius="full"
                        src={artistData.image.url}
                        boxSize="100px"
                      />
                      <Text fontSize="1.8rem" fontWeight="bold" m={0} p={0}>
                        {artistData.name}
                      </Text>
                      <Link
                        href={artistData.links}
                        isExternal
                        _hover={{ textDecoration: "none" }}
                      >
                        <Button colorScheme="whatsapp" variant="outline">
                          Ver no Spotify
                        </Button>
                      </Link>
                    </Flex>
                  </Flex>
                  <Flex mt={8} direction="column" w="100%">
                    <Text
                      w="100%"
                      pl={1}
                      borderLeft="3px solid #1db954"
                      fontSize="1.0rem"
                      fontWeight="bold"
                    >
                      Albums do artista:
                    </Text>
                    <SimpleGrid mt={4} columns={2} spacing={10}>
                      {artistData.albums.map((element) => {
                        return (
                          <Link
                            key={element.name}
                            href={element.link}
                            isExternal
                            _hover={{ textDecoration: "none" }}
                          >
                            <Flex
                              w={200}
                              minH={250}
                              h="fit-content"
                              bg={colorMode === "light" ? "#fff" : "gray.900"}
                              p={4}
                              direction="column"
                              shadow="md"
                              borderRadius="md"
                              align="center"
                              justify="center"
                            >
                              <Image
                                alt={element.name}
                                borderRadius="md"
                                shadow="base"
                                src={element.image.url}
                                boxSize="120px"
                                mb={2}
                              />
                              <Text
                                textAlign="center"
                                noOfLines={2}
                                fontSize="lg"
                                fontWeight="bold"
                                mb={1}
                              >
                                {element.name}
                              </Text>
                              <Text fontSize="xs">
                                {format(
                                  new Date(element.release_date),
                                  "dd/MM/yyy"
                                )}
                              </Text>
                              <Text
                                color={
                                  colorMode === "light"
                                    ? "gray.400"
                                    : "gray.500"
                                }
                                fontSize="xx-small"
                              >
                                Data de Lançamento
                              </Text>
                            </Flex>
                          </Link>
                        );
                      })}
                    </SimpleGrid>
                  </Flex>
                </Flex>
              ) : (
                <Flex direction="column" gap={6} align="center">
                  <Spinner />
                  <Text>Carregando resultados</Text>
                </Flex>
              )}
            </Flex>
          ) : (
            ""
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
