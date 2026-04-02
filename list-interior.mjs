import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function listInteriorArbnb() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'INTERIOR ARBNB',
            max_results: 100
        });
        console.log(JSON.stringify(result.resources, null, 2));
    } catch (e) {
        console.error(e);
    }
}

listInteriorArbnb();
