import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

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

        fs.writeFileSync('/Users/macbookproi9/PORTAFOLIO-ARQUI-main/zona-social-list.json', JSON.stringify(zonaSocial, null, 2));
        console.log('Listed ' + zonaSocial.length + ' images');
    } catch (e) {
        console.error(e);
    }
}

listZonaSocial();
