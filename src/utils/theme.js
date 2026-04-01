import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Playfair Display', serif",
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#1E1D1D",
        color: "white",
        scrollBehavior: "smooth",
      },
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: "#1E1D1D",
      },
      "::-webkit-scrollbar-thumb": {
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "10px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "rgba(255, 255, 255, 0.3)",
      },
    },
  },
});

export default theme;
