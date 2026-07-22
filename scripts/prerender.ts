// scripts/prerender.ts — SSG。各ページの dist/<page>/index.html に
// クローラー向け静的フォールバックHTML・per-page meta・JSON-LD を焼き込み、sitemap.xml を生成。
// 比較表はヒーローなので、フォールバックでも HTML の <table> に変換して残す。
// 実行: npx tsx scripts/prerender.ts（npm run predeploy 内）
import * as fs from 'fs';
import * as path from 'path';
import { modules } from '../src/data/modules';
import { chapterNames } from '../src/data/chapters';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BASE = '/eng-confusables';
const BASE_URL = 'https://study-apps.com/eng-confusables';
const SITE_NAME = 'まぎらわしい英単語ノート';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// インライン（**太字** / `code`）を最小限HTML化
function inlineHtml(s: string): string {
  return esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
}

const CALL: Record<string, { label: string; color: string }> = {
  '💡': { label: 'コツ', color: '#2f6d5b' },
  '🎯': { label: '試験ポイント', color: '#8a5a12' },
  '⚠️': { label: '注意', color: '#9a3a2f' },
  '📖': { label: '発展', color: '#3a4a7a' },
};

// カスタムmd → 静的HTML（見出し/太字/リスト/比較表/コールアウト）
function mdToHtml(content: string): string {
  const lines = content.split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === '') { i++; continue; }
    if (/^---+$/.test(t)) { out.push('<hr style="border:0;border-top:1px solid #e2dfd7;margin:18px 0">'); i++; continue; }
    if (t.startsWith('### ')) { out.push(`<h3 style="font-size:1.05rem;margin:18px 0 6px">${inlineHtml(t.slice(4))}</h3>`); i++; continue; }
    if (t.startsWith('## ')) { out.push(`<h2 style="font-size:1.2rem;margin:22px 0 8px;border-left:4px solid #2f4b7c;padding-left:10px">${inlineHtml(t.slice(3))}</h2>`); i++; continue; }
    const ck = Object.keys(CALL).find((mk) => t.startsWith(mk));
    if (ck) { const c = CALL[ck]; out.push(`<div style="border-left:2px solid ${c.color};padding:1px 0 1px 14px;margin:18px 0"><span style="font-size:0.72rem;font-weight:700;letter-spacing:0.09em;color:${c.color};margin-right:8px">${c.label}</span>${inlineHtml(t.slice(ck.length).trim())}</div>`); i++; continue; }
    if (t.startsWith('|')) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i].trim()); i++; }
      const parsed = rows.map((r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()))
        .filter((cells) => !cells.every((c) => /^:?-+:?$/.test(c) || c === ''));
      if (parsed.length) {
        const [head, ...body] = parsed;
        const th = head.map((c) => `<th style="text-align:left;padding:6px 10px;background:#e8edf5;border-bottom:2px solid #cfcabd">${inlineHtml(c)}</th>`).join('');
        const trs = body.map((cells) => '<tr>' + cells.map((c) => `<td style="padding:6px 10px;border-bottom:1px solid #e2dfd7;vertical-align:top">${inlineHtml(c)}</td>`).join('') + '</tr>').join('');
        out.push(`<div style="overflow-x:auto;margin:14px 0"><table style="border-collapse:collapse;width:100%;font-size:0.92rem"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`);
      }
      continue;
    }
    if (/^\d+\.\s/.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\.\s/, '')); i++; }
      out.push('<ol style="padding-left:20px">' + items.map((it) => `<li>${inlineHtml(it)}</li>`).join('') + '</ol>');
      continue;
    }
    if (/^[-*]\s/.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^[-*]\s/, '')); i++; }
      out.push('<ul style="padding-left:20px">' + items.map((it) => `<li>${inlineHtml(it)}</li>`).join('') + '</ul>');
      continue;
    }
    out.push(`<p>${inlineHtml(t)}</p>`); i++;
  }
  return out.join('\n');
}

const banner = `<div style="background:#e8edf5;border-bottom:1px solid #cdd8ea;padding:10px 16px;font-size:0.88rem;text-align:center;margin-bottom:16px;border-radius:6px;max-width:820px;margin-left:auto;margin-right:auto"><a href="https://study-apps.com/" style="color:#243b63;text-decoration:none;font-weight:600">← study-apps.com 学習サイト集トップへ</a></div>`;
const disclaimer = `<p style="font-size:0.8rem;color:#868d99;margin-top:20px;border-top:1px solid #eee;padding-top:12px">※本サイトは個人による学習支援サイトです。最終的な確認は辞書や公式教材で行ってください。<br><a href="https://study-apps.com/editorial-policy/" style="color:#2f4b7c">編集方針</a></p>`;
const articleOpen = `<article id="static-fallback" style="font-family:sans-serif;line-height:1.8;max-width:820px;margin:0 auto;padding:24px 16px;color:#23272e">`;

console.log('--- eng-confusables SSG prerender ---');
if (!fs.existsSync(INDEX_HTML_PATH)) { console.error('dist/index.html が見つかりません。先に npm run build を。'); process.exit(1); }
const templateHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

// ── ホーム（全ペアの逆引き一覧）──
const catListHtml = (() => {
  const byCh: Record<number, typeof modules> = {};
  for (const m of modules) (byCh[m.chapter] ||= [] as unknown as typeof modules).push(m);
  return Object.keys(byCh).map(Number).sort((a, b) => a - b).map((n) => {
    const items = byCh[n].map((m) => `<li style="margin:7px 0"><a href="${BASE}/${m.id}/" style="color:#2f4b7c;font-weight:600;text-decoration:none">${esc(m.title)}</a> — <span style="color:#555b66;font-size:0.9rem">${esc(m.description)}</span></li>`).join('\n');
    return `<h2 style="font-size:1.15rem;margin:22px 0 8px;border-bottom:1px solid #e2dfd7;padding-bottom:4px">${esc(chapterNames[n])}</h2><ul style="list-style:none;padding:0;margin:0">${items}</ul>`;
  }).join('\n');
})();

const homeDesc = '似て混同しやすい英単語を、引いてすぐ違いと使い分けがわかる逆引きの比較リファレンス。';
const homeFallback = `${banner}${articleOpen}
  <h1 style="font-size:1.7rem;font-weight:700;border-bottom:2px solid #2f4b7c;padding-bottom:8px;margin-bottom:14px">${SITE_NAME}</h1>
  <p style="color:#555b66;margin-bottom:18px">${homeDesc}スペル・意味・品詞・発音が似ている${modules.length}組の混同ペアを、比較表と例文でまとめています。</p>
  ${catListHtml}
  <nav style="margin-top:28px;border-top:1px solid #e2dfd7;padding-top:16px;display:flex;gap:16px;flex-wrap:wrap">
    <a href="${BASE}/about/" style="color:#2f4b7c">このサイトについて</a>
    <a href="${BASE}/privacy/" style="color:#2f4b7c;font-size:0.85rem">プライバシーポリシー</a>
    <a href="https://study-apps.com/editorial-policy/" style="color:#2f4b7c;font-size:0.85rem">編集方針</a>
  </nav>
  ${disclaimer}
</article>`;

let rootHtml = templateHtml.replace('<div id="root"></div>', `<div id="root">${homeFallback}</div>`);
const homeJsonLd = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${BASE_URL}/`, description: homeDesc, inLanguage: 'ja' });
rootHtml = rootHtml.replace('</head>', `<script type="application/ld+json">${homeJsonLd}</script>\n  </head>`);
fs.writeFileSync(INDEX_HTML_PATH, rootHtml);

// サブディレクトリ用の相対パス変換
const subTemplate = templateHtml
  .replace(/href="\.\/assets\//g, 'href="../assets/')
  .replace(/src="\.\/assets\//g, 'src="../assets/')
  .replace(/href="\.\/favicon\.svg"/g, 'href="../favicon.svg"');

function writePage(subpath: string, fullTitle: string, description: string, bodyHtml: string, jsonLd: object) {
  const dir = path.join(DIST_DIR, subpath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const url = `${BASE_URL}/${subpath}/`;
  let html = subTemplate
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(fullTitle)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace('<meta property="og:type" content="website" />', `<meta property="og:type" content="article" />`)
    .replace('<meta property="og:url" content="https://study-apps.com/eng-confusables/" />', `<meta property="og:url" content="${url}" />`)
    .replace('<link rel="canonical" href="https://study-apps.com/eng-confusables/" />', `<link rel="canonical" href="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(fullTitle)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(description)}" />`);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

// ── 各ペアページ ──
let count = 0;
for (const mod of modules) {
  const title = `${mod.title} の違い・使い分け | ${SITE_NAME}`;
  const body = `${banner}${articleOpen}
  <nav style="margin-bottom:14px;font-size:0.85rem"><a href="${BASE}/" style="color:#2f4b7c;text-decoration:none">さがす</a> / ${esc(chapterNames[mod.chapter])}</nav>
  <h1 style="font-size:1.55rem;font-weight:700;border-bottom:2px solid #2f4b7c;padding-bottom:8px;margin-bottom:10px">${esc(mod.title)}</h1>
  <p style="color:#555b66;margin-bottom:16px;font-size:1.02rem">${esc(mod.description)}</p>
  ${mdToHtml(mod.content)}
  ${mod.keyPoints ? `<h2 style="font-size:1.05rem;margin:22px 0 8px">まとめ</h2><ul style="padding-left:20px">${mod.keyPoints.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>` : ''}
  <nav style="margin-top:26px;border-top:1px solid #e2dfd7;padding-top:14px"><a href="${BASE}/" style="color:#2f4b7c;text-decoration:none">← 一覧へ戻る</a></nav>
  ${disclaimer}
</article>`;
  writePage(mod.id, title, mod.description, body, {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: `${mod.title} の違い・使い分け`, description: mod.description, url: `${BASE_URL}/${mod.id}/`,
    inLanguage: 'ja', isAccessibleForFree: true,
    publisher: { '@type': 'Organization', name: 'study-apps.com', url: 'https://study-apps.com' },
  });
  count++;
}

// ── About / Privacy ──
writePage('about', `このサイトについて | ${SITE_NAME}`, 'まぎらわしい英単語ノートの目的・コンテンツ構成・編集制作方針・運営者・お問い合わせ・免責事項について。',
  `${banner}${articleOpen}
  <nav style="margin-bottom:14px"><a href="${BASE}/" style="color:#2f4b7c;text-decoration:none">← さがす</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2f4b7c;padding-bottom:8px;margin-bottom:18px">このサイトについて</h1>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">サイトの目的と対象</h2>
  <p style="color:#555b66">「${SITE_NAME}」は、スペル・意味・品詞・発音が似て混同しやすい英単語のペアを、引いてすぐ違いと使い分けが分かるようにまとめた逆引きの比較リファレンスです。大学受験・TOEIC・英検の学習者や、英語を学び直す社会人を主な対象としています。</p>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">コンテンツ構成</h2>
  <p style="color:#555b66">混同しやすい語を「スペルが似ている語」「意味が近い語」「品詞・派生でまぎらわしい語」「発音が似ている語」の4カテゴリに分け、1ペア（または自然な語群）を1ページにまとめています。各ページに比較表・例文・覚え方・任意の確認問題を用意しています。</p>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">編集・制作方針</h2>
  <p style="color:#555b66">各語の意味・品詞・自他・発音は辞書（Cambridge・Merriam-Webster・Wiktionary など）で事実を確認したうえで、解説はすべて運営者が自分のことばで書き起こし、例文も自作しています。辞書の定義文や例文をそのまま転載することはしていません。確認できない語法は載せていません。誤りに気づいた場合は随時修正します。</p>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">運営者について</h2>
  <p style="color:#555b66">個人が運営しています。広告収入はサーバー・ドメインなどの維持費に充てています。</p>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">お問い合わせ</h2>
  <p style="color:#555b66">内容の誤りのご指摘やご意見は、<a href="https://forms.gle/ccMv7oKwz6ysDHBe6" target="_blank" rel="noopener noreferrer" style="color:#2f4b7c">お問い合わせフォーム</a>よりお寄せください。</p>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">免責事項</h2>
  <p style="color:#555b66">本サイトは内容の正確性に努めていますが、その完全性・正確性・有用性を保証するものではありません。学習の最終的な確認は辞書や公式教材で行ってください。本サイトの利用によって生じたいかなる損害についても責任を負いかねます。</p>
</article>`,
  { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'このサイトについて', url: `${BASE_URL}/about/`, inLanguage: 'ja' });

writePage('privacy', `プライバシーポリシー | ${SITE_NAME}`, 'まぎらわしい英単語ノートのプライバシーポリシー。Google Analytics・AdSense・Cookie の利用と無効化方法、免責、お問い合わせについて。',
  `${banner}${articleOpen}
  <nav style="margin-bottom:14px"><a href="${BASE}/" style="color:#2f4b7c;text-decoration:none">← さがす</a></nav>
  <h1 style="font-size:1.6rem;font-weight:700;border-bottom:2px solid #2f4b7c;padding-bottom:8px;margin-bottom:18px">プライバシーポリシー</h1>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">アクセス解析（Google Analytics）</h2>
  <p style="color:#555b66">本サイトは利用状況の把握のためGoogle Analytics（GA4）を利用しています。Cookieを用いて匿名のトラフィックデータを収集するもので、個人を特定する情報は含みません。</p>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">広告配信（Google AdSense）</h2>
  <p style="color:#555b66">本サイトは第三者配信の広告サービスGoogle AdSenseを利用しています。第三者配信事業者はCookieを使用して、ユーザーの興味に応じた広告を表示することがあります。</p>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">Cookieの送信と無効化</h2>
  <p style="color:#555b66">これらのCookieによりGoogleや広告事業者にデータが送信されます。ユーザーは<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" style="color:#2f4b7c">Googleの広告設定</a>でパーソナライズ広告を無効にでき、ブラウザの設定でCookieを無効にすることもできます。</p>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">免責事項</h2>
  <p style="color:#555b66">本サイトの情報の利用により生じた損害について、運営者は責任を負いません。</p>
  <h2 style="font-size:1.12rem;margin:18px 0 6px">お問い合わせ</h2>
  <p style="color:#555b66">本ポリシーに関するお問い合わせは<a href="https://forms.gle/ccMv7oKwz6ysDHBe6" target="_blank" rel="noopener noreferrer" style="color:#2f4b7c">お問い合わせフォーム</a>よりお願いします。</p>
  <p style="font-size:0.84rem;color:#868d99;margin-top:20px;border-top:1px solid #eee;padding-top:12px">最終更新日：2026年6月15日</p>
</article>`,
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'プライバシーポリシー', url: `${BASE_URL}/privacy/`, inLanguage: 'ja' });

// ── sitemap.xml ──
const today = '2026-06-15';
const urls = [
  { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly' },
  ...modules.map((m) => ({ loc: `${BASE_URL}/${m.id}/`, priority: '0.8', changefreq: 'monthly' })),
  { loc: `${BASE_URL}/about/`, priority: '0.4', changefreq: 'yearly' },
  { loc: `${BASE_URL}/privacy/`, priority: '0.3', changefreq: 'yearly' },
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);

console.log(`✓ ペア ${count} ページ + 静的2ページ + sitemap.xml（全${urls.length}URL）を生成`);
