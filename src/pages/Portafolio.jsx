import {
  Box,
  Flex,
  Image,
  Text,
  Grid,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import CarpetaImagenes from "../components/CarpetaImagenes";
import Card3DPopOut from "../components/Card3DPopOut";
import { useTranslation } from "react-i18next";

const Portfolio = () => {
  const { t } = useTranslation();

  const imagePaths = [
    { src: "/RENDERS/EDIFICIO/e10.webp", titulo: t("portafolio.edificio_ceiba_central"), sub: "Edificio Institucional · 2024", carpeta: "EDIFICIO" },
    { src: "/RENDERS/ING_ECU/ie3.webp", titulo: t("portafolio.casa_rg"), sub: "Residencial · 2024", carpeta: "ING_ECU" },
    { src: "/RENDERS/HABITACION_NINA/hn4.webp", titulo: t("portafolio.habitacion_nina"), sub: "Diseño Interior · 2024", carpeta: "HABITACION_NINA" },
    { src: "/RENDERS/COCINA_INTERIOR/ci1.webp", titulo: t("portafolio.cocina_interior"), sub: "Interior Premium · 2024", carpeta: "COCINA_INTERIOR" },
    { src: "/RENDERS/HABITACION/h6.webp", titulo: t("portafolio.habitacion_principal"), sub: "Suite Master · 2024", carpeta: "HABITACION" },
    { src: "/RENDERS/HABITACION2/hb1.webp", titulo: t("portafolio.dormitorio"), sub: "Dormitorio Moderno · 2024", carpeta: "HABITACION2" },
    { src: "/RENDERS/MAQUETA1/m11.webp", titulo: t("portafolio.render_maqueta"), sub: "Maqueta Arquitectónica", carpeta: "MAQUETA1" },
    { src: "/RENDERS/FACHADA/f2.webp", titulo: t("portafolio.fachada_proyecto_f24"), sub: "Fachada F24 · 2024", carpeta: "FACHADA" },
    { src: "/RENDERS/ZONA_TVs/zt5.webp", titulo: t("portafolio.zona_tv"), sub: "Zona Social · 2024", carpeta: "ZONA_TVs" },
    { src: "/RENDERS/SALA/s4.webp", titulo: t("portafolio.sala"), sub: "Living Space · 2024", carpeta: "SALA" },
    { src: "/RENDERS/BBQ/b3.webp", titulo: t("portafolio.zona_bbq"), sub: "Zona Exterior · 2024", carpeta: "BBQ" },
  ];

  const [selectedCarpeta, setSelectedCarpeta] = useState(null);
  const [selectedTitulo, setSelectedTitulo] = useState(null);

  const handleImageClick = (carpeta, titulo) => {
    setSelectedCarpeta(carpeta);
    setSelectedTitulo(titulo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClose = () => setSelectedCarpeta(null);

  if (selectedCarpeta) {
    return <CarpetaImagenes titulo={selectedTitulo} carpeta={selectedCarpeta} onClose={handleClose} />;
  }

  return (
    <>
      {/* ── Hero Banner ── */}
      <Flex
        direction="column"
        justifyContent="center"
        h="65vh"
        overflow="hidden"
        position="relative"
        p="30px"
      >
        <Image
          src="/RENDERS/ZONA_TVs/zt4.webp"
          alt="Fondo Portafolio"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          loading="eager"
        />
        <Box
          position="absolute"
          inset="0"
          bg="rgba(0,0,0,0.45)"
        />
        <Flex
          position="absolute"
          inset="0"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="12px"
        >
          <Text
            fontSize={["4xl", "5xl", "6xl", "7xl"]}
            fontWeight="bold"
            color="white"
            textShadow="2px 2px 20px rgba(0,0,0,0.7)"
            letterSpacing="widest"
            fontFamily="'Playfair Display', serif"
          >
            {t("portafolio.portada")}
          </Text>
          <Text
            fontSize="sm"
            color="rgba(255,255,255,0.5)"
            letterSpacing="0.25em"
            textTransform="uppercase"
          >
            Cúcuta, Colombia
          </Text>
        </Flex>
      </Flex>

      {/* ── Grid de tarjetas 3D ── */}
      <Box px={["20px", "40px", "60px"]} py="80px">
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={10}
          rowGap={16}
          sx={{ "& > *": { overflow: "visible" } }}
        >
          {imagePaths.map((image, index) => (
            <Center
              key={index}
              overflow="visible"
              sx={{ perspective: "none" }}
            >
              <Card3DPopOut
                src={image.src}
                alt={image.titulo}
                titulo={image.titulo}
                subtitulo={image.sub}
                onClick={() => handleImageClick(image.carpeta, image.titulo)}
                width="100%"
                height="310px"
              />
            </Center>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Portfolio;
