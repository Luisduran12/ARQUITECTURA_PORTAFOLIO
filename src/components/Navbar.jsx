import {
  Flex,
  Image,
  Box,
  useMediaQuery,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Button,
  Icon,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaBars } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import IconButtonReusable from "./IconButtonReusable";
import { useTranslation } from "react-i18next";
import { CONTACT_INFO, WHATSAPP_URL } from "../utils/constants";

function Navbar() {
  const { t } = useTranslation();
  const [w] = useMediaQuery("(min-width: 900px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const socialLinks = [
    {
      icon: <FaFacebook />,
      href: CONTACT_INFO.facebook,
      colorHover: "blue",
      ariaLabel: "Visitar Facebook de SWAG Arquitectos",
    },
    {
      icon: <RiWhatsappFill size="20px" />,
      href: WHATSAPP_URL,
      colorHover: "green.500",
      ariaLabel: "Contactar por WhatsApp",
    },
    {
      icon: <FaInstagram size="18px" />,
      href: CONTACT_INFO.instagram,
      colorHover: "pink.400",
      ariaLabel: "Visitar Instagram de SWAG Arquitectos",
    },
  ];

  const navLinks = [
    { to: "/", label: t("navbar.inicio") },
    { to: "/servicios", label: t("navbar.servicios") },
    { to: "/portafolio", label: t("navbar.portafolio") },
    { to: "/nosotros", label: t("navbar.nosotros") },
    { to: "/contacto", label: t("navbar.contacto") },
  ];

  return (
    <Flex
      position="fixed"
      width="100%"
      backdropFilter="blur(15px)"
      bg="rgba(30,29,29,0.7)"
      padding="24px 36px"
      shadow="0px 4px 20px rgba(0,0,0,0.4)"
      justifyContent="space-between"
      alignItems="center"
      maxH={w ? "110px" : "130px"}
      zIndex="11"
    >
      <Flex direction="column">
        <Flex>
          <RouterLink to="/" aria-label="Inicio - SWAG Arquitectos">
            <Image loading="lazy" src="./publico/HOR_WHITE.webp" alt="Logo SWAG Arquitectos" w="120px" />
          </RouterLink>
          <RouterLink to="/" aria-label="Inicio - SWAG Arquitectos">
            <Image loading="lazy" src="./publico/LogoJulian.webp"
              alt="Logo Julián"
              w="60px"
              ml="10px"
            />
          </RouterLink>
        </Flex>
        {!w && (
          <Box mt={2}>
            {socialLinks.map((link, index) => (
              <IconButtonReusable
                key={index}
                icon={link.icon}
                href={link.href}
                colorHover={link.colorHover}
                ariaLabel={link.ariaLabel}
              />
            ))}
          </Box>
        )}
      </Flex>

      {w ? (
        <Box textAlign="center" alignContent={"center"}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              as={RouterLink}
              to={link.to}
              m="0px 10px"
              color="white"
              textDecoration={location.pathname === link.to ? "underline" : "none"}
              _hover={{ textDecoration: "underline", opacity: 0.85 }}
              transition="opacity 0.2s ease"
            >
              {link.label}
            </Link>
          ))}
        </Box>
      ) : (
        <Button bg="transparent" onClick={onOpen} _hover={{}} _active={{}} aria-label="Abrir menú de navegación">
          <Icon as={FaBars} fontSize="20px" color="white"></Icon>
        </Button>
      )}

      {w && (
        <Box>
          {socialLinks.map((link, index) => (
            <IconButtonReusable
              key={index}
              icon={link.icon}
              href={link.href}
              colorHover={link.colorHover}
              ariaLabel={link.ariaLabel}
            />
          ))}
        </Box>
      )}

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent bg="#1E1D1D" pt="70px">
            <DrawerCloseButton color="white" aria-label="Cerrar menú" />
            <DrawerBody>
              <Flex direction="column" textAlign="center">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    as={RouterLink}
                    to={link.to}
                    mb="10px"
                    p="3px"
                    display="block"
                    color="white"
                    onClick={onClose}
                    _hover={{
                      borderRadius: "md",
                      bg: "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
}

export default Navbar;
