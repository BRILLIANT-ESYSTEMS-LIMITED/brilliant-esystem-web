const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateIcons() {
  const svgBuffer = await fs.readFile(path.join(__dirname, '../public/icon.svg'));

  // Generate PNG icons
  const sizes = [16, 32, 192, 512];
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/icon-${size}.png`));
  }

  // For favicon.ico, we'll just use the 32x32 PNG
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../public/favicon.ico'));

  // Generate apple-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-icon.png'));

  // Copy icon.png (192x192) to root
  await fs.copyFile(
    path.join(__dirname, '../public/icon-192.png'),
    path.join(__dirname, '../public/icon.png')
  );

  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error); 