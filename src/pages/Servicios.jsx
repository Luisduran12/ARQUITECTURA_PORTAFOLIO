import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function Servicios() {
  const { t } = useTranslation();
  const services = [
    {
      color: "#1e1d1d",
      img: "./servicios/FotoRealista.webp",
      text: "Foto Realista",
    },
    {
      color: "#1e1d1d",
      img: "./servicios/Interiores.webp",
      text: "Interiores",
    },
    {
      color: "blackAlpha.500",
      img: "./servicios/TresD.webp",
      text: "3D",
    },
    {
      color: "blackAlpha.500",
      img: "./servicios/Virtuales.webp",
      text: "Virtuales",
    },
  ];

  const textos = [
    {
      titulo: t('servicioPage.renderTitulo'),
      parrafo: t('servicioPage.renderParrafo'),
    },
    {
      titulo: t('servicioPage.visualTitulo'),
      parrafo: t('servicioPage.visualParrafo'),
    },
    {
      titulo: t('servicioPage.animaTitulo'),
      parrafo: t('servicioPage.animaParrafo'),
    },
    {
      titulo: t('servicioPage.recorTitulo'),
      parrafo: t('servicioPage.recorParrafo'),
    },
  ];

  return (
    <>
      <Flex
        direction="column"
        justifyContent="center"
        h="70vh"
        overflow="hidden"
        position="relative"
        p="30px"
      >
        <Image loading="lazy" src="./RENDERS/ZONA_TVs/zt4.webp"
          alt="Fondo"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
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
            {t('servicioPage.portada')}
          </Text>
        </Flex>
      </Flex>

      <Box
        position="relative"
        display="flex"
        flexDirection={{ base: "column", md: "column", lg: "row" }}
      >
        <Box flex="1">
          {services.map((service, index) => (
            <Flex
              key={index}
              bg={service.color}
              p="20px"
              alignItems="center"
              flexDirection={{ base: "column", sm: "row" }}
            >
              <Image loading="lazy" src={service.img}
                alt={service.text}
                boxSize="80px"
                objectFit="cover"
                ml="20px"
                mr="20px"
                mb="10px"
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
          <Image loading="lazy" src="./RENDERS/ZONA_TVs/zt5.webp"
            alt="Sobrepuesto"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
      </Box>
    </>
  );
}

export default Servicios;
