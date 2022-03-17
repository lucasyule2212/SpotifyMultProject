import { Button } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import React, { useEffect } from "react";
import { FaSpotify } from "react-icons/fa";

// import { Container } from './styles';

export default function SignInButton() {
  const session = useSession();

  return (
    <Button
      bg="#1db954"
      rightIcon={<FaSpotify />}
      onClick={() =>
        session?.status === "authenticated" ? signOut() : signIn("spotify")
      }
    >
      {session.data ? session?.data.user?.name : "Sign in with Spotify"}
    </Button>
  );
}
