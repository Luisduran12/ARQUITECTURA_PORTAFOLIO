import {
  Grid,
  GridItem,
  Flex,
  Text,
  IconButton,
  Image,
  useMediaQuery,
  Link,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import IconButtonReusable from "./IconButtonReusable";
import { useTranslation } from "react-i18next";
import { CONTACT_INFO, WHATSAPP_URL } from "../utils/constants";
import OptimizedImage from "./OptimizedImage";
import { cloudUrl } from "../utils/cloudinary";

function Footer() {
  const { t } = useTranslation();
  const [w] = useMediaQuery("(min-width: 900px)");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaFacebook />,
      href: CONTACT_INFO.facebook,
      colorHover: "blue",
    },
    {
      icon: <RiWhatsappFill size="20px" />,
      href: WHATSAPP_URL,
      colorHover: "green.500",
    },
    {
      icon: <FaInstagram size="18px" />,
      href: CONTACT_INFO.instagram,
      colorHover: "pink.400",
    },
  ];

  return (
    <Flex
      position="relative"
      bottom="0"
      width="100%"
      height="400px"
      bg="#1E1D1D"
      shadow="0px -5px 10px rgba(0,0,0,0.5)"
      alignItems={"center"}
      padding="36px"
      direction={w ? "row" : "column"}
      justifyContent="space-around"
    >
      {w ? (
        <Grid templateColumns="1fr 2px 1fr 1fr" gap={6} w={"100%"}>
          <GridItem
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={4}
          >
            <OptimizedImage src={cloudUrl("public/publico/VER_WHITE.webp", { w: 220 })} alt="Logo SWAG" width="110px" aspectRatio="auto" />
            <OptimizedImage src={cloudUrl("public/publico/LogoJulian.webp", { w: 220 })} alt="Logo Julián" width="110px" aspectRatio="auto" />
          </GridItem>
          <GridItem height="100%" bg="white" />
          <GridItem
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontSize="lg" mb="24px">
              Email:{" "}
              <Link href={`mailto:${CONTACT_INFO.email}`}>
                {CONTACT_INFO.email}
              </Link>
            </Text>
            <Flex justifyContent="space-around" width="300px" mb="24px">
              {socialLinks.map((link, index) => (
                <IconButtonReusable
                  key={index}
                  icon={link.icon}
                  href={link.href}
                  colorHover={link.colorHover}
                />
              ))}
            </Flex>
            <Flex justifyContent="center" direction={"column"}>
              <Text textAlign="center" color="gray">
                {t('footer.derechos')} ©{currentYear}
              </Text>
              <Text textAlign="center" color="gray">
                <strong>{t('footer.empresa')}</strong>
              </Text>
            </Flex>
          </GridItem>
        </Grid>
      ) : (
        <Flex direction="column" alignItems="center" width="100%">
          <Flex gap={4} mb="24px">
            <OptimizedImage src={cloudUrl("public/publico/VER_WHITE.webp", { w: 200 })}
              alt="Logo SWAG"
              width="100px"
              aspectRatio="auto"
            />
            <OptimizedImage src={cloudUrl("public/publico/LogoJulian.webp", { w: 200 })}
              alt="Logo Julián"
              width="100px"
              aspectRatio="auto"
            />
          </Flex>
          <Text color="white" fontSize="lg" mb="24px">
            Email:{" "}
            <Link href={`mailto:${CONTACT_INFO.email}`}>
              {CONTACT_INFO.email}
            </Link>
          </Text>
          <Flex justifyContent="center" mb="24px">
            <IconButton
              bg="none"
              className="animate-top"
              _hover={{ color: "blue" }}
              icon={<FaFacebook />}
              color="white"
              onClick={() =>
                window.open(
                  CONTACT_INFO.facebook,
                  "_blank"
                )
              }
            />
            <IconButton
              bg="none"
              className="animate-top"
              _hover={{ color: "green.500" }}
              icon={<RiWhatsappFill size="20px" />}
              color="white"
              onClick={() =>
                window.open(WHATSAPP_URL, "_blank")
              }
            />
            <IconButton
              bg="none"
              className="animate-top"
              _hover={{ color: "pink.400" }}
              icon={<FaInstagram size="18px" />}
              color="white"
              onClick={() =>
                window.open(
                  CONTACT_INFO.instagram,
                  "_blank"
                )
              }
            />
          </Flex>
          <Flex direction={"column"} alignItems="center">
            <Text textAlign="center" color="gray">
              {t('footer.derechos')} ©{currentYear}
            </Text>
            <Text textAlign="center" color="gray">
              <strong>{t('footer.empresa')}</strong>
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Footer;
