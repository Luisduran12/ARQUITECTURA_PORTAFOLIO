import { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function TranslationButton() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "es"
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const buttonStyles = {
    es: {
      backgroundImage: "url(./publico/flag_es.png)",
      color: "white",
    },
    en: {
      backgroundImage: "url(./publico/flag_us.png)",
      color: "white",
    },
  };

  return (
    <Box
      position="fixed"
      top={{ base: "110px", md: "90px" }}
      right="25px"
      zIndex="12"
    >
      <Button
        maxW="60px"
        minW="60px"
        onClick={toggleLanguage}
        backgroundImage={
          language === "es"
            ? buttonStyles.en.backgroundImage
            : buttonStyles.es.backgroundImage
        }
        color="white"
        bgSize="cover"
        bgPos="center"
        _hover="none"
        _active="none"
        textShadow="1px 1px 2px black"
      >
        <b>{language === "es" ? "ENG" : "ESP"}</b>
      </Button>
    </Box>
  );
}

export default TranslationButton;
