import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function PageNotFound() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="#0a0a0a"
      color="white"
      textAlign="center"
      px={6}
      position="relative"
      overflow="hidden"
    >
      {/* Glow de fondo decorativo */}
      <Box
        position="absolute"
        top="30%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="rgba(0, 210, 255, 0.04)"
        filter="blur(80px)"
        pointerEvents="none"
      />

      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Heading
          fontSize={{ base: "8xl", md: "10xl" }}
          fontWeight="900"
          letterSpacing="-0.04em"
          bgGradient="linear(to-r, white, rgba(0,210,255,0.6))"
          bgClip="text"
          lineHeight="1"
          mb={4}
        >
          404
        </Heading>

        <Heading
          as="h2"
          size="lg"
          fontWeight="300"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color="gray.300"
          mb={4}
        >
          Página no encontrada
        </Heading>

        <Text color="gray.500" fontSize="md" maxW="400px" mx="auto" mb={10}>
          El recurso que buscas no existe o fue movido. Regresa al inicio y explora nuestros proyectos.
        </Text>

        <Button
          as={RouterLink}
          to="/"
          size="lg"
          variant="outline"
          color="white"
          borderColor="rgba(0, 210, 255, 0.5)"
          borderRadius="full"
          px={10}
          _hover={{
            bg: "rgba(0, 210, 255, 0.1)",
            borderColor: "rgba(0, 210, 255, 0.8)",
            transform: "translateY(-2px)",
          }}
          transition="all 0.3s ease"
        >
          Volver al Inicio
        </Button>
      </Box>
    </Flex>
  );
}