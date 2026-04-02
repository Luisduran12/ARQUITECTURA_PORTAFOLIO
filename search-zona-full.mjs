import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function searchZonaSocial() {
    try {
        const result = await cloudinary.search
            .expression('folder: "ZONA SOCIAL" OR folder: "ZONA SOCIAL/PROPUESTAS"')
            .with_field('context')
            .with_field('tags')
            .max_results(100)
            .execute();

        console.log(JSON.stringify(result.resources.map(r => ({
            public_id: r.public_id,
            display_name: r.filename,
            context: r.context,
            tags: r.tags,
            folder: r.folder,
            url: r.secure_url
        })), null, 2));
    } catch (e) {
        console.error(e);
    }
}

searchZonaSocial();
