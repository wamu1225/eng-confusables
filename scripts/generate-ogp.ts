// scripts/generate-ogp.ts — OGP画像（1200×630）を public/ogp.png に生成する。
// 実行: npx tsx scripts/generate-ogp.ts
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const FONT = "'Yu Gothic','Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo,'Noto Sans JP',sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f6f3"/>
  <rect x="0" y="0" width="14" height="630" fill="#2f4b7c"/>
  <text x="90" y="160" font-family="${FONT}" font-size="60" font-weight="700" fill="#23272e">まぎらわしい英単語ノート</text>
  <text x="90" y="222" font-family="${FONT}" font-size="30" fill="#555b66">似た英単語を、引いて見分ける逆引きリファレンス</text>

  <g font-family="${SERIF}" font-size="40" font-weight="700">
    <text x="92" y="330" fill="#2f4b7c">affect</text>
    <text x="252" y="330" fill="#868d99">／</text>
    <text x="290" y="330" fill="#2f4b7c">effect</text>
    <text x="520" y="330" fill="#2f4b7c">lie</text>
    <text x="600" y="330" fill="#868d99">／</text>
    <text x="640" y="330" fill="#2f4b7c">lay</text>
    <text x="800" y="330" fill="#2f4b7c">breed</text>
    <text x="940" y="330" fill="#868d99">／</text>
    <text x="978" y="330" fill="#2f4b7c">bleed</text>

    <text x="92" y="400" fill="#2f4b7c">economic</text>
    <text x="312" y="400" fill="#868d99">／</text>
    <text x="350" y="400" fill="#2f4b7c">economical</text>
    <text x="690" y="400" fill="#2f4b7c">advice</text>
    <text x="838" y="400" fill="#868d99">／</text>
    <text x="876" y="400" fill="#2f4b7c">advise</text>
  </g>

  <line x1="92" y1="470" x2="700" y2="470" stroke="#cfcabd" stroke-width="2"/>
  <text x="92" y="520" font-family="${FONT}" font-size="24" fill="#2f4b7c" font-weight="600">study-apps.com/eng-confusables/</text>

  <!-- 虫眼鏡（さがす） -->
  <g transform="translate(1010 360)">
    <circle cx="0" cy="0" r="78" fill="none" stroke="#2f4b7c" stroke-width="14"/>
    <line x1="56" y1="56" x2="120" y2="120" stroke="#2f4b7c" stroke-width="20" stroke-linecap="round"/>
  </g>
</svg>`;

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const outPath = path.join(PUBLIC_DIR, 'ogp.png');
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`✓ ogp.png (1200x630) を生成: ${outPath}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
