// src/hooks/useCarpetaImages.js
import { useState, useEffect } from "react";

const CLOUDINARY_CLOUD_NAME = "dibjbl4zp";

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
                // Cargamos el nuevo mapa de activos multimedia
                const assetMapResponse = await fetch('/asset-map.json');
                if (assetMapResponse.ok) {
                    const assetMap = await assetMapResponse.json();

                    // Buscamos imágenes dentro de la carpeta RENDERS específica
                    const folderPath = `public/RENDERS/${carpeta}/`;
                    const urls = Object.keys(assetMap)
                        .filter(path => path.includes(folderPath) && !assetMap[path].is_video)
                        .map(path => ({
                            src: assetMap[path].url,
                            publicId: assetMap[path].public_id
                        }));

                    if (urls.length > 0) {
                        setImages(urls);
                        setLoading(false);
                        return;
                    }
                }

                // Fallback a lista de Cloudinary si el mapa no está disponible
                const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/portafolio_${carpeta}.json`;
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    const urls = data.resources.map((r) => ({
                        src: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${CLOUDINARY_TRANSFORM}/${r.public_id}`,
                        publicId: r.public_id
                    }));
                    setImages(urls);
                }
            } catch (err) {
                console.error("Error fetching images:", err);
                setImages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [carpeta]);

    return { images, loading };
};