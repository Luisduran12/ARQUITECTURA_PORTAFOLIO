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
        const searchResult = await cloudinary.search
            .expression('public_id: *7_*')
            .sort_by('created_at', 'desc')
            .execute();

        console.log(JSON.stringify(searchResult.resources.map(r => ({
            public_id: r.public_id,
            folder: r.folder,
            url: r.secure_url
        })), null, 2));
    } catch (e) {
        console.error(e);
    }
}

findSeven();
