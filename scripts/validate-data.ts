// scripts/validate-data.ts — データ整合性チェック（tsx で実データを import）
// 実行: tsx scripts/validate-data.ts（npm run validate）
import { modules } from '../src/data/modules';
import { chapterNames } from '../src/data/chapters';
import { scanContentForRawTags } from '../src/lib/inline';

const errors: string[] = [];
const warnings: string[] = [];

const moduleIds = new Set<string>();
const quizIds = new Set<string>();

for (const m of modules) {
  // 1. エントリID・クイズIDの一意性
  if (moduleIds.has(m.id)) errors.push(`重複エントリID: ${m.id}`);
  moduleIds.add(m.id);

  // 2. URLに使うため、IDは英小文字・数字・ハイフンのみ
  if (!/^[a-z0-9-]+$/.test(m.id)) errors.push(`[${m.id}] IDに使えない文字（URL用に a-z0-9- のみ）`);

  // 3. カテゴリ（chapter）が chapters.ts に存在するか
  if (!chapterNames[m.chapter]) errors.push(`[${m.id}] 未定義のカテゴリ: ${m.chapter}`);

  // 4. クイズは「ページの範囲に見合う数」。固定10問は強制せず、最低4問＋空でないこと。
  if (m.quiz.length < 4) errors.push(`[${m.id}] クイズが${m.quiz.length}問（1ページ最低4問。§ページ粒度）`);

  // 5. 比較表（視覚優先）が本文にあるか＝表の区切り行 | --- | を持つこと
  if (!/\n\|[\s-|:]+\|\n/.test(m.content) && !/\| --- \|/.test(m.content)) {
    warnings.push(`[${m.id}] 比較表が見当たらない（各ページに比較表を1つ）`);
  }

  // 6. 各設問の整合性
  for (const q of m.quiz) {
    if (quizIds.has(q.id)) errors.push(`重複クイズID: ${q.id}`);
    quizIds.add(q.id);
    if (q.options.length !== 4) warnings.push(`[${q.id}] 選択肢が${q.options.length}個（標準は4択）`);
    if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
      errors.push(`[${q.id}] correctAnswer(${q.correctAnswer})が選択肢範囲外`);
    }
    if (!q.explanation || q.explanation.trim() === '') errors.push(`[${q.id}] 解説が空`);
  }

  // 7. 生タグ露出スモーク（App.tsx と同じトークナイザで [[..]] や ** が画面に出ないか）
  for (const a of scanContentForRawTags(m.content)) errors.push(`[${m.id}] 描画で露出する恐れ: ${a}`);
  if (m.keyPoints) for (const kp of m.keyPoints) for (const a of scanContentForRawTags(kp)) errors.push(`[${m.id}] keyPoints露出: ${a}`);
}

console.log(`エントリ数: ${modules.length} / クイズ総数: ${quizIds.size}`);
if (warnings.length) {
  console.log(`\n警告 (${warnings.length}):`);
  warnings.forEach((w) => console.log('  - ' + w));
}
if (errors.length) {
  console.error(`\nエラー (${errors.length}):`);
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
console.log('\n✓ データ検証OK');
