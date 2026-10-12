const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const publicDir = path.join(__dirname, '..', 'public');

  // 1. Convert existing pseudo-webp (which were actually PNGs) to real WebP
  const galleryImages = [
    'cxh01-cleaning-compartment.webp',
    'cxh01-real-life-store.webp',
    'cxh01-touchscreen-closeup.webp'
  ];

  for (const imgName of galleryImages) {
    const fullPath = path.join(publicDir, imgName);
    const buf = fs.readFileSync(fullPath);
    const initialSize = buf.length;
    
    const optimized = await sharp(buf)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();

    fs.writeFileSync(fullPath, optimized);
    console.log(`Converted ${imgName}: ${(initialSize / 1024).toFixed(1)} KB -> ${(optimized.length / 1024).toFixed(1)} KB (-${(((initialSize - optimized.length) / initialSize) * 100).toFixed(1)}%)`);
  }

  // 2. Fetch and convert machine hero image
  console.log('Downloading and converting machine hero image...');
  const machineUrl = 'https://res.cloudinary.com/aznvimm5/image/upload/v1787903453/ChatGPT_Image_Aug_28_2026_11_46_40_AM_oskcpw.png';
  const machineResp = await fetch(machineUrl);
  const machineArrBuf = await machineResp.arrayBuffer();
  const machineBuf = Buffer.from(machineArrBuf);

  const machineWebp = await sharp(machineBuf)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'cxh01-machine.webp'), machineWebp);
  console.log(`Saved cxh01-machine.webp: ${(machineBuf.length / 1024).toFixed(1)} KB -> ${(machineWebp.length / 1024).toFixed(1)} KB`);

  // 3. Fetch and convert logo
  console.log('Downloading and converting logo...');
  const logoUrl = 'https://res.cloudinary.com/aznvimm5/image/upload/v1787903414/Logo_3_p9dird.png';
  const logoResp = await fetch(logoUrl);
  const logoArrBuf = await logoResp.arrayBuffer();
  const logoBuf = Buffer.from(logoArrBuf);

  const logoWebp = await sharp(logoBuf)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 90, effort: 6 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo.webp'), logoWebp);
  fs.writeFileSync(path.join(publicDir, 'logo.png'), logoBuf);
  console.log(`Saved logo.webp: ${(logoBuf.length / 1024).toFixed(1)} KB -> ${(logoWebp.length / 1024).toFixed(1)} KB`);
}

run().catch(console.error);
