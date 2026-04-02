import { useState, useRef, useEffect, memo } from "react";
import { Box, Skeleton } from "@chakra-ui/react";
import { cloudUrl } from "../utils/cloudinary";

/**
 * OptimizedImage — Senior Level Performance Component
 *
 * Features:
 * - Cloudinary Dynamic Transformations via cloudUrl() helper (f_auto, q_auto, dpr_auto)
 * - LQIP (Low Quality Image Placeholder) blur-up effect
 * - Responsive srcSet via Cloudinary w_ parameter
 * - Priority loading for above-the-fold / hero content
 * - CLS prevention via aspectRatio placeholder
 */
const OptimizedImage = ({
    src,            // Cloudinary URL or raw asset-map key
    alt = "",
    aspectRatio = "16/9",
    priority = false,
    objectFit = "cover",
    borderRadius = "md",
    width = "100%",
    height,         // Optional explicit height
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef(null);

    // Build optimised URLs through the central helper
    const isCloud = src?.includes("res.cloudinary.com");
    const rawSrc = isCloud ? src : null;

    // Full quality URL at default display width
    const mainSrc = src ? cloudUrl(src, { w: 1280 }) : src;

    // Tiny blurred placeholder for LQIP
    const lqipSrc = rawSrc
        ? rawSrc.replace("/upload/", "/upload/f_auto,q_5,w_40,e_blur:800/")
        : null;

    // srcSet for responsive images
    const srcSet = rawSrc
        ? [480, 768, 1280, 1920]
            .map((w) => `${rawSrc.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`)} ${w}w`)
            .join(", ")
        : undefined;

    useEffect(() => {
        if (imgRef.current?.complete) setIsLoaded(true);
    }, [src]);

    return (
        <Box
            position="relative"
            overflow="hidden"
            width={width}
            height={height}
            aspectRatio={aspectRatio === "none" ? undefined : aspectRatio}
            bg="gray.900"
            borderRadius={borderRadius}
            flexShrink={0}
            {...props}
        >
            {/* 1. LQIP blur-up placeholder (Cloudinary assets only) */}
            {lqipSrc && !isLoaded && !hasError && (
                <img
                    src={lqipSrc}
                    alt=""
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit,
                        filter: "blur(20px)",
                        transform: "scale(1.08)",
                        opacity: 1,
                        transition: "opacity 0.4s ease",
                    }}
                />
            )}

            {/* 2. Skeleton for non-Cloudinary or slow connections */}
            {!isLoaded && !lqipSrc && !hasError && (
                <Skeleton
                    position="absolute"
                    inset={0}
                    width="100%"
                    height="100%"
                    startColor="gray.800"
                    endColor="gray.700"
                />
            )}

            {/* 3. Main image */}
            <img
                ref={imgRef}
                src={mainSrc}
                srcSet={srcSet}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                alt={alt}
                width={typeof width === "string" && width.endsWith("%") ? undefined : width}
                loading={priority ? "eager" : "lazy"}
                fetchpriority={priority ? "high" : "auto"}
                decoding={priority ? "sync" : "async"}
                onLoad={() => setIsLoaded(true)}
                onError={() => { setHasError(true); setIsLoaded(true); }}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit,
                    opacity: isLoaded ? 1 : 0,
                    transition: "opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                    willChange: "opacity",
                }}
            />
        </Box>
    );
};

export default memo(OptimizedImage);
