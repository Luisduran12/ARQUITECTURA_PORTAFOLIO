import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Grid,
  GridItem,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Link,
  Button,
} from "@chakra-ui/react";
import Servicios from "../components/Services";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../components/OptimizedImage";
import { cloudUrl } from "../utils/cloudinary";

export default function Nosotros() {
  const { t } = useTranslation();
  const serviciosData = [
    { imagen: cloudUrl('public/servicios/FotoRealista.webp', { w: 200 }), titulo: t('servicios.renderizado') },
    { imagen: cloudUrl('public/servicios/TresD.webp', { w: 200 }), titulo: t('servicios.animaciones') },
    { imagen: cloudUrl('public/servicios/Virtuales.webp', { w: 200 }), titulo: t('servicios.recorridos') },
    { imagen: cloudUrl('public/servicios/Interiores.webp', { w: 200 }), titulo: t('servicios.visualizacion') },
  ];
  const [w] = useMediaQuery("(min-width: 800px)");
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClickImage = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <>
      {/* Parte 1 Inicio de Nosotros*/}
      <Flex
        direction="column"
        justifyContent="center"
        h="100vh"
        overflow="hidden"
        position="relative"
        p="30px"
      >
        <OptimizedImage
          src={cloudUrl('public/RENDERS/ZONA_TVs/zt1.webp', { w: 1920 })}
          alt="Fondo sala de TV"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          priority={true}
          borderRadius="0"
        />
        <Box
          w={["100%", "80%", "70%", "60%"]}
          borderRadius="3xl"
          backdropFilter="blur(20px)"
          bgColor="rgba(255, 255, 255, 0.1)"
          border="1px solid rgba(255, 255, 255, 0.2)"
          boxShadow="2xl"
          p={[6, 8, 10]}
          mt="100px"
          zIndex={1}
          textAlign="left"
        >
          <Text
            fontSize={["3xl", "4xl", "5xl", "6xl"]}
            fontWeight="bold"
            className="slide-in-left"
            mb={6}
            color="white"
            textShadow="2px 2px 10px rgba(0,0,0,0.3)"
          >
            {t('nosotros.portada')}
          </Text>
          <Text
            className="slide-in-right"
            fontSize={["lg", "xl"]}
            fontWeight="medium"
            color="white"
            lineHeight="tall"
          >
            {t('nosotros.portadaParrafo')}
          </Text>
        </Box>
      </Flex>
      {/* Parte 2 Motores de renderizado*/}
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        width="100%"
      >
        <Box
          position="absolute"
          top="10%"
          left="50px"
          height="80%"
          width="4px"
          backgroundColor="#FFF"
        />
        <Box
          w={["200px", "300px", "500px", "700px", "800px"]}
          textAlign={{ base: "left", sm: "center" }}
        >
          <Text
            fontSize={["xl", "2xl", "3xl", "4xl"]}
            fontWeight="bold"
            pt="70px"
            color={"white"}
          >
            {t('nosotros.motorTitulo')}
          </Text>
          <Text
            fontSize={{ base: "sm", sm: "lg" }}
            fontWeight="semibold"
            pt="30px"
            color={"white"}
          >
            {t('nosotros.motorParrafo')}
          </Text>
          <Box
            p={4}
            display="flex"
            justifyContent={"center"}
            flexDirection={"column"}
            mt="50px"
            pb="100px"
          >
            <Grid
              templateColumns={w ? "repeat(3,1fr)" : "repeat(2,1fr)"}
              gap={4}
            >
              {w ? (
                <>
                  <GridItem
                    rowSpan={1}
                    colSpan={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <OptimizedImage
                      src={cloudUrl('public/motores/D5R.webp', { w: 260 })}
                      alt="Logo D5 Render"
                      width="130px"
                      aspectRatio="auto"
                    />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}></GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <OptimizedImage
                      src={cloudUrl('public/motores/ENSCAPE.webp', { w: 240 })}
                      alt="Logo Enscape"
                      width="120px"
                      aspectRatio="auto"
                    />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}></GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <OptimizedImage
                      src={cloudUrl('public/motores/LUMION.webp', { w: 130 })}
                      alt="Logo Lumion"
                      width="60px"
                      aspectRatio="auto"
                    />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}></GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <OptimizedImage
                      src={cloudUrl('public/motores/TWIMO.webp', { w: 260 })}
                      alt="Logo Twinmotion"
                      width="130px"
                      aspectRatio="auto"
                    />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}></GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <OptimizedImage
                      src={cloudUrl('public/motores/VRAY.webp', { w: 220 })}
                      alt="Logo Vray"
                      width="110px"
                      aspectRatio="auto"
                    />
                  </GridItem>
                </>
              ) : (
                <>
                  <GridItem rowSpan={1} colSpan={1} display="flex" justifyContent="center" alignItems="center">
                    <img loading="lazy" className="image image-animate image-1"
                      src={cloudUrl("public/motores/D5R.webp", { w: 260 })}
                      alt="Logo D5 Render" width="130" height="auto" />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}></GridItem>
                  <GridItem rowSpan={1} colSpan={1}></GridItem>
                  <GridItem rowSpan={1} colSpan={1} display="flex" justifyContent="center" alignItems="center">
                    <img loading="lazy" className="image image-animate image-2"
                      src={cloudUrl("public/motores/ENSCAPE.webp", { w: 240 })}
                      alt="Logo Enscape" width="120" height="auto" />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} display="flex" justifyContent="center" alignItems="center">
                    <img loading="lazy" className="image image-animate image-3"
                      src={cloudUrl("public/motores/LUMION.webp", { w: 130 })}
                      alt="Logo Lumion" width="65" height="auto" />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}></GridItem>
                  <GridItem rowSpan={1} colSpan={1}></GridItem>
                  <GridItem rowSpan={1} colSpan={1} display="flex" justifyContent="center" alignItems="center">
                    <img loading="lazy" className="image image-animate image-4"
                      src={cloudUrl("public/motores/TWIMO.webp", { w: 260 })}
                      alt="Logo Twinmotion" width="130" height="auto" />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} display="flex" justifyContent="center" alignItems="center">
                    <img loading="lazy" className="image image-animate image-5"
                      src={cloudUrl("public/motores/VRAY.webp", { w: 220 })}
                      alt="Logo Vray" width="110" height="auto" />
                  </GridItem>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
      {/* Parte 3 Servicios*/}
      <Box p="40px 0px 80px 0px">
        <Flex direction={"column"}>
          <Servicios servicios={serviciosData} />
          <Button
            color="white"
            variant="outline"
            borderColor="rgba(255, 255, 255, 0.5)"
            _hover={{
              bg: "white",
              color: "black",
              transform: "translateY(-2px)"
            }}
            transition="all 0.3s ease"
            bg="transparent"
            mx="auto"
            borderRadius="full"
            px={8}
            mb="40px"
          >
            <Link _hover="none" href="/servicios" style={{ textDecoration: 'none' }}>
              {t('servicios.boton')}
            </Link>
          </Button>
        </Flex>
      </Box>
      {/* Parte 4 Arquitectos*/}
      <Box
        bg="#1E1D1D"
        p="2px 0px 20px 0px"
        maxW="1000px"
        mx="auto"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
      // justifyContent="center"
      // textAlign="center" // Centra el texto dentro de los boxes
      >
        <Box flex="1" boxShadow="md" p={4} m={10} textAlign="center">
          <OptimizedImage
            src={cloudUrl('public/publico/PerfilFernando.webp', { w: 600 })}
            alt="Fernando Patiño"
            alt="Perfil Fernando Guerrero"
            borderRadius="md"
            mb="40px"
            width="170px"
            height="170px"
            mx="auto"
            cursor="pointer"
            onClick={() => handleClickImage(cloudUrl('public/publico/PerfilFernando.webp', { w: 1200 }))}
          />
          <Text display={"flex"} alignItems={"center"} color={"white"}>
            <FaUserCircle style={{ marginRight: "8px" }} />
            <strong style={{ marginRight: "5px" }}>ARQ:</strong> FERNANDO
            GUERRERO
          </Text>
          <Text display={"flex"} alignItems={"center"} color={"white"}>
            <FaLocationDot style={{ marginRight: "8px" }} />
            Cúcuta, Colombia
          </Text>
          <Text display={"flex"} alignItems={"center"} color={"white"}>
            <FaPhone style={{ marginRight: "8px" }} />
            +57 3204663151
          </Text>
          <Text display={"flex"} alignItems={"center"} color={"white"}>
            <MdEmail style={{ marginRight: "8px" }} />
            <Link href="mailto:fergue.35@gmail.com">fergue.35@gmail.com</Link>
          </Text>
        </Box>
        <Box flex="1" boxShadow="md" p={4} m={10} textAlign="center">
          <OptimizedImage
            src={cloudUrl('public/publico/PerfilJulian.webp', { w: 600 })}
            alt="Julián Durán"
            alt="Perfil Julian Chaves"
            borderRadius="md"
            mb="40px"
            width="170px"
            height="170px"
            mx="auto"
            cursor="pointer"
            onClick={() => handleClickImage(cloudUrl('public/publico/PerfilJulian.webp', { w: 1200 }))}
          />
          <Text display={"flex"} alignItems={"center"} color={"white"}>
            <FaUserCircle style={{ marginRight: "8px" }} />
            <strong style={{ marginRight: "5px" }}>ARQ:</strong> JULIAN CHAVES
          </Text>
          <Text display={"flex"} alignItems={"center"} color={"white"}>
            <FaLocationDot style={{ marginRight: "8px" }} />
            Cúcuta, Colombia
          </Text>
          <Text display={"flex"} alignItems={"center"} color={"white"}>
            <FaPhone style={{ marginRight: "8px" }} />
            +57 3004911084
          </Text>
          <Text display={"flex"} alignItems={"center"} color={"white"}>
            <MdEmail style={{ marginRight: "8px" }} />
            <Link href="mailto:julian.chaves.pabon@gmail.com">
              julian.chaves.pabon@gmail.com
            </Link>
          </Text>
        </Box>
        {selectedImage && (
          <Modal isOpen={isOpen} onClose={closeModal} isCentered>
            <ModalOverlay />
            <ModalContent
              maxW={{ base: "100vw", md: "70vh" }}
              maxH="70vh"
              bg="transparent"
            >
              <ModalCloseButton />
              <ModalBody>
                <Image loading="lazy" src={selectedImage} w="100%" h="auto" />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </>
  );
}
