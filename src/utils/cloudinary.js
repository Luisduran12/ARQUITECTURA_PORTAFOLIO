/**
 * cloudinary.js — Senior Level Cloudinary URL Builder
 * 
 * Centralizes all Cloudinary URL construction with automatic
 * format, quality, and responsive width transformations.
 * 
 * Usage:
 *   import { cloudUrl, cloudImg, cloudBg } from '../utils/cloudinary';
 * 
 *   cloudUrl('public/RENDERS/BBQ/b1.webp')           // auto transforms
 *   cloudUrl('public/RENDERS/BBQ/b1.webp', { w: 800, q: 'auto:best' })
 */

import assetMap from '../../public/asset-map.json';

const CLOUD_NAME = 'dibjbl4zp';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

// ─────────────────────────────────────────────────────────────────────────────
// Core builder — converts an asset-map key or a direct Cloudinary URL into a
// fully optimised URL with the requested transformations.
// ─────────────────────────────────────────────────────────────────────────────
export function cloudUrl(keyOrUrl, opts = {}) {
    const {
        w = null, // Default to null, let caller or CSS define width
        q = 'auto:best',
        f = 'auto',
        dpr = 'auto',
        extra = '',
    } = opts;

    // If the caller already has a full Cloudinary URL, inject transforms
    const raw = keyOrUrl?.includes('res.cloudinary.com')
        ? keyOrUrl
        : assetMap[keyOrUrl]?.url;

    if (!raw) {
        // Graceful fallback: return the key as-is (will 404, but won't crash)
        console.warn(`[cloudinary] No Cloudinary URL found for key: "${keyOrUrl}"`);
        return keyOrUrl;
    }

    const transforms = [
        f ? `f_${f}` : '',
        q ? `q_${q}` : '',
        (w && w !== 'auto') ? `w_${w}` : '',
        dpr ? `dpr_${dpr}` : '',
        extra,
    ]
        .filter(Boolean)
        .join(',');

    // If transforms is empty, return the raw URL as is
    if (!transforms) return raw;

    // Prevent double /upload/ injection
    if (raw.includes('/upload/')) {
        const parts = raw.split('/upload/');
        // If there's already some transformation, we might need a more complex merge,
        // but for now, let's just make sure we don't duplicate /upload/
        return `${parts[0]}/upload/${transforms}/${parts[1]}`;
    }

    return raw;
}

// ─────────────────────────────────────────────────────────────────────────────
// cloudImg — Returns srcSet-ready props for <img> or Chakra <Image>
// ─────────────────────────────────────────────────────────────────────────────
export function cloudImg(key, opts = {}) {
    const { priority = false, ...rest } = opts;
    const base = cloudUrl(key, { w: 1200, ...rest });
    const raw = assetMap[key]?.url || (key?.includes('res.cloudinary.com') ? key : null);

    const srcSet = raw ? [
        `${raw.replace('/upload/', '/upload/f_auto,q_auto,w_480/')} 480w`,
        `${raw.replace('/upload/', '/upload/f_auto,q_auto,w_768/')} 768w`,
        `${raw.replace('/upload/', '/upload/f_auto,q_auto,w_1280/')} 1280w`,
        `${raw.replace('/upload/', '/upload/f_auto,q_auto,w_1920/')} 1920w`,
    ].join(', ') : undefined;

    return {
        src: base,
        srcSet,
        sizes: '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
        loading: priority ? 'eager' : 'lazy',
        fetchpriority: priority ? 'high' : 'auto',
        decoding: priority ? 'sync' : 'async',
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// cloudBg — Returns a CSS `backgroundImage` value ready to use inline
// ─────────────────────────────────────────────────────────────────────────────
export function cloudBg(key, opts = {}) {
    return `url(${cloudUrl(key, opts)})`;
}

// ─────────────────────────────────────────────────────────────────────────────
// cloudVideo — Returns the HLS or MP4 URL for a video asset
// ─────────────────────────────────────────────────────────────────────────────
export function cloudVideo(key, opts = {}) {
    const entry = assetMap[key];
    if (!entry) {
        console.warn(`[cloudinary] No video entry found for key: "${key}"`);
        return { hls: null, mp4: null, poster: null };
    }

    const { w = 1920, q = 'auto:best' } = opts;

    // mp4 version: auto format, high quality, auto codec
    const mp4Optimized = entry.url?.replace('/upload/', `/upload/f_auto,q_${q},vc_auto,w_${w}/`);

    // Poster: First frame (so_0), auto format, high quality, high res
    const poster = entry.url
        ? entry.url
            .replace('/video/', '/image/')
            .replace(/\.[^.]+$/, '.webp')
            .replace('/upload/', `/upload/f_auto,q_${q},so_0,w_${w}/`)
        : null;

    return {
        hls: entry.hls || null,
        mp4: mp4Optimized || entry.url,
        poster,
    };
}
