import React, { memo } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import OptimizedImage from "./OptimizedImage";

const PortfolioCard = ({ src, alt, titulo, subtitulo, onClick }) => {
    return (
        <Box
            position="relative"
            borderRadius="12px"
            overflow="hidden"
            cursor="pointer"
            onClick={onClick}
            role="group"
            width="100%"
            height="310px"
            bg="gray.900"
            transition="all 0.3s ease"
        >
            {/* Main Image with Zoom Effect */}
            <Box
                width="100%"
                height="100%"
                transition="transform 0.3s ease"
                _groupHover={{ transform: "scale(1.03)" }}
            >
                <OptimizedImage
                    src={src}
                    alt={alt}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    borderRadius="0" // Managed by parent
                />
            </Box>

            {/* Dark Overlay Gradient */}
            <Box
                position="absolute"
                inset="0"
                background="linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
                transition="opacity 0.3s ease"
                _groupHover={{ opacity: 0.9 }}
            />

            {/* Content - Title and Subtitle */}
            <VStack
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                p={6}
                align="flex-start"
                spacing={1}
                zIndex={2}
            >
                <Text
                    color="white"
                    fontSize="lg"
                    fontWeight="200"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                >
                    {titulo}
                </Text>
                {subtitulo && (
                    <Text
                        color="rgba(255,255,255,0.6)"
                        fontSize="xs"
                        fontWeight="300"
                        textTransform="uppercase"
                        letterSpacing="0.05em"
                    >
                        {subtitulo}
                    </Text>
                )}
            </VStack>
        </Box>
    );
};

export default memo(PortfolioCard);
