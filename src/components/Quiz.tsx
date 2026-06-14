// Quiz — ペアページ末尾の任意の定着クイズ（5問前後）
import { useState } from 'react';
import type { QuizQuestion } from '../data/modules';

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const isLast = idx === questions.length - 1;

  const select = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.correctAnswer) setScore((s) => s + 1);
  };
  const next = () => {
    if (isLast) { setDone(true); return; }
    setIdx((n) => n + 1); setSelected(null); setAnswered(false);
  };
  const restart = () => { setIdx(0); setSelected(null); setAnswered(false); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 80 ? 'よくできました。この区別はばっちりです。' : pct >= 50 ? 'あと少し。間違えた問題の解説を読み返しましょう。' : 'もう一度、上の比較表と例文を見てから挑戦しましょう。';
    return (
      <div className="quiz quiz-result">
        <p className="quiz-score">{questions.length}問中 <strong>{score}</strong>問正解（{pct}%）</p>
        <p className="quiz-msg">{msg}</p>
        <button className="btn" onClick={restart}>もう一度</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-head"><span className="quiz-count">第 {idx + 1} / {questions.length} 問</span></div>
      <p className="quiz-q">{q.question}</p>
      <ul className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = 'quiz-option';
          if (answered) {
            if (i === q.correctAnswer) cls += ' is-correct';
            else if (i === selected) cls += ' is-wrong';
          }
          return (
            <li key={i}>
              <button className={cls} onClick={() => select(i)} disabled={answered}>
                <span className="quiz-mark" aria-hidden="true">
                  {answered && i === q.correctAnswer ? '○' : answered && i === selected ? '×' : ''}
                </span>
                <span>{opt}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {answered && (
        <div className="quiz-explain">
          <p className={selected === q.correctAnswer ? 'quiz-verdict ok' : 'quiz-verdict ng'}>
            {selected === q.correctAnswer ? '正解' : '不正解'}
          </p>
          <p>{q.explanation}</p>
          <button className="btn" onClick={next}>{isLast ? '結果を見る' : '次の問題へ'}</button>
        </div>
      )}
    </div>
  );
}
