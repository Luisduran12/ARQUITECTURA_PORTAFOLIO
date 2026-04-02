import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function listFolders(parent = '') {
    try {
        const result = await cloudinary.api.sub_folders(parent);
        console.log(`Folders in ${parent || 'root'}:`, result.folders.map(f => f.name));
        for (const folder of result.folders) {
            await listFolders(parent ? `${parent}/${folder.name}` : folder.name);
        }
    } catch (error) {
        console.error(`Error listing folders in ${parent}:`, error.message);
    }
}

listFolders();
