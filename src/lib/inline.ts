// src/lib/inline.ts — インライン記法の純粋トークナイザ（JSX非依存）
// App.tsx の描画と scripts/validate-data.ts の検証が同じロジックを共有することで、
// 「タグや強調が生のまま画面に出る」類のバグを再発させない（color-g3 で確立した方式）。

export type InlineToken =
  | { t: 'text'; v: string }
  | { t: 'link'; label: string; url: string }
  | { t: 'bold'; children: InlineToken[] }
  | { t: 'code'; v: string };

// 単独行で処理するブロックタグ（現状なし。将来 [[...]] を足すならここに登録）。
export const BLOCK_TAGS: string[] = [];

export function tokenizeInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  // 正規表現は呼び出しごとに新規生成する。グローバル(g)の lastIndex を再帰で共有すると壊れるため。
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) tokens.push({ t: 'text', v: text.slice(last, m.index) });
    if (m[1] !== undefined && m[2] !== undefined) {
      tokens.push({ t: 'link', label: m[1], url: m[2] });
    } else if (m[3] !== undefined) {
      // 太字の中身も再帰的にトークン化（入れ子に対応）
      tokens.push({ t: 'bold', children: tokenizeInline(m[3]) });
    } else if (m[4] !== undefined) {
      tokens.push({ t: 'code', v: m[4] });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) tokens.push({ t: 'text', v: text.slice(last) });
  return tokens;
}

// 検証用：トークン列の text ノードに、未処理の生タグ([[ ]])や未対応の太字記号(**)が残っていないか。
export function findRawArtifacts(tokens: InlineToken[]): string[] {
  const found: string[] = [];
  const walk = (ts: InlineToken[]) => {
    for (const tk of ts) {
      if (tk.t === 'text') {
        if (tk.v.includes('[[') || tk.v.includes(']]')) found.push(`未処理タグ: "${tk.v.trim().slice(0, 40)}"`);
        if (tk.v.includes('**')) found.push(`未対応の太字記号: "${tk.v.trim().slice(0, 40)}"`);
      } else if (tk.t === 'bold') {
        walk(tk.children);
      }
    }
  };
  walk(tokens);
  return found;
}

// 検証用：本文全体から生タグ残りを検出する。ブロックタグを除去してからトークン化する。
export function scanContentForRawTags(content: string): string[] {
  let s = content;
  for (const tag of BLOCK_TAGS) s = s.split(`[[${tag}]]`).join('');
  return findRawArtifacts(tokenizeInline(s));
}
