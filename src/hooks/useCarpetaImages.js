// src/hooks/useCarpetaImages.js
import { useState, useEffect } from "react";

const CLOUDINARY_CLOUD_NAME = "dba6au6s5";

// Transformaciones Cloudinary optimizadas:
// w_1200 → máximo 1200px de ancho (reduce el peso 4-10x)
// q_auto:good → calidad automática buena (relación calidad/peso óptima)
// f_auto → entrega WebP o AVIF si el navegador lo soporta
const CLOUDINARY_TRANSFORM = "w_1200,q_auto:good,f_auto";

export const useCarpetaImages = (carpeta) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!carpeta) return;

        const fetchImages = async () => {
            setLoading(true);
            try {
                const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/portafolio_${carpeta}.json`;
                const res = await fetch(url);

                if (!res.ok) throw new Error("Cloudinary API restricted");

                const data = await res.json();

                const urls = (data.resources || []).map((r) => ({
                    src: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${CLOUDINARY_TRANSFORM}/${r.public_id}`,
                    // Thumbnail de baja resolución para el placeholder blur
                    thumb: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_20,q_10,f_auto/${r.public_id}`,
                }));

                setImages(urls);
            } catch {
                // Silently fallback to local images (handled in CarpetaImagenes)
                setImages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [carpeta]);

    return { images, loading };
};