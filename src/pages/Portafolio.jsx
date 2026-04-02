import {
  Box,
  Flex,
  Text,
  Grid,
} from "@chakra-ui/react";
import { useState } from "react";
import CarpetaImagenes from "../components/CarpetaImagenes";
import PortfolioCard from "../components/PortfolioCard";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../components/OptimizedImage";
import { cloudUrl } from "../utils/cloudinary";

const Portfolio = () => {
  const { t } = useTranslation();

  const imagePaths = [
    { src: 'public/RENDERS/ZONA SOCIAL/1.jpg', titulo: t("portafolio.zona_social"), sub: "Área Social · 2024", carpeta: "ZONA SOCIAL" },
    { src: 'public/RENDERS/PROPUESTAS/5.jpg', titulo: t("portafolio.propuestas"), sub: "Propuestas de Diseño · 2024", carpeta: "PROPUESTAS" },
    { src: 'public/RENDERS/HABITACION/12.jpg', titulo: t("portafolio.habitacion"), sub: "Diseño de Habitación · 2024", carpeta: "HABITACION" },
    { src: 'public/RENDERS/HABITACION PRINCIPAL/1.jpg', titulo: t("portafolio.habitacion_principal"), sub: "Habitación Principal · 2024", carpeta: "HABITACION PRINCIPAL" },
    { src: 'public/RENDERS/INTERIORISMO/1.jpg', titulo: t("portafolio.interiorismo"), sub: "Propuesta de Interiorismo · 2024", carpeta: "INTERIORISMO" },
    { src: 'public/RENDERS/FACHADA_R3/1.png', titulo: t("portafolio.fachada_r3"), sub: "Fachada Moderna · 2024", carpeta: "FACHADA_R3" },
    { src: 'public/RENDERS/CHINACOTA/1.png', titulo: t("portafolio.cabana_chinacota"), sub: "Cabaña de descanso · 2024", carpeta: "CHINACOTA" },
    { src: 'public/RENDERS/INTERIOR ARBNB/1_o5xdk9.jpg', titulo: t("portafolio.interior_airbnb"), sub: "Airbnb Studio · 2024", carpeta: "INTERIOR ARBNB" },
    { src: 'public/RENDERS/FACHADAS/1_i8nkng.jpg', titulo: t("portafolio.fachadas"), sub: "Diseño Exterior · 2024", carpeta: "FACHADAS" },
    { src: 'public/RENDERS/EDIFICIO/e10.webp', titulo: t("portafolio.edificio_ceiba_central"), sub: "Edificio Institucional · 2024", carpeta: "EDIFICIO" },
    { src: 'public/RENDERS/ING_ECU/ie3.webp', titulo: t("portafolio.casa_rg"), sub: "Residencial · 2024", carpeta: "ING_ECU" },
    { src: 'public/RENDERS/HABITACION_NINA/hn4.webp', titulo: t("portafolio.habitacion_nina"), sub: "Diseño Interior · 2024", carpeta: "HABITACION_NINA" },
    { src: 'public/RENDERS/COCINA_INTERIOR/ci1.webp', titulo: t("portafolio.cocina_interior"), sub: "Interior Premium · 2024", carpeta: "COCINA_INTERIOR" },
    { src: 'public/RENDERS/HABITACION/h6.webp', titulo: t("portafolio.habitacion_principal"), sub: "Suite Master · 2024", carpeta: "HABITACION" },
    { src: 'public/RENDERS/HABITACION2/hb1.webp', titulo: t("portafolio.dormitorio"), sub: "Dormitorio Moderno · 2024", carpeta: "HABITACION2" },
    { src: 'public/RENDERS/MAQUETA1/m11.webp', titulo: t("portafolio.render_maqueta"), sub: "Maqueta Arquitectónica", carpeta: "MAQUETA1" },
    { src: 'public/RENDERS/FACHADA/f2.webp', titulo: t("portafolio.fachada_proyecto_f24"), sub: "Fachada F24 · 2024", carpeta: "FACHADA" },
    { src: 'public/RENDERS/ZONA_TVs/zt5.webp', titulo: t("portafolio.zona_tv"), sub: "Zona Social · 2024", carpeta: "ZONA_TVs" },
    { src: 'public/RENDERS/SALA/s4.webp', titulo: t("portafolio.sala"), sub: "Living Space · 2024", carpeta: "SALA" },
    { src: 'public/RENDERS/BBQ/b3.webp', titulo: t("portafolio.zona_bbq"), sub: "Zona Exterior · 2024", carpeta: "BBQ" },
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
        {/* Imagen de fondo — posición absoluta para llenar todo el hero */}
        <Box
          position="absolute"
          inset="0"
          overflow="hidden"
        >
          <OptimizedImage
            src={cloudUrl("public/RENDERS/ZONA_TVs/zt4.webp", { w: 1920 })}
            alt="Fondo Portafolio"
            priority
            aspectRatio="none"
            width="100%"
            height="100%"
            borderRadius="0"
          />
        </Box>
        {/* Overlay oscuro */}
        <Box
          position="absolute"
          inset="0"
          bg="rgba(0,0,0,0.45)"
          zIndex="1"
        />
        {/* Texto centrado */}
        <Flex
          position="absolute"
          inset="0"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="12px"
          zIndex="2"
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

      {/* ── Grid de proyectos ── */}
      <Box px={["20px", "40px", "60px"]} py="80px">
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={8}
        >
          {imagePaths.map((image, index) => (
            <PortfolioCard
              key={index}
              src={image.src}
              alt={image.titulo}
              titulo={image.titulo}
              subtitulo={image.sub}
              onClick={() => handleImageClick(image.carpeta, image.titulo)}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Portfolio;
