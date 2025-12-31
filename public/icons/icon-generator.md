# PWA Icon Generation Guide

## Required Icons

You need to generate the following icon sizes for your PWA:

1. **icon-72x72.png** (72x72 pixels)
2. **icon-96x96.png** (96x96 pixels)
3. **icon-128x128.png** (128x128 pixels)
4. **icon-144x144.png** (144x144 pixels)
5. **icon-152x152.png** (152x152 pixels)
6. **icon-192x192.png** (192x192 pixels)
7. **icon-384x384.png** (384x384 pixels)
8. **icon-512x512.png** (512x512 pixels)
9. **icon-512x512-maskable.png** (512x512 pixels with safe zone for adaptive icons)

## Generation Methods

### Option 1: Using Online Tools
- **PWA Asset Generator**: https://www.pwabuilder.com/imageGenerator
- Upload your source logo/icon (ideally 512x512 or larger)
- Download all generated sizes

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick first
# Then run for each size:
convert source-icon.png -resize 72x72 icon-72x72.png
convert source-icon.png -resize 96x96 icon-96x96.png
convert source-icon.png -resize 128x128 icon-128x128.png
convert source-icon.png -resize 144x144 icon-144x144.png
convert source-icon.png -resize 152x152 icon-152x152.png
convert source-icon.png -resize 192x192 icon-192x192.png
convert source-icon.png -resize 384x384 icon-384x384.png
convert source-icon.png -resize 512x512 icon-512x512.png
```

### Option 3: Using Sharp (Node.js)
Install: `npm install sharp`

Then run this script:
```javascript
const sharp = require('sharp');
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
  sharp('source-icon.png')
    .resize(size, size)
    .toFile(`icon-${size}x${size}.png`);
});
```

## Maskable Icon Requirements

For the maskable icon (icon-512x512-maskable.png):
- Place your logo in the center 80% of the canvas
- Leave 10% padding on all sides (safe zone)
- Use solid background color
- Test at: https://maskable.app/

## Temporary Placeholder

For now, you can use your existing vite.svg or company logo and convert it to PNG format at these sizes.
Place the generated files in this `public/icons/` directory.

