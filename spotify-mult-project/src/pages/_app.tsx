import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../styles/theme";
import { QueryClientProvider } from "react-query";
import queryClient from "../services/queryClient";
import { SessionProvider } from "next-auth/react";
import { ArtistDataProvider } from "../contexts/ArtistDataContext";

export const toast = createStandaloneToast({ theme });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider resetCSS theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ArtistDataProvider>
            <Component {...pageProps} />
          </ArtistDataProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
