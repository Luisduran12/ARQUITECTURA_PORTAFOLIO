import { Flex, Box, Image, Text, SimpleGrid, IconButton, Center } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import OptimizedVideo from "./OptimizedVideo";

const Services = ({ servicios }) => {
  const { t } = useTranslation();

  // Default to the first service's video or an explicit default
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
    <Flex m="30px 0px 30px 0px" direction="column" align="center" p={5} width="100%">
      <Text fontSize="3xl" fontWeight="bold" mb={5} color={"white"} textAlign="center">
        {t('servicios.titulo')}
      </Text>

      <SimpleGrid columns={[1, 2, 2, 4]} spacing={10} width="100%" maxW="1200px" mb={10}>
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

      {/* Permanent Video Player Section */}
      <Box
        width="100%"
        maxW="1100px"
        position="relative"
        mt={4}
        borderRadius="3xl"
        overflow="hidden"
        boxShadow="0 25px 50px -12px rgba(0, 210, 255, 0.25)"
        border="1px solid rgba(0, 210, 255, 0.3)"
        bg="black"
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <OptimizedVideo
          key={activeVideo} // Important: force re-mount/re-load when video changes
          src={activeVideo}
          autoPlay
          controls
          muted={false}
          width={1920}
          borderRadius="3xl"
          aspectRatio="16/9"
          priority={true}
        />
      </Box>
    </Flex>
  );
};

const ServicioCard = ({ servicio, index, onClick, isActive }) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      cursor="pointer"
      border="1px solid"
      borderColor={isActive ? "blue.400" : "rgba(255, 255, 255, 0.1)"}
      boxShadow={isActive ? "0 0 20px rgba(0, 210, 255, 0.3)" : "none"}
      borderRadius="2xl"
      overflow="hidden"
      bg={isActive ? "rgba(0, 210, 255, 0.1)" : "rgba(255, 255, 255, 0.03)"}
      backdropFilter="blur(5px)"
      willChange="transform, opacity"
      _hover={{
        transform: "scale(1.05) translateY(-5px)",
        bg: "rgba(255, 255, 255, 0.07)",
        borderColor: isActive ? "blue.300" : "rgba(255, 255, 255, 0.2)"
      }}
      p={6}
      textAlign="center"
      position="relative"
    >
      {/* Indicador activo visual sutil */}
      {isActive && (
        <Center position="absolute" top={2} right={2} w={2} h={2} bg="blue.400" borderRadius="full" />
      )}

      <Image
        loading="lazy"
        src={servicio.imagen}
        alt={servicio.titulo}
        borderRadius="md"
        mb={3}
        objectFit="contain"
        height="100px"
        width="100px"
        mx="auto"
        transition="transform 0.3s ease"
      />
      <Text color={"white"} fontSize="md" fontWeight={isActive ? "bold" : "normal"}>
        {servicio.titulo}
      </Text>
    </Box>
  );
};

export default Services;
