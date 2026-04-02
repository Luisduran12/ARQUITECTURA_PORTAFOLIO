import {
  Box,
  Flex,
  Text,
  Grid,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import CarpetaImagenes from "../components/CarpetaImagenes";
import Card3DPopOut from "../components/Card3DPopOut";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../components/OptimizedImage";
import { cloudUrl } from "../utils/cloudinary";

const Portfolio = () => {
  const { t } = useTranslation();

  const imagePaths = [
    { src: cloudUrl('public/RENDERS/EDIFICIO/e10.webp', { w: 900 }), titulo: t("portafolio.edificio_ceiba_central"), sub: "Edificio Institucional · 2024", carpeta: "EDIFICIO" },
    { src: cloudUrl('public/RENDERS/ING_ECU/ie3.webp', { w: 900 }), titulo: t("portafolio.casa_rg"), sub: "Residencial · 2024", carpeta: "ING_ECU" },
    { src: cloudUrl('public/RENDERS/HABITACION_NINA/hn4.webp', { w: 900 }), titulo: t("portafolio.habitacion_nina"), sub: "Diseño Interior · 2024", carpeta: "HABITACION_NINA" },
    { src: cloudUrl('public/RENDERS/COCINA_INTERIOR/ci1.webp', { w: 900 }), titulo: t("portafolio.cocina_interior"), sub: "Interior Premium · 2024", carpeta: "COCINA_INTERIOR" },
    { src: cloudUrl('public/RENDERS/HABITACION/h6.webp', { w: 900 }), titulo: t("portafolio.habitacion_principal"), sub: "Suite Master · 2024", carpeta: "HABITACION" },
    { src: cloudUrl('public/RENDERS/HABITACION2/hb1.webp', { w: 900 }), titulo: t("portafolio.dormitorio"), sub: "Dormitorio Moderno · 2024", carpeta: "HABITACION2" },
    { src: cloudUrl('public/RENDERS/MAQUETA1/m11.webp', { w: 900 }), titulo: t("portafolio.render_maqueta"), sub: "Maqueta Arquitectónica", carpeta: "MAQUETA1" },
    { src: cloudUrl('public/RENDERS/FACHADA/f2.webp', { w: 900 }), titulo: t("portafolio.fachada_proyecto_f24"), sub: "Fachada F24 · 2024", carpeta: "FACHADA" },
    { src: cloudUrl('public/RENDERS/ZONA_TVs/zt5.webp', { w: 900 }), titulo: t("portafolio.zona_tv"), sub: "Zona Social · 2024", carpeta: "ZONA_TVs" },
    { src: cloudUrl('public/RENDERS/SALA/s4.webp', { w: 900 }), titulo: t("portafolio.sala"), sub: "Living Space · 2024", carpeta: "SALA" },
    { src: cloudUrl('public/RENDERS/BBQ/b3.webp', { w: 900 }), titulo: t("portafolio.zona_bbq"), sub: "Zona Exterior · 2024", carpeta: "BBQ" },
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
        <OptimizedImage
          src={cloudUrl("public/RENDERS/ZONA_TVs/zt4.webp", { w: 1920 })}
          alt="Fondo Portafolio"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          priority={true}
          borderRadius="0"
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
