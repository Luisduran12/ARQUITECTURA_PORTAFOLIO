/* eslint-disable react/prop-types */
// src/components/CarpetaImagenes.jsx
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  IconButton,
  Skeleton,
  Center,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { useCarpetaImages } from "../hooks/useCarpetaImages";
import OptimizedImage from "./OptimizedImage";

// ─────────────────────────────────────────────────────────
// Imágenes locales como fallback si Cloudinary no responde
// ─────────────────────────────────────────────────────────
const carpetaImagesFallback = {
  COCINA_INTERIOR: [
    { src: "/RENDERS/COCINA_INTERIOR/ci1.webp" },
    { src: "/RENDERS/COCINA_INTERIOR/ci5.webp" },
    { src: "/RENDERS/COCINA_INTERIOR/ci2.webp" },
    { src: "/RENDERS/COCINA_INTERIOR/ci4.webp" },
    { src: "/RENDERS/COCINA_INTERIOR/ci3.webp" },
  ],
  EDIFICIO: [
    { src: "/RENDERS/EDIFICIO/e10.webp" },
    { src: "/RENDERS/EDIFICIO/e11.webp" },
    { src: "/RENDERS/EDIFICIO/e1.webp" },
    { src: "/RENDERS/EDIFICIO/e7.webp" },
    { src: "/RENDERS/EDIFICIO/e8.webp" },
    { src: "/RENDERS/EDIFICIO/e9.webp" },
    { src: "/RENDERS/EDIFICIO/e3.webp" },
    { src: "/RENDERS/EDIFICIO/e2.webp" },
    { src: "/RENDERS/EDIFICIO/e4.webp" },
    { src: "/RENDERS/EDIFICIO/e5.webp" },
    { src: "/RENDERS/EDIFICIO/e6.webp" },
  ],
  FACHADA: [
    { src: "/RENDERS/FACHADA/f2.webp" },
    { src: "/RENDERS/FACHADA/f1.webp" },
  ],
  HABITACION_NINA: [
    { src: "/RENDERS/HABITACION_NINA/hn4.webp" },
    { src: "/RENDERS/HABITACION_NINA/hn3.webp" },
    { src: "/RENDERS/HABITACION_NINA/hn5.webp" },
    { src: "/RENDERS/HABITACION_NINA/hn1.webp" },
    { src: "/RENDERS/HABITACION_NINA/hn2.webp" },
  ],
  HABITACION: [
    { src: "/RENDERS/HABITACION/h6.webp" },
    { src: "/RENDERS/HABITACION/h4.webp" },
    { src: "/RENDERS/HABITACION/h3.webp" },
    { src: "/RENDERS/HABITACION/h2.webp" },
    { src: "/RENDERS/HABITACION/h5.webp" },
    { src: "/RENDERS/HABITACION/h1.webp" },
  ],
  ING_ECU: [
    { src: "/RENDERS/ING_ECU/ie3.webp" },
    { src: "/RENDERS/ING_ECU/ie1.webp" },
    { src: "/RENDERS/ING_ECU/ie2.webp" },
  ],
  HABITACION2: [
    { src: "/RENDERS/HABITACION2/hb3.webp" },
    { src: "/RENDERS/HABITACION2/hb5.webp" },
    { src: "/RENDERS/HABITACION2/hb4.webp" },
    { src: "/RENDERS/HABITACION2/hb2.webp" },
    { src: "/RENDERS/HABITACION2/hb1.webp" },
    { video: "https://player.vimeo.com/video/993496971" },
  ],
  MAQUETA1: [
    { src: "/RENDERS/MAQUETA1/m11.webp" },
    { src: "/RENDERS/MAQUETA1/m12.webp" },
    { src: "/RENDERS/MAQUETA1/m13.webp" },
    { src: "/RENDERS/MAQUETA2/m21.webp" },
    { src: "/RENDERS/MAQUETA2/m22.webp" },
    { src: "/RENDERS/MAQUETA2/m23.webp" },
    { src: "/RENDERS/MAQUETA2/m24.webp" },
  ],
  SALA: [
    { src: "/RENDERS/SALA/s4.webp" },
    { src: "/RENDERS/SALA/s2.webp" },
    { src: "/RENDERS/SALA/s3.webp" },
    { src: "/RENDERS/SALA/s1.webp" },
  ],
  ZONA_TVs: [
    { src: "/RENDERS/ZONA_TVs/zt2.webp" },
    { src: "/RENDERS/ZONA_TVs/zt1.webp" },
    { src: "/RENDERS/ZONA_TVs/zt3.webp" },
    { src: "/RENDERS/ZONA_TVs/zt5.webp" },
    { src: "/RENDERS/ZONA_TVs/zt4.webp" },
  ],
  BBQ: [
    { src: "/RENDERS/BBQ/b1.webp" },
    { src: "/RENDERS/BBQ/b2.webp" },
    { src: "/RENDERS/BBQ/b3.webp" },
    { src: "/RENDERS/BBQ/b4.webp" },
  ],
};

// ─────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────
const CarpetaImagenes = ({ titulo, carpeta, onClose }) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { images: cloudImages, loading } = useCarpetaImages(carpeta);
  const fallbackImages = carpetaImagesFallback[carpeta] || [];
  const allImages = cloudImages.length > 0 ? cloudImages : fallbackImages;

  // Separar videos e imágenes
  const videos = fallbackImages.filter((item) => item.video);
  const filteredImages = allImages.filter((item) => item.src);
  const selectedImage = filteredImages[currentIndex];

  const handleClickImage = (index) => {
    setCurrentIndex(index);
    onOpen();
  };
  const handleNext = useCallback(() => setCurrentIndex((p) => (p + 1) % filteredImages.length), [filteredImages.length]);
  const handlePrev = useCallback(() => setCurrentIndex((p) => (p === 0 ? filteredImages.length - 1 : p - 1)), [filteredImages.length]);

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || filteredImages.length <= 1) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredImages.length, handleNext, handlePrev]);

  return (
    <Box p={{ base: "16px", md: "20px" }} mt="150px">
      {/* Encabezado */}
      <Box mb="24px">
        <Text fontSize="2xl" fontWeight="bold" color="white" letterSpacing="0.1em">
          {titulo.replace(/_/g, " ").toUpperCase()}
        </Text>
        <Text
          as="button"
          onClick={onClose}
          color="blue.300"
          fontSize="sm"
          mt={1}
          _hover={{ color: "blue.100", textDecoration: "underline" }}
          transition="color 0.2s"
        >
          ← {t("carpetaImagen.volver")}
        </Text>
      </Box>

      {/* Videos */}
      {videos.map((item, index) => (
        <Box key={index} w="100%" minHeight="80vh" mb={6}>
          <iframe
            src={item.video}
            width="100%"
            height="80vh"
            style={{ minHeight: "80vh" }}
            allow="autoplay; fullscreen"
            allowFullScreen
            title={`Video ${index}`}
          />
        </Box>
      ))}

      {/* Grid de imágenes con skeletons */}
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={3}
      >
        {loading
          // Mostrar 9 skeletons mientras carga
          ? Array.from({ length: 9 }).map((_, i) => (
            <Skeleton
              key={i}
              h={{ base: "180px", md: "240px" }}
              borderRadius="md"
              startColor="gray.800"
              endColor="gray.600"
            />
          ))
          : filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
            >
              <OptimizedImage
                src={image.src}
                alt={`${titulo} ${index + 1}`}
                onClick={() => handleClickImage(index)}
                cursor="pointer"
              />
            </motion.div>
          ))}
      </Grid>

      {/* Lightbox modal mejorado */}
      {selectedImage && (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered size="full">
          <ModalOverlay bg="rgba(0,0,0,0.95)" backdropFilter="blur(8px)" />
          <ModalContent bg="transparent" boxShadow="none" m={0}>
            <ModalCloseButton
              color="white"
              size="lg"
              top={4}
              right={4}
              zIndex={10}
              bg="rgba(0,0,0,0.5)"
              borderRadius="full"
              _hover={{ bg: "rgba(255,255,255,0.2)" }}
            />
            <ModalBody
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={0}
              position="relative"
              minH="100vh"
            >
              {/* Botón anterior */}
              <IconButton
                icon={<GrFormPrevious style={{ fontSize: "28px" }} />}
                onClick={handlePrev}
                aria-label="Imagen anterior"
                position="fixed"
                left={{ base: 2, md: 6 }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={10}
                bg="rgba(255,255,255,0.15)"
                backdropFilter="blur(10px)"
                color="white"
                border="1px solid rgba(255,255,255,0.2)"
                borderRadius="full"
                size="lg"
                _hover={{ bg: "rgba(255,255,255,0.3)" }}
              />

              {/* Imagen actual con transición */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={selectedImage.src}
                  alt={`${titulo} ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    maxHeight: "90vh",
                    maxWidth: "88vw",
                    objectFit: "contain",
                    borderRadius: "12px",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
                  }}
                />
              </AnimatePresence>

              {/* Contador de imagen */}
              <Box
                position="fixed"
                bottom={6}
                left="50%"
                transform="translateX(-50%)"
                bg="rgba(0,0,0,0.6)"
                backdropFilter="blur(10px)"
                px={5}
                py={2}
                borderRadius="full"
                border="1px solid rgba(255,255,255,0.1)"
              >
                <Text color="white" fontSize="sm" letterSpacing="0.1em">
                  {currentIndex + 1} / {filteredImages.length}
                </Text>
              </Box>

              {/* Botón siguiente */}
              <IconButton
                icon={<GrFormNext style={{ fontSize: "28px" }} />}
                onClick={handleNext}
                aria-label="Imagen siguiente"
                position="fixed"
                right={{ base: 2, md: 6 }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={10}
                bg="rgba(255,255,255,0.15)"
                backdropFilter="blur(10px)"
                color="white"
                border="1px solid rgba(255,255,255,0.2)"
                borderRadius="full"
                size="lg"
                _hover={{ bg: "rgba(255,255,255,0.3)" }}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default CarpetaImagenes;
