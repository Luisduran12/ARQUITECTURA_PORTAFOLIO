import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

/**
 * Botón "Volver Arriba" – aparece solo cuando el usuario scrollea más de 400px.
 * Se posiciona encima del botón de WhatsApp.
 */
const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <Tooltip label="Volver arriba" placement="left" hasArrow>
            <IconButton
                aria-label="Volver al inicio de la página"
                icon={<FaArrowUp />}
                onClick={scrollToTop}
                position="fixed"
                bottom={{ base: "86px", md: "106px" }}
                right={{ base: "20px", md: "30px" }}
                zIndex={998}
                bg="rgba(30,29,29,0.85)"
                backdropFilter="blur(10px)"
                color="white"
                border="1px solid rgba(255,255,255,0.15)"
                borderRadius="full"
                w={{ base: "48px", md: "56px" }}
                h={{ base: "48px", md: "56px" }}
                boxShadow="0 4px 15px rgba(0,0,0,0.4)"
                _hover={{
                    bg: "rgba(0, 210, 255, 0.15)",
                    borderColor: "rgba(0, 210, 255, 0.5)",
                    transform: "translateY(-3px)",
                }}
                _active={{ transform: "scale(0.95)" }}
                transition="all 0.25s ease"
            />
        </Tooltip>
    );
};

export default BackToTop;
