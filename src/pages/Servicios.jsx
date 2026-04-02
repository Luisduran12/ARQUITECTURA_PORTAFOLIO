import React, { memo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../components/OptimizedImage";
import { cloudUrl } from "../utils/cloudinary";

function Servicios() {
  const { t } = useTranslation();

  const services = [
    { img: "public/servicios/FotoRealista.webp", text: "Foto Realista" },
    { img: "public/servicios/Interiores.webp", text: "Interiores" },
    { img: "public/servicios/TresD.webp", text: "3D" },
    { img: "public/servicios/Virtuales.webp", text: "Virtuales" },
  ];

  const textos = [
    { titulo: t("servicioPage.renderTitulo"), parrafo: t("servicioPage.renderParrafo") },
    { titulo: t("servicioPage.visualTitulo"), parrafo: t("servicioPage.visualParrafo") },
    { titulo: t("servicioPage.animaTitulo"), parrafo: t("servicioPage.animaParrafo") },
    { titulo: t("servicioPage.recorTitulo"), parrafo: t("servicioPage.recorParrafo") },
  ];

  const heroSrc = cloudUrl("public/RENDERS/ZONA_TVs/zt4.webp", { w: 1920 });
  const asideSrc = cloudUrl("public/RENDERS/ZONA_TVs/zt5.webp", { w: 800 });

  return (
    <>
      {/* ── Hero Banner ── */}
      <Flex
        direction="column"
        justifyContent="center"
        h="70vh"
        overflow="hidden"
        position="relative"
        p="30px"
      >
        <OptimizedImage
          src={heroSrc}
          alt="Fondo servicios"
          priority
          borderRadius="0"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          aspectRatio="none"
        />
        <Flex
          position="absolute"
          top="10%"
          left="0"
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          className="slide-in-left"
        >
          <Text
            fontSize={["3xl", "4xl", "5xl", "6xl"]}
            fontWeight="bold"
            color="white"
            textShadow="2px 2px 8px rgba(0, 0, 0, 0.9)"
            className="changeText"
          >
            {t("servicioPage.portada")}
          </Text>
        </Flex>
      </Flex>

      {/* ── Services List + Sidebar Image ── */}
      <Box
        position="relative"
        display="flex"
        flexDirection={{ base: "column", md: "column", lg: "row" }}
      >
        <Box flex="1">
          {services.map((service, index) => (
            <Flex
              key={index}
              bg="#1e1d1d"
              p="20px"
              alignItems="center"
              flexDirection={{ base: "column", sm: "row" }}
            >
              <OptimizedImage
                src={cloudUrl(service.img, { w: 160 })}
                alt={service.text}
                width="80px"
                height="80px"
                aspectRatio="1/1"
                ml="20px"
                mr="20px"
                mb="10px"
                borderRadius="md"
              />
              <Box maxW="700px">
                <Text
                  fontSize="xl"
                  textAlign={{ base: "center", sm: "left" }}
                  fontWeight="bold"
                  color="white"
                >
                  {textos[index].titulo}
                </Text>
                <Text
                  fontSize="md"
                  textAlign={{ base: "center", sm: "left" }}
                  color="white"
                >
                  {textos[index].parrafo}
                </Text>
              </Box>
            </Flex>
          ))}
        </Box>

        <Box
          flexBasis={{ base: "0%", md: "0%", lg: "40%", xl: "20%" }}
          display={{ base: "none", md: "none", lg: "block" }}
          position="relative"
        >
          <OptimizedImage
            src={asideSrc}
            alt="Imagen lateral servicios"
            width="100%"
            height="100%"
            aspectRatio="none"
            borderRadius="0"
          />
        </Box>
      </Box>
    </>
  );
}

export default memo(Servicios);
