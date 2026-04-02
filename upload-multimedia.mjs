import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

const assetMap = {};
const ALLOWED_IMAGES = /\.(jpg|jpeg|png|webp)$/i;
const ALLOWED_VIDEOS = /\.(mp4|webm|mov)$/i;

async function uploadAsset(filePath) {
    const fileName = path.basename(filePath);
    const isVideo = ALLOWED_VIDEOS.test(fileName);

    // Create a clean public ID based on folder structure
    let publicId = filePath
        .replace("./public/", "")
        .replace(path.extname(filePath), "");

    console.log(`📡 Subiendo ${isVideo ? 'video' : 'imagen'}: ${fileName}...`);

    try {
        const uploadOptions = {
            public_id: publicId,
            folder: "arquitectura_premium",
            resource_type: isVideo ? "video" : "image",
            overwrite: true,
            invalidate: true,
        };

        // If it's a large video, use streaming profiles
        if (isVideo) {
            uploadOptions.eager = [
                { streaming_profile: "full_hd", format: "m3u8" },
                { streaming_profile: "hd", format: "m3u8" }
            ];
            uploadOptions.eager_async = true;
        }

        const result = await cloudinary.uploader.upload(filePath, uploadOptions);

        // Store the secure URL and the HLS URL if video
        assetMap[filePath.replace("./public", "")] = {
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            version: result.version,
            is_video: isVideo,
            hls: isVideo ? result.eager?.[0]?.secure_url : null
        };

        console.log(`✔ Éxito: ${fileName}`);
    } catch (error) {
        console.error(`❌ Error en ${fileName}:`, error.message);
    }
}

async function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            await walk(fullPath);
        } else if (ALLOWED_IMAGES.test(file) || ALLOWED_VIDEOS.test(file)) {
            await uploadAsset(fullPath);
        }
    }
}

async function main() {
    console.log("🚀 Iniciando Optimización Multimedia Premium...\n");
    await walk("./public");

    fs.writeFileSync("./public/asset-map.json", JSON.stringify(assetMap, null, 2));
    console.log("\n✨ Proceso completo. asset-map.json generado.");
}

main();
