import { ColorModeScript } from "@chakra-ui/react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import theme from "../styles/theme";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="shortcut icon" href={"public\favicon.ico"} />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
