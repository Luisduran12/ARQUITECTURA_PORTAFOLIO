import {
  Box,
  Button,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";
import { cloudUrl, cloudBg } from "../utils/cloudinary";

export default function InicioNosotros() {
  const { t } = useTranslation();
  const isMdOrLarger = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  return (
    <Flex height="80vh" position="relative">
      {/* Imagen de fondo difuminada */}
      {isMdOrLarger && (
        <Box
          backgroundImage={cloudBg("public/RENDERS/EDIFICIO/e1.webp", { w: 1280 })}
          backgroundSize="cover"
          backgroundPosition="center"
          filter="blur(8px)"
          width="100%"
          height="100%"
          position="absolute"
          zIndex="0"
        />
      )}
      {/* Contenedor principal */}
      <Flex
        width="100%"
        position="relative"
        height="100%"
        flexDirection={isMdOrLarger ? "row" : "column"}
      >
        {/* Contenedor de la imagen nítida */}
        <Box
          width={isMdOrLarger ? "50%" : "100%"}
          height={isMdOrLarger ? "100%" : "auto"}
          display={isMdOrLarger ? "flex" : "none"}
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <OptimizedImage
            src={cloudUrl("public/RENDERS/EDIFICIO/e1.webp", { w: 1280 })}
            alt="Imagen arquitectónica nosotros"
            aspectRatio="auto"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Contenedor del texto y botón */}
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          backdropFilter={isMdOrLarger ? "blur(10px)" : "none"}
          bg={isMdOrLarger ? "rgba(255, 255, 255, 0.05)" : "transparent"}
          borderLeft={isMdOrLarger ? "1px solid rgba(255, 255, 255, 0.1)" : "none"}
          color="white"
          padding="3rem"
          width={isMdOrLarger ? "50%" : "100%"}
          height="100%"
          position={isMdOrLarger ? "relative" : "absolute"}
          top={isMdOrLarger ? "0" : "50%"}
          transform={isMdOrLarger ? "none" : "translateY(-50%)"}
          zIndex="1"
        >
          <Text
            color="white"
            fontSize={["lg", "xl", "2xl", "3xl"]}
            fontWeight="bold"
            mb="2rem"
          >
            {t("inicioNos.titulo")}
          </Text>
          <Text
            color="white"
            fontSize={["sm", "md", "lg", "lg"]}
            fontWeight="bold"
            mb="1rem"
          >
            {t("inicioNos.lineaDos")}
          </Text>
          <Text
            maxW="300px"
            textAlign="center"
            color="white"
            fontSize={["sm", "md", "lg", "lg"]}
            fontWeight="bold"
            mb="2rem"
          >
            {t("inicioNos.parametros")}
          </Text>
          <Button
            mt="4"
            display="flex"
            className="service-image"
            mx="auto"
            maxW="100px"
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
            borderRadius="full"
            px={8}
            onClick={() => navigate("/nosotros")}
          >
            {t('inicioNos.boton')}
          </Button>
        </Flex>
      </Flex>
      {/* Imagen nítida en fondo para pantallas pequeñas */}
      {!isMdOrLarger && (
        <OptimizedImage
          src={cloudUrl("public/RENDERS/EDIFICIO/e1.webp", { w: 800 })}
          alt="Imagen arquitectónica"
          aspectRatio="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "0",
          }}
        />
      )}
    </Flex>
  );
}
