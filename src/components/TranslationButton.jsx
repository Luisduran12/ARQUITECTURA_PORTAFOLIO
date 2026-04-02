import { useState, useEffect, memo } from "react";
import { Button, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { cloudUrl } from "../utils/cloudinary";

const FLAG_ES = cloudUrl("public/publico/flag_es.webp", { w: 120 });
const FLAG_EN = cloudUrl("public/publico/flag_us.webp", { w: 120 });

function TranslationButton() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "es"
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    const next = language === "es" ? "en" : "es";
    setLanguage(next);
    localStorage.setItem("language", next);
    i18n.changeLanguage(next);
  };

  // Show the flag of the OTHER language (the one you'll switch TO)
  const flagUrl = language === "es" ? FLAG_EN : FLAG_ES;
  const label = language === "es" ? "ENG" : "ESP";

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
        backgroundImage={`url(${flagUrl})`}
        color="white"
        bgSize="cover"
        bgPos="center"
        _hover="none"
        _active="none"
        textShadow="1px 1px 2px black"
        aria-label={`Cambiar idioma a ${label}`}
      >
        <b>{label}</b>
      </Button>
    </Box>
  );
}

export default memo(TranslationButton);
