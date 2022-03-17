import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useArtistDataContext } from "../../contexts/ArtistDataContext";
import queryClient from "../../services/queryClient";
import spotifyApi from "../../services/spotifyApi";
import { toast } from "../../pages/_app";
// import { Container } from './styles';

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const { setArtistData, setIsLoading } = useArtistDataContext();
  const session = useSession();

  function handleSetSearchText(event) {
    event.preventDefault();
    setSearchText(event.target.value);
  }
  async function handleSearch() {
    if (searchText) {
      setIsLoading(true);
      const params = {
        q: `artist:${searchText}`,
        type: "artist",
      };

      const queryParamString = new URLSearchParams(params).toString();

      const { data } = await spotifyApi.get(`/search?${queryParamString}`, {
        headers: {
          Authorization: "Bearer " + session.data?.user?.accessToken,
        },
      });

      if (!data.artists.items.length) {
        toast({
          title: "Ops... nenhum artista foi encontrado!",
          description: "Tente buscar outro nome",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom",
        });
        setIsLoading(false);
        return;
      }

      const artistID = await data.artists.items[0].id;
      const artistName = await data.artists.items[0].name;
      const artistImage = await data.artists.items[0].images[0];
      const artistLink = await data.artists.items[0].external_urls.spotify;

      const { data: albumsData } = await spotifyApi
        .get(`/artists/${artistID}/albums`, {
          headers: {
            Authorization: "Bearer " + session.data?.user?.accessToken,
          },
        })
        .then();

      const artistAlbums = await albumsData.items.map(
        (element) => ({
          link: element.external_urls.spotify,
          release_date: element.release_date,
          name: element.name,
          image: element.images[0],
        })
      );
      const artistObject = {
        id: artistID,
        name: artistName,
        links: artistLink,
        image: artistImage,
        albums: artistAlbums,
      };

      setArtistData(artistObject);
      setIsLoading(false);
    }
  }

  return (
    <Flex w={300} h={200} direction="column" align="center" gap={2}>
      {session.status === "authenticated" ? (
        <>
          {" "}
          <Input
            border="2px"
            value={searchText}
            onChange={(event) => handleSetSearchText(event)}
            placeholder="Quem você quer descobrir hoje?"
          />
          <Button onClick={handleSearch} bg="#1db954" w={300}>
            Buscar
          </Button>
        </>
      ) : (
        <Text>Faça o login para começar a utilizar</Text>
      )}
    </Flex>
  );
};

export default Search;
