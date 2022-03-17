import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === "light" ? "#F2F7FA" : "gray.900",
        color: props.colorMode === "light" ? "gray.900" : "gray.50",
      },
    }),
  },
});
