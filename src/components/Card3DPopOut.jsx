import React, { useRef } from "react";
import { Box, Text } from "@chakra-ui/react";

/**
 * Card3DPopOut — Tarjeta con efecto 3D interactivo
 * El marco rota siguiendo el cursor y la imagen inferior "rompe" el borde.
 */
const Card3DPopOut = ({
    src,
    alt,
    titulo,
    subtitulo = "",
    onClick,
    width = "100%",
    height = "320px",
}) => {
    const cardRef = useRef(null);
    const innerRef = useRef(null);
    const popRef = useRef(null);
    const shadowRef = useRef(null);

    const MAX_ROT = 14;
    const POP_Z = 60;

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        const rotY = (dx / (rect.width / 2)) * MAX_ROT;
        const rotX = -(dy / (rect.height / 2)) * MAX_ROT;

        innerRef.current.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;

        const intensity = Math.sqrt((dx / rect.width) ** 2 + (dy / rect.height) ** 2);
        const tz = POP_Z + intensity * 25;
        const ox = (dx / rect.width) * 10;
        const oy = (dy / rect.height) * 7;

        popRef.current.style.transform = `translateX(calc(-50% + ${ox}px)) translateY(${oy}px) translateZ(${tz}px) scale(1.07)`;
        popRef.current.style.filter = `drop-shadow(0 18px 28px rgba(0,0,0,0.75))`;

        if (shadowRef.current) {
            shadowRef.current.style.transform = `translateX(calc(-50% + ${-ox * 1.4}px)) scaleX(${1 + intensity * 0.25})`;
            shadowRef.current.style.opacity = "1";
        }
    };

    const handleMouseLeave = () => {
        innerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
        popRef.current.style.transform = "translateX(-50%) translateZ(0px) scale(1)";
        popRef.current.style.filter = "none";
        if (shadowRef.current) {
            shadowRef.current.style.opacity = "0";
        }
    };

    return (
        <Box
            ref={cardRef}
            position="relative"
            width={width}
            height={height}
            style={{ perspective: "900px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            cursor="pointer"
            onClick={onClick}
            overflow="visible"
        >
            {/* ── Marco rotante ── */}
            <Box
                ref={innerRef}
                width="100%"
                height="100%"
                position="relative"
                borderRadius="18px"
                overflow="visible"
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.1s ease",
                }}
            >
                {/* Imagen de fondo dentro del marco */}
                <Box
                    borderRadius="18px"
                    overflow="hidden"
                    width="100%"
                    height="100%"
                    position="relative"
                    boxShadow="0 24px 60px rgba(0,0,0,0.55)"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <Box
                        as="img"
                        src={src}
                        alt={alt}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        display="block"
                        loading="lazy"
                        decoding="async"
                        style={{
                            filter: "brightness(0.88) contrast(1.05)",
                            transition: "filter 0.3s ease",
                        }}
                        onError={(e) => {
                            e.target.src = "https://placehold.co/600x400/111/444?text=Sin+imagen";
                        }}
                    />

                    {/* Overlay degradado */}
                    <Box
                        position="absolute"
                        inset="0"
                        background="linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)"
                        borderRadius="18px"
                    />

                    {/* Título sobre la imagen */}
                    <Box position="absolute" bottom="14px" left="16px" right="16px">
                        <Text
                            fontSize="sm"
                            fontWeight="500"
                            color="white"
                            letterSpacing="0.1em"
                            textTransform="uppercase"
                            fontFamily="'Playfair Display', serif"
                            textShadow="0 2px 8px rgba(0,0,0,0.8)"
                            noOfLines={1}
                        >
                            {titulo}
                        </Text>
                    </Box>
                </Box>

                {/* ── Objeto pop-out: parte baja de la imagen que "rompe" el marco ── */}
                <Box
                    ref={popRef}
                    as="img"
                    src={src}
                    alt={`${alt} pop`}
                    position="absolute"
                    bottom="-28px"
                    left="50%"
                    width="75%"
                    height="auto"
                    objectFit="cover"
                    objectPosition="bottom"
                    borderRadius="12px"
                    display="block"
                    loading="lazy"
                    decoding="async"
                    style={{
                        transform: "translateX(-50%) translateZ(0px) scale(1)",
                        transition: "transform 0.1s ease, filter 0.1s ease",
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                        pointerEvents: "none",
                        maxHeight: "150px",
                    }}
                    onError={(e) => { e.target.style.display = "none"; }}
                />

                {/* ── Sombra del objeto ── */}
                <Box
                    ref={shadowRef}
                    position="absolute"
                    bottom="-48px"
                    left="50%"
                    width="60%"
                    height="24px"
                    pointerEvents="none"
                    style={{
                        transform: "translateX(-50%)",
                        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 72%)",
                        filter: "blur(8px)",
                        opacity: 0,
                        transition: "opacity 0.2s ease, transform 0.1s ease",
                    }}
                />

                {/* ── Etiqueta flotante de proyecto ── */}
                {subtitulo && (
                    <Box
                        position="absolute"
                        right="-118px"
                        top="50%"
                        style={{
                            transform: "translateY(-50%) translateZ(70px)",
                            transformStyle: "preserve-3d",
                            pointerEvents: "none",
                            opacity: 0,
                            transition: "opacity 0.25s ease",
                        }}
                        className="project-float-tag"
                        bg="rgba(10,10,10,0.88)"
                        backdropFilter="blur(12px)"
                        border="1px solid rgba(255,255,255,0.1)"
                        borderRadius="12px"
                        p="12px 14px"
                        width="115px"
                        zIndex="30"
                    >
                        <Text fontSize="9px" letterSpacing="0.2em" textTransform="uppercase" color="rgba(0,200,255,0.75)" mb="4px">
                            Proyecto
                        </Text>
                        <Text fontFamily="'Playfair Display', serif" fontSize="14px" color="white" lineHeight="1.2">
                            {titulo}
                        </Text>
                        {subtitulo && (
                            <Text fontSize="10px" color="rgba(255,255,255,0.35)" mt="5px" letterSpacing="0.1em">
                                {subtitulo}
                            </Text>
                        )}
                    </Box>
                )}
            </Box>

            {/* CSS-in-JS para la etiqueta flotante hover */}
            <style>{`
        div:hover .project-float-tag { opacity: 1 !important; }
      `}</style>
        </Box>
    );
};

export default React.memo(Card3DPopOut);
