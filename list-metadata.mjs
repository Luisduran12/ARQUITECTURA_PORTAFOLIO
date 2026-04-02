import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function listWithContext() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'ZONA SOCIAL',
            context: true,
            max_results: 100
        });

        console.log(JSON.stringify(result.resources.map(r => ({
            public_id: r.public_id,
            display_name: r.display_name,
            context: r.context,
            folder: r.asset_folder
        })), null, 2));
    } catch (e) {
        console.error(e);
    }
}

listWithContext();
