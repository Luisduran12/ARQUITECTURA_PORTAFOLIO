import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function explore() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 50,
        });
        console.log('Total resources in root/all:', result.resources.length);
        console.log(result.resources.map(r => r.public_id));
    } catch (e) {
        console.error(e);
    }
}

explore();
