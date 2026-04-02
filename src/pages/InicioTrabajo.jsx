import Slider from "react-slick";
import {
  Flex,
  Box,
  useBreakpointValue,
  Button,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../components/OptimizedImage";
import { cloudUrl } from "../utils/cloudinary";

const images = [
  { src: cloudUrl('public/RENDERS/EDIFICIO/e1.webp', { w: 1280 }) },
  { src: cloudUrl('public/RENDERS/EDIFICIO/e4.webp', { w: 1280 }) },
  { src: cloudUrl('public/RENDERS/EDIFICIO/e5.webp', { w: 1280 }) },
  { src: cloudUrl('public/RENDERS/EDIFICIO/e8.webp', { w: 1280 }) },
  { src: cloudUrl('public/RENDERS/EDIFICIO/e10.webp', { w: 1280 }) },
];

export default function InicioTrabajo() {
  const { t } = useTranslation();
  const isSmOrLarger = useBreakpointValue({ base: false, md: true });

  const bgGradient = useBreakpointValue({
    base: "linear-gradient(180deg, #1E1D1D 0%, #1E1D1D 30%, #fff 25%, #fff 65%, #1E1D1D 65%, #1E1D1D 100%)",
    sm: "linear-gradient(180deg, #1E1D1D 0%, #1E1D1D 25%, #fff 25%, #fff 75%, #1E1D1D 75%, #1E1D1D 100%)",
  });

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: isSmOrLarger ? 2 : 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <Flex
      direction="column"
      width="100%"
      justifyContent="center"
      padding="2rem"
      mt={{ base: "0px", sm: "60px" }}
      mb={{ base: "30px", md: "100px" }}
      background={bgGradient}
    >
      <Heading as="h2" size={["xl", "2xl"]} mb="4" color="white">
        {t("inicioTra.titulo")}
      </Heading>
      <Slider {...settings} style={{ width: "100%" }}>
        {images.map((image, index) => (
          <Box key={index} px={4}>
            <OptimizedImage
              src={image.src}
              alt={`Proyecto de arquitectura ${index + 1}`}
              aspectRatio="5/3"
              width="100%"
              borderRadius="20px"
              boxShadow="0px 0px 20px rgba(0, 0, 0, 0.5)"
            />
          </Box>
        ))}
      </Slider>
      <Button
        as={RouterLink}
        to="/portafolio"
        mt="8"
        color="white"
        variant="outline"
        borderColor="rgba(255, 255, 255, 0.5)"
        _hover={{
          bg: "white",
          color: "black",
          transform: "translateY(-2px)",
        }}
        transition="all 0.3s ease"
        bg="transparent"
        mx="auto"
        borderRadius="full"
        px={8}
      >
        {t("inicioTra.boton")}
      </Button>
    </Flex>
  );
}
