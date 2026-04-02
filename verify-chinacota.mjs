import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function verifyFiles() {
    try {
        console.log("Listing folder: CABAÑA CHINACOTA");
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'CABAÑA CHINACOTA',
            max_results: 100
        });

        // Search is more reliable for folders
        const searchResult = await cloudinary.search
            .expression('folder:"CABAÑA CHINACOTA"')
            .execute();

        console.log("Direct resources found: " + result.resources.length);
        console.log("Search resources found: " + searchResult.resources.length);

        const allRes = searchResult.resources.length > 0 ? searchResult.resources : result.resources;

        console.log(JSON.stringify(allRes.map(r => ({
            public_id: r.public_id,
            display_name: r.filename || r.display_name,
            url: r.secure_url
        })), null, 2));
    } catch (e) {
        console.error(e);
    }
}

verifyFiles();
