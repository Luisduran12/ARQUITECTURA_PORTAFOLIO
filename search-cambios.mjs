import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME?.trim(),
    api_key: process.env.API_KEY?.trim(),
    api_secret: process.env.API_SECRET?.trim(),
});

async function searchCambios() {
    try {
        const result = await cloudinary.search
            .expression('folder:CAMBIOS')
            .execute();
        console.log(JSON.stringify(result.resources.map(r => ({ public_id: r.public_id, url: r.secure_url })), null, 2));

        const result2 = await cloudinary.search
            .expression('folder:INTERIOR ARBNB/CAMBIOS')
            .execute();
        console.log("INTERIOR ARBNB/CAMBIOS:");
        console.log(JSON.stringify(result2.resources.map(r => ({ public_id: r.public_id, url: r.secure_url })), null, 2));

        const result3 = await cloudinary.search
            .expression('folder:arquitectura/CAMBIOS')
            .execute();
        console.log("arquitectura/CAMBIOS:");
        console.log(JSON.stringify(result3.resources.map(r => ({ public_id: r.public_id, url: r.secure_url })), null, 2));
    } catch (e) {
        console.error(e);
    }
}

searchCambios();
