import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function listAllResources() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 500
        });

        const cambosImages = result.resources.filter(res => res.public_id.includes('CAMBIOS'));
        console.log(JSON.stringify(cambosImages, null, 2));
    } catch (error) {
        console.error("Error listing resources:", error);
    }
}

listAllResources();
