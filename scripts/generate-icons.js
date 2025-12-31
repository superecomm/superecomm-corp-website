// Simple Node.js script to generate PWA icons
// This creates basic placeholder icons - replace with actual brand icons later

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SVG template for icon
const createSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#3B82F6"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.6}" 
        fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">S</text>
</svg>
`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Generating PWA icons...');

sizes.forEach(size => {
  const svg = createSVG(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  
  fs.writeFileSync(filepath, svg.trim());
  console.log(`✓ Generated ${filename}`);
});

// Create maskable icon (with safe zone)
const maskableSVG = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#3B82F6"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="300" 
        fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">S</text>
</svg>
`;

fs.writeFileSync(path.join(iconsDir, 'icon-512x512-maskable.svg'), maskableSVG.trim());
console.log('✓ Generated icon-512x512-maskable.svg');

console.log('\n✅ All icons generated successfully!');
console.log('\nNote: These are placeholder SVG icons. For production:');
console.log('1. Replace with actual PNG icons from your brand assets');
console.log('2. Use tools like https://www.pwabuilder.com/imageGenerator');
console.log('3. Ensure maskable icon has proper safe zones');

