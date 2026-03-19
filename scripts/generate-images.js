import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read API key from .env.local
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const API_KEY = envContent.match(/GOOGLE_AI_API_KEY=(.+)/)?.[1]?.trim();

if (!API_KEY) {
  console.error('❌ GOOGLE_AI_API_KEY not found in .env.local');
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, '../public/ai-images');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const MODEL = 'gemini-3.1-flash-image-preview';

const images = [
  {
    name: 'hero',
    prompt: `Premium technology marketing image for a high-end digital systems studio brand. Extremely dark background #070809, elegant abstract composition, subtle blue-violet gradient light emanating from center, refined floating interface fragments with depth, soft premium glow, glass surface reflections, sophisticated AI infrastructure feel, Apple-style extreme restraint and minimalism, Linear/Stripe/Vercel visual quality, extremely clean composition, strong single focal point, cinematic editorial lighting, no clutter, no cyberpunk chaos, no stock photo feel, no random icons, 16:9 widescreen format, photorealistic quality.`,
  },
  {
    name: 'system',
    prompt: `Premium abstract visualization of a connected digital growth system for a technology studio. Dark premium background #0D1117, elegant minimal floating nodes connected by very subtle glowing lines, representing website, lead capture, automation, CRM, reviews as a unified ecosystem, high-end product-marketing style, Apple keynote visual quality, sophisticated and extremely clean, feels like a $20k agency website visual, no messy diagrams, no cheap infographics, no bright neon overload, dark luxury SaaS aesthetic, 16:9 widescreen format.`,
  },
  {
    name: 'automation',
    prompt: `Luxury minimal technology image representing AI automation and intelligent business workflow. Dark space #070809, elegant abstract data flow lines moving through depth, very subtle blue-violet light accents, refined interface layer fragments barely visible, calm high-tech premium feel, sophisticated restraint, suitable for a $15k technology landing page, no robots, no cheesy futuristic clichés, no visual noise, editorial photography quality, 16:9 widescreen format.`,
  },
  {
    name: 'dashboard',
    prompt: `Premium dark CRM and business analytics dashboard marketing visual. Very dark refined interface #0D1117, minimal elegant cards with subtle depth, sparse clean graphs, excellent spacing and air, sophisticated high-end SaaS UI design aesthetic, polished product design, feels like Notion or Linear internal tool, no generic admin template look, no clutter, no bright rainbow colors, no excessive charts, dark luxury software product visual quality, 16:9 widescreen format.`,
  },
  {
    name: 'mobile',
    prompt: `Premium dark smartphone marketing image for mobile lead capture and digital contact technology. Very dark elegant scene #070809, minimal high-end smartphone mockup floating in space, refined subtle UI visible on screen showing a clean contact or form interface, cinematic restrained studio lighting, subtle blue-violet gradient glow, product-photography composition quality, luxurious and extremely minimal, no clutter, no cheap app-advertisement style, dark premium editorial feel, 16:9 widescreen format.`,
  },
];

async function generateImage(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API ${response.status}: ${err.slice(0, 200)}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData?.mimeType?.startsWith('image/'));

  if (!imagePart) {
    const textPart = parts.find((p) => p.text);
    throw new Error(`No image returned. Text: ${textPart?.text?.slice(0, 100) || 'none'}`);
  }

  return {
    data: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType,
  };
}

async function main() {
  console.log(`\n🎨 ViralDental.marketing — Premium Image Generation`);
  console.log(`   Model: ${MODEL}`);
  console.log(`   Output: public/ai-images/\n`);

  for (const img of images) {
    process.stdout.write(`  → Generating ${img.name}... `);
    try {
      const { data, mimeType } = await generateImage(img.prompt);
      const ext = mimeType.includes('png') ? 'png' : 'jpg';
      const filePath = path.join(OUTPUT_DIR, `${img.name}.${ext}`);
      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
      const size = (fs.statSync(filePath).size / 1024).toFixed(0);
      console.log(`✅  ${img.name}.${ext} (${size} KB)`);
    } catch (err) {
      console.log(`❌  ${err.message}`);
    }
    // Respect rate limits
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log('\n✨ Done. Images saved to public/ai-images/\n');
}

main();
