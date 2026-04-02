import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function findSeven() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 500
        });
        const sevens = result.resources.filter(r => r.display_name.startsWith('7_'));
        console.log(JSON.stringify(sevens.map(r => ({ public_id: r.public_id, folder: r.asset_folder, url: r.secure_url })), null, 2));
    } catch (e) {
        console.error(e);
    }
}

findSeven();
