const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 64, 192, 512];
const publicDir = path.join(__dirname, '../public');

// Ensure the public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate icons for different sizes
async function generateIcons() {
  try {
    // Generate favicon.ico (16x16, 32x32)
    await sharp('public/icon.svg')
      .resize(32, 32)
      .toFormat('ico')
      .toFile(path.join(publicDir, 'favicon.ico'));

    // Generate PNG icons
    for (const size of sizes) {
      await sharp('public/icon.svg')
        .resize(size, size)
        .toFormat('png')
        .toFile(path.join(publicDir, `icon-${size}.png`));
    }

    // Generate Apple touch icon
    await sharp('public/icon.svg')
      .resize(180, 180)
      .toFormat('png')
      .toFile(path.join(publicDir, 'apple-icon.png'));

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 