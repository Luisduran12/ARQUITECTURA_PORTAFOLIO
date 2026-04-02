import Slider from "react-slick";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { FaArrowDown } from "react-icons/fa";
import Servicios from "../components/Services";
import InicioNosotros from "./InicioNosotros";
import InicioTrabajo from "./InicioTrabajo";
import StatsSection from "../components/StatsSection";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";
import { cloudUrl } from "../utils/cloudinary";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 4000,
  cssEase: "cubic-bezier(0.87, 0, 0.13, 1)", // Más fluido
  arrows: false,
  draggable: true, // Habilitado para mejor UX
  swipe: true, // Habilitado para móviles
  touchMove: true,
  pauseOnHover: true, // Permitir al usuario admirar las fotos
};

export default function Inicio() {
  const { t } = useTranslation();
  // Carrusel de imágenes
  const carouselImages = [
    { src: cloudUrl('public/RENDERS/COCINA_INTERIOR/ci1.webp', { w: 1920 }), text: t('carrusel.bienvenido') },
    { src: cloudUrl('public/CAMBIOS/15_a5ejhf.jpg', { w: 1920 }), text: t('carrusel.visualizacion') },
    { src: cloudUrl('public/CAMBIOS/12_dot66p.jpg', { w: 1920 }), text: t('carrusel.inspiracion') },
    { src: cloudUrl('public/CAMBIOS/4_erijcl.jpg', { w: 1920 }), text: t('carrusel.transformacion') },
    { src: cloudUrl('public/CAMBIOS/9_xuptyn.jpg', { w: 1920 }), text: t('carrusel.innovacion') },
  ];

  const serviciosRef = useRef(null);

  const scrollToServicios = () => {
    const serviciosElement = serviciosRef.current;
    if (serviciosElement) {
      const serviciosRect = serviciosElement.getBoundingClientRect();
      const offset = serviciosRect.top + window.scrollY - 48;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const serviciosData = [
    { imagen: cloudUrl('public/servicios/FotoRealista.webp', { w: 200 }), titulo: t('servicios.renderizado') },
    { imagen: cloudUrl('public/servicios/TresD.webp', { w: 200 }), titulo: t('servicios.animaciones') },
    { imagen: cloudUrl('public/servicios/Virtuales.webp', { w: 200 }), titulo: t('servicios.recorridos') },
    { imagen: cloudUrl('public/servicios/Interiores.webp', { w: 200 }), titulo: t('servicios.visualizacion') },
  ];

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        overflow="hidden"
        position="relative"
      >
        <Slider {...settings} style={{ width: "100%" }}>
          {carouselImages.map((image, index) => (
            <Box key={index} position="relative" height="100vh" width="100%">
              {/* Imagen principal con overlay oscuro para contraste */}
              <OptimizedImage
                src={image.src}
                alt={image.text}
                priority={index === 0}
                aspectRatio="none"
                position="absolute"
                inset="0"
                width="100%"
                height="100%"
                borderRadius="0"
              />
              <Box
                position="absolute"
                inset="0"
                bg="rgba(0,0,0,0.3)"
                zIndex="1"
              />
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex="2"
                textAlign="center"
                color="white"
                backdropFilter="blur(15px)"
                bg="rgba(0, 0, 0, 0.2)"
                border="1px solid rgba(0, 210, 255, 0.3)"
                p={[6, 8, 10]}
                borderRadius="2xl"
                boxShadow="0 0 30px rgba(0, 210, 255, 0.2)"
                maxW="90%"
                as={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Text
                  as={motion.span}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  fontSize={["lg", "xl", "2xl", "3xl"]}
                  fontWeight="bold"
                  letterSpacing="0.2em"
                  textShadow="0 0 10px rgba(0, 210, 255, 0.8)"
                >
                  {image.text}
                </Text>
              </Flex>
            </Box>
          ))}
        </Slider>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          zIndex="1"
        >
          <Button
            onClick={scrollToServicios}
            position="absolute"
            bottom="60px"
            bg={"rgba(255, 255, 255, 0.1)"}
            backdropFilter="blur(5px)"
            _hover={{
              bg: "rgba(255, 255, 255, 0.2)",
              transform: "translateY(5px)",
              borderColor: "white"
            }}
            transition="all 0.3s ease"
            _active={{}}
            color="white"
            borderRadius="full"
            border="1px"
            borderColor={"rgba(255, 255, 255, 0.5)"}
            p={4}
            boxShadow="lg"
          >
            <FaArrowDown />
          </Button>
        </Flex>
      </Flex>

      {/* APARTADO DE SERVICIOS */}
      <Flex direction={"column"} ref={serviciosRef}>
        <Servicios servicios={serviciosData} />
        <Button
          as={RouterLink}
          to="/servicios"
          color="white"
          variant="outline"
          borderColor="rgba(0, 210, 255, 0.5)"
          _hover={{
            bg: "rgba(0, 210, 255, 0.1)",
            transform: "translateY(-2px)"
          }}
          transition="all 0.3s ease"
          bg="transparent"
          mx="auto"
          borderRadius="full"
          px={8}
          mb="80px"
          mt="20px"
        >
          {t('servicios.boton')}
        </Button>
      </Flex>

      {/* STATS ANIMADOS */}
      <StatsSection />

      {/* APARTADO DE NOSOTROS */}
      <InicioNosotros />
      <InicioTrabajo />
    </>
  );
}
