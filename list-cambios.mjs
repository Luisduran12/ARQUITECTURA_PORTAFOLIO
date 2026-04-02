import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function listChangesFolder() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'INTERIOR ARBNB/CAMBIOS', // Search in the folder CAMBIOS
            max_results: 100
        });

        const images = result.resources.map(res => ({
            public_id: res.public_id,
            url: res.secure_url
        }));

        console.log(JSON.stringify(images, null, 2));
    } catch (error) {
        console.error("Error listing folder:", error);
    }
}

listChangesFolder();
