import fs from "fs";

const assetMapPath = '/Users/macbookproi9/PORTAFOLIO-ARQUI-main/public/asset-map.json';
const assetMap = JSON.parse(fs.readFileSync(assetMapPath, 'utf8'));

// Correct images 5, 6, 7
const corrections = [
    { key: "public/RENDERS/CHINACOTA/5.png", public_id: "5_iyxw2k", url: "https://res.cloudinary.com/dibjbl4zp/image/upload/v1775099841/5_iyxw2k.png", version: 1775099841 },
    { key: "public/RENDERS/CHINACOTA/6.png", public_id: "6_gfbkmw", url: "https://res.cloudinary.com/dibjbl4zp/image/upload/v1775099844/6_gfbkmw.png", version: 1775099844 },
    { key: "public/RENDERS/CHINACOTA/7.png", public_id: "7_qw1ttd", url: "https://res.cloudinary.com/dibjbl4zp/image/upload/v1775099847/7_qw1ttd.png", version: 1775099847 },
];

corrections.forEach(img => {
    assetMap[img.key] = {
        url: img.url,
        public_id: img.public_id,
        format: "png",
        version: img.version,
        is_video: false,
        hls: null
    };
});

fs.writeFileSync(assetMapPath, JSON.stringify(assetMap, null, 2));
console.log("Fixed asset-map.json with correct Chinacota image IDs.");
