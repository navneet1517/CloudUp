const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

// Ensure the public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate favicon
async function generateFavicon() {
  try {
    // Generate favicon.ico
    await sharp('public/icon.svg')
      .resize(32, 32)
      .toFormat('ico')
      .toFile(path.join(publicDir, 'favicon.ico'));

    // Generate Apple touch icon
    await sharp('public/icon.svg')
      .resize(180, 180)
      .toFormat('png')
      .toFile(path.join(publicDir, 'apple-icon.png'));

    console.log('Favicon generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon(); 