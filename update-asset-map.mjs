import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function main() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 500,
        });

        const cambios = result.resources.filter(res => res.asset_folder === 'INTERIOR ARBNB/CAMBIOS');

        const assetMapPath = '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/public/asset-map.json';
        const assetMap = JSON.parse(fs.readFileSync(assetMapPath, 'utf8'));

        cambios.forEach(res => {
            const key = `public/CAMBIOS/${res.display_name}.${res.format}`;
            assetMap[key] = {
                url: res.secure_url,
                public_id: res.public_id,
                format: res.format,
                version: res.version,
                is_video: false,
                hls: null
            };
            console.log(`Added key: ${key}`);
        });

        fs.writeFileSync(assetMapPath, JSON.stringify(assetMap, null, 2));
        console.log('Updated asset-map.json');
    } catch (e) {
        console.error(e);
    }
}

main();
