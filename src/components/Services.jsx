/* eslint-disable react/prop-types */
import { Flex, Box, Image, Text, SimpleGrid } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Services = ({ servicios }) => {
  const { t } = useTranslation();

  const serviceSlugs = {
    [t('servicios.renderizado')]: 'renderizado-fotorrealista',
    [t('servicios.animaciones')]: 'animaciones-3d',
    [t('servicios.recorridos')]: 'recorridos-virtuales',
    [t('servicios.visualizacion')]: 'visualizacion-interiores',
  };

  return (
    <Flex m="30px 0px 30px 0px" direction="column" align="center" p={5}>
      <Text fontSize="3xl" fontWeight="bold" mb={5} color={"white"}>
        {t('servicios.titulo')}
      </Text>
      <SimpleGrid columns={[1, 2, 2, 4]} spacing={10}>
        {servicios.map((servicio, index) => (
          <ServicioCard
            key={index}
            index={index}
            servicio={servicio}
            slug={serviceSlugs[servicio.titulo] || 'servicio'}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

const ServicioCard = ({ servicio, slug, index }) => {
  const navigate = useNavigate();
  const isExpandable = slug === 'animaciones-3d';

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => isExpandable && navigate(`/servicios/${slug}`)}
      cursor={isExpandable ? "pointer" : "default"}
      border="1px solid rgba(255, 255, 255, 0.1)"
      borderRadius="2xl"
      overflow="hidden"
      bg="rgba(255, 255, 255, 0.03)"
      backdropFilter="blur(5px)"
      willChange="transform, opacity"
      _hover={{
        transform: "scale(1.05) translateY(-5px)",
        bg: "rgba(255, 255, 255, 0.07)",
        borderColor: "rgba(255, 255, 255, 0.2)"
      }}
      p={6}
      textAlign="center"
    >
      <Image
        src={servicio.imagen}
        alt={servicio.titulo}
        borderRadius="md"
        mb={3}
        objectFit="contain"
        height="100px"
        width="100px"
        mx="auto"
        transition="transform 0.3s ease"
        _groupHover={{ transform: "scale(1.1)" }}
      />
      <Text color={"white"} mb={2}>{servicio.titulo}</Text>
    </Box>
  );
};

export default Services;
