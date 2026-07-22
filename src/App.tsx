import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import './App.css';
import { modules } from './data/modules';
import type { Module } from './data/modules';
import { chapterNames, SITE_META } from './data/chapters';
import { tokenizeInline } from './lib/inline';
import type { InlineToken } from './lib/inline';
import Quiz from './components/Quiz';
import { Search, X } from 'lucide-react';

const BASE = '/eng-confusables';

type Route =
  | { view: 'home' }
  | { view: 'pair'; id: string }
  | { view: 'about' }
  | { view: 'privacy' };

function parseRoute(pathname: string): Route {
  let p = pathname;
  if (p.startsWith(BASE)) p = p.slice(BASE.length);
  p = p.replace(/^\/+|\/+$/g, '');
  if (p === '') return { view: 'home' };
  if (p === 'about') return { view: 'about' };
  if (p === 'privacy') return { view: 'privacy' };
  const mod = modules.find((m) => m.id === p);
  if (mod) return { view: 'pair', id: mod.id };
  return { view: 'home' };
}

function hrefFor(route: Route): string {
  switch (route.view) {
    case 'home': return `${BASE}/`;
    case 'pair': return `${BASE}/${route.id}/`;
    default: return `${BASE}/${route.view}/`;
  }
}

// ── インライントークン → React ──────────────────
function renderTokens(tokens: InlineToken[], keyBase: string): ReactNode[] {
  return tokens.map((tk, i) => {
    const key = `${keyBase}-${i}`;
    switch (tk.t) {
      case 'text': return <span key={key}>{tk.v}</span>;
      case 'bold': return <strong key={key}>{renderTokens(tk.children, key)}</strong>;
      case 'code': return <code key={key}>{tk.v}</code>;
      case 'link':
        if (/^https?:\/\//.test(tk.url)) return <a key={key} href={tk.url} target="_blank" rel="noopener noreferrer">{tk.label}</a>;
        return <a key={key} href={tk.url}>{tk.label}</a>;
    }
  });
}
const inline = (text: string, k: string) => renderTokens(tokenizeInline(text), k);

// ── 本文（カスタムmd）→ React ───────────────────
const CALLOUTS: Record<string, { label: string; cls: string }> = {
  '💡': { label: 'コツ', cls: 'callout-tip' },
  '🎯': { label: '試験ポイント', cls: 'callout-exam' },
  '⚠️': { label: '注意', cls: 'callout-warn' },
  '📖': { label: '発展', cls: 'callout-read' },
};

function renderContent(content: string): ReactNode[] {
  const lines = content.split('\n');
  const out: ReactNode[] = [];
  let i = 0, key = 0;
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (t === '') { i++; continue; }
    if (/^---+$/.test(t)) { out.push(<hr key={key++} />); i++; continue; }
    if (t.startsWith('### ')) { out.push(<h3 key={key++}>{inline(t.slice(4), `h${key}`)}</h3>); i++; continue; }
    if (t.startsWith('## ')) { out.push(<h2 key={key++}>{inline(t.slice(3), `h${key}`)}</h2>); i++; continue; }
    const ck = Object.keys(CALLOUTS).find((mk) => t.startsWith(mk));
    if (ck) {
      const { label, cls } = CALLOUTS[ck];
      out.push(
        <div key={key++} className={`callout ${cls}`}>
          <span className="callout-label">{label}</span>
          <p>{inline(t.slice(ck.length).trim(), `c${key}`)}</p>
        </div>
      );
      i++; continue;
    }
    if (t.startsWith('|')) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i].trim()); i++; }
      const parsed = rows
        .map((r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()))
        .filter((cells) => !cells.every((c) => /^:?-+:?$/.test(c) || c === ''));
      if (parsed.length) {
        const [head, ...body] = parsed;
        out.push(
          <div key={key++} className="table-wrap">
            <table>
              <thead><tr>{head.map((c, ci) => <th key={ci}>{inline(c, `th${key}-${ci}`)}</th>)}</tr></thead>
              <tbody>{body.map((cells, ri) => <tr key={ri}>{cells.map((c, ci) => <td key={ci}>{inline(c, `td${key}-${ri}-${ci}`)}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      }
      continue;
    }
    if (/^\d+\.\s/.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\.\s/, '')); i++; }
      out.push(<ol key={key++}>{items.map((it, ii) => <li key={ii}>{inline(it, `ol${key}-${ii}`)}</li>)}</ol>);
      continue;
    }
    if (/^[-*]\s/.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^[-*]\s/, '')); i++; }
      out.push(<ul key={key++}>{items.map((it, ii) => <li key={ii}>{inline(it, `ul${key}-${ii}`)}</li>)}</ul>);
      continue;
    }
    out.push(<p key={key++}>{inline(t, `p${key}`)}</p>);
    i++;
  }
  return out;
}

// 検索用の正規化文字列
const searchText = (m: Module) => `${m.id} ${m.title} ${m.description}`.toLowerCase();

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname));
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useCallback((r: Route) => {
    window.history.pushState({}, '', hrefFor(r));
    setRoute(r);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onPop = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <div className="app">
      <Header route={route} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="main">
        {route.view === 'home' && <Home navigate={navigate} />}
        {route.view === 'pair' && <PairPage id={route.id} navigate={navigate} />}
        {route.view === 'about' && <AboutPage />}
        {route.view === 'privacy' && <PrivacyPage />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

// ── Header ─────────────────────────────────────
function Header({ route, navigate, menuOpen, setMenuOpen }: {
  route: Route; navigate: (r: Route) => void; menuOpen: boolean; setMenuOpen: (b: boolean) => void;
}) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href={`${BASE}/`} onClick={(e) => { e.preventDefault(); navigate({ view: 'home' }); }}>
          まぎらわしい英単語ノート
        </a>
        <button className="menu-toggle" aria-label="メニュー" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <nav className={`site-nav ${menuOpen ? 'open' : ''}`}>
          <a href={`${BASE}/`} onClick={(e) => { e.preventDefault(); navigate({ view: 'home' }); }} className={route.view === 'home' ? 'active' : ''}>さがす</a>
          <a href={`${BASE}/about/`} onClick={(e) => { e.preventDefault(); navigate({ view: 'about' }); }} className={route.view === 'about' ? 'active' : ''}>このサイトについて</a>
        </nav>
      </div>
    </header>
  );
}

// ── Home（検索できる逆引きインデックス）──────────
function Home({ navigate }: { navigate: (r: Route) => void }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<number | 0>(0); // 0=すべて

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return modules.filter((m) => {
      if (cat !== 0 && m.chapter !== cat) return false;
      if (q && !searchText(m).includes(q)) return false;
      return true;
    });
  }, [query, cat]);

  const cats = [1, 2, 3, 4];

  return (
    <div className="home">
      <section className="hero">
        <h1>まぎらわしい英単語を、引いて見分ける</h1>
        <p className="hero-lead">{SITE_META.approach}。{modules.length}組の混同ペアを、比較表とミニ問題でまとめました。</p>
        <div className="search-box">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="単語で検索（例：affect, lie, breed）"
            aria-label="単語を検索"
            autoComplete="off"
          />
          {query && <button className="search-clear" aria-label="クリア" onClick={() => setQuery('')}><X size={16} /></button>}
        </div>
        <div className="cat-chips" role="tablist" aria-label="カテゴリで絞り込み">
          <button className={`chip ${cat === 0 ? 'active' : ''}`} onClick={() => setCat(0)}>すべて</button>
          {cats.map((c) => (
            <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{chapterNames[c]}</button>
          ))}
        </div>
      </section>

      <section className="results">
        <p className="results-count">{results.length} 組{query ? `（「${query}」で検索）` : ''}</p>
        {results.length === 0 ? (
          <p className="no-results">該当する単語が見つかりませんでした。スペルを変えて試してください。</p>
        ) : (
          <ol className="pair-list">
            {results.map((m) => (
              <li key={m.id}>
                <a href={`${BASE}/${m.id}/`} onClick={(e) => { e.preventDefault(); navigate({ view: 'pair', id: m.id }); }}>
                  <span className="pair-title">{m.title}</span>
                  <span className="pair-cat">{chapterNames[m.chapter]}</span>
                  <span className="pair-desc">{m.description}</span>
                </a>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

// ── Pair page（比較表ヒーロー＋任意クイズ）────────
function PairPage({ id, navigate }: { id: string; navigate: (r: Route) => void }) {
  const idx = modules.findIndex((m) => m.id === id);
  const mod = modules[idx];
  if (!mod) return <p>ページが見つかりませんでした。</p>;
  // 同じカテゴリ内の前後
  const sameCat = modules.filter((m) => m.chapter === mod.chapter);
  const pos = sameCat.findIndex((m) => m.id === id);
  const prev = pos > 0 ? sameCat[pos - 1] : null;
  const next = pos < sameCat.length - 1 ? sameCat[pos + 1] : null;

  return (
    <article className="pair">
      <nav className="breadcrumb">
        <a href={`${BASE}/`} onClick={(e) => { e.preventDefault(); navigate({ view: 'home' }); }}>さがす</a>
        <span aria-hidden="true">/</span>
        <span>{chapterNames[mod.chapter]}</span>
      </nav>
      <header className="pair-header">
        <p className="pair-cat-label">{chapterNames[mod.chapter]}</p>
        <h1>{mod.title}</h1>
        <p className="pair-lead">{mod.description}</p>
      </header>

      <div className="pair-body">{renderContent(mod.content)}</div>

      {mod.keyPoints && mod.keyPoints.length > 0 && (
        <section className="keypoints">
          <h2>まとめ</h2>
          <ul>{mod.keyPoints.map((k, i) => <li key={i}>{k}</li>)}</ul>
        </section>
      )}

      <section className="quiz-section">
        <h2>理解度チェック（任意）</h2>
        <Quiz questions={mod.quiz} />
      </section>

      <nav className="pair-nav">
        {prev ? <button className="btn" onClick={() => navigate({ view: 'pair', id: prev.id })}>← {prev.title}</button> : <span />}
        {next ? <button className="btn btn-primary" onClick={() => navigate({ view: 'pair', id: next.id })}>{next.title} →</button> : <button className="btn" onClick={() => navigate({ view: 'home' })}>一覧へ戻る</button>}
      </nav>
    </article>
  );
}

// ── About ──────────────────────────────────────
function AboutPage() {
  return (
    <div className="about">
      <h1>このサイトについて</h1>

      <h2>サイトの目的と対象</h2>
      <p>「まぎらわしい英単語ノート」は、スペル・意味・品詞・発音が似ていて混同しやすい英単語のペアを、引いてすぐに違いと使い分けが分かるようにまとめた逆引きの比較リファレンスです。{SITE_META.audience}を主な対象としています。</p>

      <h2>コンテンツ構成</h2>
      <p>混同しやすい語を「スペルが似ている語」「意味が近い語」「品詞・派生でまぎらわしい語」「発音が似ている語」の4カテゴリに分け、1ペア（または自然な語群）を1ページにまとめています。各ページに比較表・例文・覚え方・任意の確認問題を用意しています。</p>

      <h2>編集・制作方針</h2>
      <p>各語の意味・品詞・自他・発音は辞書（Cambridge・Merriam-Webster・Wiktionary など）で事実を確認したうえで、解説は<strong>すべて運営者が自分のことばで書き起こし</strong>、例文も自作しています。辞書の定義文や例文をそのまま転載することはしていません。確認できない語法は載せていません。誤りに気づいた場合は随時修正します。</p>

      <h2>運営者について</h2>
      <p>個人が運営しています。広告収入はサーバー・ドメインなどの維持費に充てています。</p>

      <h2>お問い合わせ</h2>
      <p>内容の誤りのご指摘やご意見は、<a href="https://forms.gle/ccMv7oKwz6ysDHBe6" target="_blank" rel="noopener noreferrer">お問い合わせフォーム</a>よりお寄せください。</p>

      <h2>免責事項</h2>
      <p>本サイトは内容の正確性に努めていますが、その完全性・正確性・有用性を保証するものではありません。学習の最終的な確認は辞書や公式教材で行ってください。本サイトの利用によって生じたいかなる損害についても責任を負いかねます。</p>
    </div>
  );
}

// ── Privacy ────────────────────────────────────
function PrivacyPage() {
  return (
    <div className="privacy">
      <h1>プライバシーポリシー</h1>
      <h2>アクセス解析（Google Analytics）</h2>
      <p>本サイトは利用状況の把握のためGoogle Analytics（GA4）を利用しています。Cookieを用いて匿名のトラフィックデータを収集するもので、個人を特定する情報は含みません。</p>
      <h2>広告配信（Google AdSense）</h2>
      <p>本サイトは第三者配信の広告サービスGoogle AdSenseを利用しています。第三者配信事業者はCookieを使用して、ユーザーの興味に応じた広告を表示することがあります。</p>
      <h2>Cookieの送信と無効化</h2>
      <p>これらのCookieによりGoogleや広告事業者にデータが送信されます。ユーザーは<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Googleの広告設定</a>でパーソナライズ広告を無効にでき、ブラウザの設定でCookieを無効にすることもできます。</p>
      <h2>免責事項</h2>
      <p>本サイトの情報の利用により生じた損害について、運営者は責任を負いません。</p>
      <h2>お問い合わせ</h2>
      <p>本ポリシーに関するお問い合わせは<a href="https://forms.gle/ccMv7oKwz6ysDHBe6" target="_blank" rel="noopener noreferrer">お問い合わせフォーム</a>よりお願いします。</p>
      <p className="notice">最終更新日：2026年6月15日</p>
    </div>
  );
}

// ── Footer ─────────────────────────────────────
function Footer({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <nav className="footer-nav">
          <a href={`${BASE}/`} onClick={(e) => { e.preventDefault(); navigate({ view: 'home' }); }}>さがす</a>
          <a href={`${BASE}/about/`} onClick={(e) => { e.preventDefault(); navigate({ view: 'about' }); }}>このサイトについて</a>
          <a href={`${BASE}/privacy/`} onClick={(e) => { e.preventDefault(); navigate({ view: 'privacy' }); }}>プライバシーポリシー</a>
          <a href="https://study-apps.com/editorial-policy/" target="_blank" rel="noopener noreferrer">編集方針</a>
          <a href="https://study-apps.com/" target="_blank" rel="noopener noreferrer">study-apps.com</a>
        </nav>
        <p className="footer-note">個人運営の学習支援サイトです。最終的な確認は辞書や公式教材で行ってください。</p>
      </div>
    </footer>
  );
}
