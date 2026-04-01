import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { RiWhatsappFill } from "react-icons/ri";
import { WHATSAPP_URL } from "../utils/constants";

/**
 * Botón flotante de WhatsApp que aparece en todas las páginas.
 * Incluye un mensaje pre-escrito para facilitar el primer contacto.
 */
const WhatsAppButton = () => {
    const mensajePre = encodeURIComponent(
        "Hola SWAG Arquitectos! Estoy interesado en sus servicios de visualización arquitectónica."
    );
    const url = `${WHATSAPP_URL}?text=${mensajePre}`;

    return (
        <Tooltip label="Escríbenos por WhatsApp" placement="left" hasArrow>
            <Box
                position="fixed"
                bottom={{ base: "20px", md: "30px" }}
                right={{ base: "20px", md: "30px" }}
                zIndex={999}
            >
                <IconButton
                    as="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contactar por WhatsApp"
                    icon={<RiWhatsappFill size="28px" />}
                    bg="linear-gradient(135deg, #25D366, #128C7E)"
                    color="white"
                    borderRadius="full"
                    w={{ base: "56px", md: "64px" }}
                    h={{ base: "56px", md: "64px" }}
                    fontSize="2xl"
                    boxShadow="0 4px 20px rgba(37, 211, 102, 0.5)"
                    _hover={{
                        transform: "scale(1.12) translateY(-2px)",
                        boxShadow: "0 8px 30px rgba(37, 211, 102, 0.7)",
                    }}
                    _active={{ transform: "scale(0.97)" }}
                    transition="all 0.25s ease"
                />
            </Box>
        </Tooltip>
    );
};

export default WhatsAppButton;
