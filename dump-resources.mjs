import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function dumpAllResources() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 500,
        });
        fs.writeFileSync('/Users/macbookproi9/PORTAFOLIO-ARQUI-main/all-resources.json', JSON.stringify(result.resources, null, 2));
        console.log('Dumped ' + result.resources.length + ' resources to all-resources.json');
    } catch (e) {
        console.error(e);
    }
}

dumpAllResources();
