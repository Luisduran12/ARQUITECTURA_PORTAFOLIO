import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function listZonaSocial() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 500
        });

        const zonaSocial = result.resources.filter(res =>
            res.asset_folder && res.asset_folder.includes('ZONA SOCIAL')
        );

        console.log(JSON.stringify(zonaSocial.map(r => ({
            public_id: r.public_id,
            url: r.secure_url,
            display_name: r.display_name,
            folder: r.asset_folder
        })), null, 2));
    } catch (e) {
        console.error(e);
    }
}

listZonaSocial();
