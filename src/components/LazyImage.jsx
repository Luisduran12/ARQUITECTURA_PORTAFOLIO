import { useState } from "react";
import { Box, Image, Skeleton } from "@chakra-ui/react";
import { motion } from "framer-motion";

const LazyImage = ({ src, alt, height = { base: "180px", md: "250px" }, width = "100%", borderRadius = "lg", onClick, cursor = "pointer", ...imageProps }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleLoad = () => {
        setLoaded(true);
    };

    const handleError = () => {
        setError(true);
        setLoaded(true); // Stop skeleton even on error
    };

    const finalSrc = error
        ? "https://placehold.co/600x400/1a1a1a/555?text=Imagen+no+disponible"
        : src;

    return (
        <Box
            position="relative"
            width={width}
            height={height}
            overflow="hidden"
            borderRadius={borderRadius}
            bg="gray.900"
            cursor={cursor}
            onClick={onClick}
        >
            <Skeleton
                isLoaded={loaded}
                width="100%"
                height="100%"
                position="absolute"
                top="0"
                left="0"
                startColor="gray.800"
                endColor="gray.700"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%", height: "100%" }}
            >
                <Image
                    src={finalSrc}
                    alt={alt}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    onLoad={handleLoad}
                    onError={handleError}
                    loading="lazy"
                    {...imageProps}
                />
            </motion.div>
        </Box>
    );
};

export default LazyImage;
