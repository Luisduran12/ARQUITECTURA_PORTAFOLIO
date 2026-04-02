import { useState, useRef, useEffect, memo, useCallback } from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";
import { cloudVideo } from "../utils/cloudinary";

/**
 * OptimizedVideo — Senior Level Performance Component
 *
 * Features:
 * - IntersectionObserver: loads/plays only when visible
 * - HLS adaptive streaming support (m3u8) via Cloudinary
 * - Auto-poster via cloudVideo() helper
 * - Optimised MP4 fallback with vc_auto/f_auto
 * - playsInline + muted for mobile autoplay compatibility
 */
const OptimizedVideo = ({
    src,            // Direct HLS/MP4 URL  OR  asset-map key
    poster,         // Optional explicit poster override
    fallbackSrc,    // Explicit MP4 fallback override
    aspectRatio = "16/9",
    autoPlay = true,
    loop = true,
    muted = true,
    borderRadius = "xl",
    priority = false, // If true, starts loading immediately without waiting for observer
    quality = 'auto:best',
    width = 1920,
    controls = false, // New prop to show native video controls
    ...props
}) => {
    const [isVisible, setIsVisible] = useState(priority);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    // Resolve video sources through helper if key is given
    const resolved = src && !src.startsWith("http")
        ? cloudVideo(src, { w: width, q: quality })
        : { hls: src?.endsWith(".m3u8") ? src : null, mp4: src, poster: null };

    const hlsSrc = resolved.hls;
    const mp4Src = fallbackSrc || resolved.mp4;
    const posterSrc = poster || resolved.poster;

    // 1. IntersectionObserver — lazy load the video element itself
    useEffect(() => {
        if (priority) return; // Skip observer if priority is set

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [priority]);

    // 2. Play / pause based on visibility
    const tryPlay = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.play().catch(() => {
            /* autoplay blocked — silently ignored */
        });
    }, []);

    useEffect(() => {
        if (isVisible && autoPlay) {
            tryPlay();
        } else if (!isVisible && videoRef.current) {
            videoRef.current.pause();
        }
    }, [isVisible, autoPlay, tryPlay]);

    return (
        <Box
            ref={containerRef}
            position="relative"
            overflow="hidden"
            borderRadius={borderRadius}
            aspectRatio={aspectRatio}
            bg="black"
            {...props}
        >
            {/* Loading spinner */}
            {!isLoaded && isVisible && (
                <Center position="absolute" inset={0} zIndex={1}>
                    <Spinner color="whiteAlpha.600" size="xl" thickness="2px" />
                </Center>
            )}

            {/* Video element — only mounted once visible */}
            {isVisible && (
                <video
                    ref={videoRef}
                    poster={posterSrc}
                    onCanPlay={() => setIsLoaded(true)}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    controls={controls}
                    playsInline
                    preload="auto"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: isLoaded ? 1 : 0.3,
                        transition: "opacity 0.8s ease",
                    }}
                >
                    {/* HLS for Safari + modern browsers */}
                    {hlsSrc && <source src={hlsSrc} type="application/x-mpegURL" />}
                    {/* MP4 optimised fallback */}
                    {mp4Src && <source src={mp4Src} type="video/mp4" />}
                </video>
            )}

            {/* Static poster before video loads */}
            {!isVisible && posterSrc && (
                <Box
                    position="absolute"
                    inset={0}
                    bgImage={`url(${posterSrc})`}
                    bgSize="cover"
                    bgPos="center"
                    filter="brightness(0.75)"
                />
            )}
        </Box>
    );
};

export default memo(OptimizedVideo);
