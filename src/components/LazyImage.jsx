import { useState, useRef, useEffect, memo } from "react";
import { Box } from "@chakra-ui/react";

/**
 * LazyImage — Componente de imagen optimizado para producción.
 *
 * Características:
 * - Blur-up placeholder: muestra un color de fondo hasta que carga
 * - fetchpriority + loading correctos según si es above-the-fold
 * - decoding async para no bloquear el main thread
 * - Fade-in suave al cargar
 * - aspectRatio explícito previene CLS (Cumulative Layout Shift)
 */
const LazyImage = ({
    src,
    alt,
    aspectRatio = "16/9",
    priority = false,
    objectFit = "cover",
    borderRadius,
    width = "100%",
    height,
    boxShadow,
    style = {},
    ...props
}) => {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        // Si la imagen ya estaba en caché, onLoad no disparará
        if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
            setLoaded(true);
        }
    }, []);

    return (
        <Box
            position="relative"
            overflow="hidden"
            width={width}
            height={height}
            aspectRatio={!height ? aspectRatio : undefined}
            bg="gray.900"
            borderRadius={borderRadius}
            boxShadow={boxShadow}
            {...props}
        >
            {/* Shimmer placeholder visible hasta que la imagen carga */}
            {!loaded && (
                <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-r, gray.900, gray.800, gray.900)"
                    backgroundSize="200% 100%"
                    sx={{
                        animation: "shimmer 1.5s ease-in-out infinite",
                        "@keyframes shimmer": {
                            "0%": { backgroundPosition: "200% 0" },
                            "100%": { backgroundPosition: "-200% 0" },
                        },
                    }}
                />
            )}

            <img
                ref={imgRef}
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                fetchpriority={priority ? "high" : "auto"}
                decoding={priority ? "sync" : "async"}
                onLoad={() => setLoaded(true)}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit,
                    borderRadius,
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    ...style,
                }}
            />
        </Box>
    );
};

export default memo(LazyImage);
