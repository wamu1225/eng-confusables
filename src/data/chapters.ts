// src/data/chapters.ts — チャプター名の唯一のソース（SSOT）
// 混同しやすい英単語を「なぜ混同するか」の原因別に4カテゴリに分ける。
// modules.ts の各モジュールの chapter フィールドはこの番号を参照する。
export const chapterNames: Record<number, string> = {
  1: 'スペルが似ている語',
  2: '意味が近く使い分けが難しい語',
  3: '品詞・派生でまぎらわしい語',
  4: '発音が似ている語',
};

// サイト全体の位置づけ（試験要件のような固定値ではなく、対象と方針）
export const SITE_META = {
  audience: '大学受験・TOEIC・英検の学習者、英語を学び直す社会人',
  approach: '一対一の和訳暗記ではなく、意味の核と使い分けを比較表とミニ問題で身につける',
} as const;
