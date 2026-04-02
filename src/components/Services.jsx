import { Flex, Box, Image, Text, SimpleGrid, IconButton, Center } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import OptimizedVideo from "./OptimizedVideo";

const Services = ({ servicios }) => {
  const { t } = useTranslation();

  const defaultVideo = 'public/videos/animaciones3d.mp4';
  const [activeVideo, setActiveVideo] = useState(defaultVideo);

  const serviceVideos = {
    [t('servicios.renderizado')]: 'public/videos/animaciones3d.mp4',
    [t('servicios.animaciones')]: 'public/videos/animaciones3d.mp4',
    [t('servicios.recorridos')]: 'public/videos/animaciones3d.mp4',
    [t('servicios.visualizacion')]: 'public/videos/animaciones3d.mp4',
  };

  const handleCardClick = (titulo) => {
    const videoKey = serviceVideos[titulo];
    if (videoKey) {
      setActiveVideo(videoKey);
    }
  };

  return (
    <Flex m="60px 0px" direction="column" align="center" width="100%" position="relative">
      <Container maxW="container.xl" p={5}>
        <Text
          fontSize={["2xl", "4xl"]}
          fontWeight="200"
          mb={10}
          color="white"
          textAlign="center"
          letterSpacing="0.2em"
          textTransform="uppercase"
        >
          {t('servicios.titulo')}
        </Text>

        <SimpleGrid columns={[1, 2, 2, 4]} spacing={8} width="100%" mb={14}>
          {servicios.map((servicio, index) => (
            <ServicioCard
              key={index}
              index={index}
              servicio={servicio}
              onClick={() => handleCardClick(servicio.titulo)}
              isActive={activeVideo === serviceVideos[servicio.titulo]}
            />
          ))}
        </SimpleGrid>
      </Container>

      {/* Cinematic Full-Width Video Player */}
      <Box
        width="100%"
        position="relative"
        bg="black"
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        overflow="hidden"
        borderY="1px solid rgba(0, 210, 255, 0.2)"
        boxShadow="0 0 50px rgba(0, 0, 0, 0.9)"
      >
        {/* Subtle Ambient Glow behind the video */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="80%"
          height="80%"
          bg="radial-gradient(circle, rgba(0, 210, 255, 0.1) 0%, transparent 70%)"
          zIndex={0}
          pointerEvents="none"
        />

        <OptimizedVideo
          key={activeVideo}
          src={activeVideo}
          autoPlay
          controls
          muted={false}
          width={1920}
          borderRadius="0" // Edge to edge feel
          aspectRatio={["16/9", "21/9"]} // Cinematic wide on desktop
          priority={true}
        />

        {/* Overlay for depth */}
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          boxShadow="inset 0 0 100px rgba(0,0,0,0.8)"
          zIndex={1}
        />
      </Box>
    </Flex>
  );
};

const ServicioCard = ({ servicio, index, onClick, isActive }) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      cursor="pointer"
      position="relative"
      p={8}
      borderRadius="2xl"
      bg={isActive ? "rgba(255, 255, 255, 0.05)" : "transparent"}
      border="1px solid"
      borderColor={isActive ? "blue.400" : "rgba(255, 255, 255, 0.05)"}
      backdropFilter={isActive ? "blur(10px)" : "none"}
      _hover={{
        transform: "translateY(-10px)",
        bg: "rgba(255, 255, 255, 0.08)",
        borderColor: isActive ? "blue.300" : "rgba(255, 255, 255, 0.2)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      }}
      textAlign="center"
    >
      <Box mb={4} position="relative" display="inline-block">
        <Image
          loading="lazy"
          src={servicio.imagen}
          alt={servicio.titulo}
          height="80px"
          width="80px"
          mx="auto"
          filter={isActive ? "none" : "grayscale(1) opacity(0.6)"}
          transition="all 0.3s ease"
        />
        {isActive && (
          <Box
            position="absolute"
            inset="-10px"
            bg="blue.400"
            borderRadius="full"
            filter="blur(20px)"
            opacity={0.3}
            zIndex={-1}
          />
        )}
      </Box>

      <Text
        color={isActive ? "blue.300" : "white"}
        fontSize="sm"
        fontWeight="300"
        letterSpacing="0.1em"
        textTransform="uppercase"
      >
        {servicio.titulo}
      </Text>

      {/* Indicator Line */}
      <Box
        mt={4}
        height="2px"
        width={isActive ? "40px" : "0"}
        bg="blue.400"
        mx="auto"
        transition="all 0.3s ease"
      />
    </Box>
  );
};

export default Services;
