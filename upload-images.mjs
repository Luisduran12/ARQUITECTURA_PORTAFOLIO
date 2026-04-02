import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME?.trim(),
  api_key: process.env.API_KEY?.trim(),
  api_secret: process.env.API_SECRET?.trim(),
});

const imageMap = {};
const uploadedSet = new Set();

const ALLOWED_EXT = /\.(jpg|jpeg|png|webp)$/i;

async function uploadImage(filePath) {
  const fileName = path.basename(filePath);
  const nameWithoutExt = fileName.split(".")[0];

  if (uploadedSet.has(fileName)) return;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "arquitectura",
      resource_type: "image",
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    });

    const optimizedUrl = result.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_auto:best,w_auto,dpr_auto/"
    );

    imageMap[filePath.replace("./public", "")] = optimizedUrl;

    uploadedSet.add(fileName);

    console.log(`✔ Subida: ${fileName}`);
  } catch (error) {
    console.error(`❌ Error subiendo ${fileName}:`, error.message);
  }
}

async function walk(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await walk(fullPath);
    } else if (ALLOWED_EXT.test(file)) {
      await uploadImage(fullPath);
    }
  }
}

async function main() {
  console.log("🚀 Iniciando subida a Cloudinary...\n");

  await walk("./public");

  fs.writeFileSync("image-map.json", JSON.stringify(imageMap, null, 2));

  console.log("\nSubida completa");
  console.log("Total imagenes: " + Object.keys(imageMap).length);
}

main();
