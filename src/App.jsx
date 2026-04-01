import { useState } from "react";
import AppRouter from "./routes/AppRouter";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from 'react-helmet-async';
import WelcomeCover from "./components/WelcomeCover";
import { AnimatePresence, motion } from "framer-motion";

import "./App.css";
import theme from "./utils/theme";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleEnter = () => {
    setShowIntro(false);
  };

  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>

        <AnimatePresence>
          {showIntro && (
            <motion.div
              key="intro"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: "fixed", inset: 0, zIndex: 9999 }}
            >
              <WelcomeCover onEnter={handleEnter} />
            </motion.div>
          )}
        </AnimatePresence>

        {!showIntro && <AppRouter />}
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
