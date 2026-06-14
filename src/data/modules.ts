// src/data/modules.ts — 混同しやすい英単語 学習エントリ（本文＋理解度チェック）
//
// 【ページ設計】1ペア（または ensure/assure/insure のような自然な語群）＝1エントリ。
//   URL はペア名（例 /affect-effect/）にして「逆引き比較データベース」として使えるようにする。
//
// 【執筆方針】
// - 語義・品詞・自他は辞書（Cambridge / Merriam-Webster / Wiktionary 等）で事実確認したうえで、
//   解説は日本語で「自分の言葉」で書き、例文も自作する。辞書の英文定義・例文を逐語転載しない。
// - 出典で確認できない語法は書かない。
// - 視覚優先：各エントリに混同語の「比較表」を必ず1つ置く（CONTENT_GUIDE §5.5）。
//
// 【カスタム記法】## 見出し / **太字** / - リスト / 1. 番号 / | 表 | / `コード`
//   行頭 💡=コツ 🎯=試験ポイント ⚠️=注意 📖=発展 … パーサが絵文字を除去しラベル箱に変換

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0始まりインデックス
  explanation: string;
}

export interface Module {
  id: string;       // ペアのスラッグ（例 'affect-effect'）。URLにそのまま使う
  title: string;    // 例 'affect と effect'
  chapter: number;
  description: string;
  content: string;
  keyPoints?: string[];
  quiz: QuizQuestion[];
}

export const modules: Module[] = [
  // ══════════════════════════════════════════════
  // 第1章 スペルが似ている語
  // ══════════════════════════════════════════════
  {
    id: 'affect-effect',
    title: 'affect と effect',
    chapter: 1,
    description: '混同の超定番。affect は動詞「影響を与える」、effect は名詞「効果・結果」。品詞で割り切れます。',
    content: `## どちらを使う？

見た目がそっくりですが、**品詞で割り切る**のが近道です。

- **affect** … 基本は**動詞**で「〜に影響を与える」。
- **effect** … 基本は**名詞**で「影響・効果・結果」。

| 語 | 主な品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| affect | 動詞 | 〜に影響を与える | Lack of sleep can **affect** your memory.（睡眠不足は記憶に影響しうる） |
| effect | 名詞 | 影響・効果・結果 | The new rule had a positive **effect** on sales.（新ルールは売上に良い効果があった） |

🎯 空所の前に the/a/an や形容詞があり「名詞が入る形」なら **effect**、主語のあとで「〜する」という動作が入る形なら **affect**。これで TOEIC の品詞問題はかなり対応できます。

📖 例外もあります。effect には動詞「（変化を）もたらす・実現する」（effect a change）が、affect には心理学の名詞「感情・情動」があります。まずは「affect＝動詞／effect＝名詞」を固め、例外は後回しで十分です。`,
    keyPoints: [
      'affect は動詞「影響を与える」、effect は名詞「効果・結果」',
      '空所が名詞の形（冠詞・形容詞のあと）なら effect',
      '例外：effect の動詞「もたらす」、affect の名詞「感情」は後回しでよい',
    ],
    quiz: [
      {
        id: 'q-affeff-1',
        question: '空所に入る適切な語はどれですか。「The medicine did not ( ) him at all.（その薬は彼にまったく効かなかった）」',
        options: ['effect', 'affect', 'effective', 'affection'],
        correctAnswer: 1,
        explanation: '主語のあとで「〜に影響を与える」という動作（動詞）が必要です。動詞は affect。',
      },
      {
        id: 'q-affeff-2',
        question: '空所に入る適切な語はどれですか。「The campaign had a big ( ) on young people.（その運動は若者に大きな影響を与えた）」',
        options: ['affect', 'effect', 'affected', 'affecting'],
        correctAnswer: 1,
        explanation: 'a big ___ on と冠詞・形容詞のあとなので名詞が必要です。名詞は effect。',
      },
      {
        id: 'q-affeff-3',
        question: 'affect と effect の基本的な品詞の組み合わせとして正しいものはどれですか。',
        options: ['affect＝名詞、effect＝動詞', 'affect＝動詞、effect＝名詞', 'どちらも名詞', 'どちらも動詞'],
        correctAnswer: 1,
        explanation: '基本は affect＝動詞「影響を与える」、effect＝名詞「効果・結果」です。',
      },
      {
        id: 'q-affeff-4',
        question: '空所に入る適切な語はどれですか。「Climate change ( ) everyone.（気候変動はみなに影響する）」',
        options: ['effects', 'affects', 'effect', 'affection'],
        correctAnswer: 1,
        explanation: '主語のあとの動詞（三単現）が必要なので affects。effect は名詞です。',
      },
      {
        id: 'q-affeff-5',
        question: '見分け方として最も確実なものはどれですか。',
        options: [
          '日本語訳「影響」で丸暗記する',
          '空所に必要なのが動詞か名詞かで決める',
          'スペルが短い方を選ぶ',
          '発音で決める',
        ],
        correctAnswer: 1,
        explanation: '訳はどちらも「影響」で同じになりがち。動詞か名詞かという品詞で切り分けるのが確実です。',
      },
    ],
  },
  {
    id: 'principal-principle',
    title: 'principal と principle',
    chapter: 1,
    description: '同音。principal は「主要な／校長・元金」、principle は「原則・主義」。意味で分けます。',
    content: `## どちらを使う？

発音はほぼ同じ。**意味と品詞**で分けます。

- **principal** … 形容詞「主要な」、名詞「校長・（金融の）元金・本人」。
- **principle** … 名詞「原理・原則・主義」。

| 語 | 主な品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| principal | 形容詞／名詞 | 主要な／校長・元金 | The **principal** reason is cost.（主な理由はコストだ） |
| principle | 名詞 | 原理・原則・主義 | She refused on **principle**.（彼女は主義として断った） |

💡 フック：princip**al** の **al** を「**al**ly（味方）＝あなたの味方の校長先生」と結びつけ、princip**le** は r**ule**（規則）と語尾をそろえて「原則」と覚えると分けやすいです。`,
    keyPoints: [
      'principal は「主要な／校長・元金」（形容詞・名詞）',
      'principle は「原理・原則・主義」（名詞）',
      'フック：principal＝ally（味方の校長）、principle＝rule（規則）',
    ],
    quiz: [
      {
        id: 'q-prin-1',
        question: '空所に入る適切な語はどれですか。「Our ( ) goal this year is safety.（今年の主要な目標は安全だ）」',
        options: ['principle', 'principal', 'principles', 'principled'],
        correctAnswer: 1,
        explanation: '名詞 goal を修飾する形容詞「主要な」が必要。形容詞は principal です。',
      },
      {
        id: 'q-prin-2',
        question: '空所に入る適切な語はどれですか。「Honesty is an important ( ) for her.（誠実さは彼女の大切な信条だ）」',
        options: ['principal', 'principle', 'principals', 'principally'],
        correctAnswer: 1,
        explanation: '「原則・信条・主義」を表す名詞は principle です。',
      },
      {
        id: 'q-prin-3',
        question: 'principal の意味として当てはまらないものはどれですか。',
        options: ['主要な', '校長', '（金融の）元金', '原理・原則'],
        correctAnswer: 3,
        explanation: '「原理・原則」は principle の意味です。principal は「主要な／校長／元金／本人」を表します。',
      },
      {
        id: 'q-prin-4',
        question: '空所に入る適切な語はどれですか。「The school ( ) gave a speech.（校長がスピーチをした）」',
        options: ['principle', 'principal', 'principles', 'principally'],
        correctAnswer: 1,
        explanation: '「校長」は名詞 principal。principle は「原則」で人を指しません。',
      },
      {
        id: 'q-prin-5',
        question: '見分け方として正しいものはどれですか。',
        options: [
          'principle は「主要な／校長」',
          'principal は「主要な／校長／元金」、principle は「原則・主義」',
          'どちらも「原則」',
          'どちらも「校長」',
        ],
        correctAnswer: 1,
        explanation: 'principal＝主要な/校長/元金、principle＝原則/主義。フックで固定すると迷いません。',
      },
    ],
  },
  {
    id: 'complement-compliment',
    title: 'complement と compliment',
    chapter: 1,
    description: '同音。真ん中の e と i で意味が変わる。complement は「補完」、compliment は「褒め言葉」。',
    content: `## どちらを使う？

発音はほぼ同じ。**真ん中の文字 e / i** で意味が変わります。

- **complement** … 「**補って完成させるもの**／〜を引き立てる」。complete（完成）の仲間。
- **compliment** … 「**褒め言葉**／〜を褒める」。

| 語 | 主な品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| compl**e**ment | 名詞／動詞 | 補完するもの／引き立てる | The wine **complements** the cheese.（ワインがチーズを引き立てる） |
| compl**i**ment | 名詞／動詞 | 褒め言葉／褒める | He gave me a nice **compliment**.（彼は素敵な褒め言葉をくれた） |

🎯 フック：真ん中が **e** の compl**e**ment は compl**e**te（完成）と同じ e で「補って完成」、真ん中が **i** の compl**i**ment は「**I** like it!（褒める気持ち）」の I とつなげると思い出せます。`,
    keyPoints: [
      'complement は「補って完成させる」（complete の仲間、真ん中 e）',
      'compliment は「褒め言葉／褒める」（真ん中 i）',
      'フック：complEte の e／I like it! の i',
    ],
    quiz: [
      {
        id: 'q-comp-1',
        question: '空所に入る適切な語はどれですか。「A good wine ( ) a good meal.（良いワインは良い食事を引き立てる）」',
        options: ['compliments', 'complements', 'completes', 'compromises'],
        correctAnswer: 1,
        explanation: '「補って引き立てる」のは complement（complete の仲間）。',
      },
      {
        id: 'q-comp-2',
        question: '空所に入る適切な語はどれですか。「She paid me a lovely ( ) on my work.（私の仕事に素敵な褒め言葉をくれた）」',
        options: ['complement', 'compliment', 'complementary', 'completion'],
        correctAnswer: 1,
        explanation: '「褒め言葉」は compliment。pay a compliment で「褒める」。',
      },
      {
        id: 'q-comp-3',
        question: 'complement と compliment の見分け方として正しいものはどれですか。',
        options: [
          'complement は褒め言葉、compliment は補完するもの',
          'complement は補って完成させるもの、compliment は褒め言葉',
          'どちらも褒め言葉',
          'どちらも補完するもの',
        ],
        correctAnswer: 1,
        explanation: '真ん中 e の complement は complete の仲間で「補完」、真ん中 i の compliment は「褒め言葉」。',
      },
      {
        id: 'q-comp-4',
        question: '空所に入る適切な語はどれですか。「The scarf is a perfect ( ) to her coat.（そのスカーフはコートに完璧に合う）」',
        options: ['compliment', 'complement', 'compliments', 'complimentary'],
        correctAnswer: 1,
        explanation: '「引き立てて完成させるもの」は名詞 complement。',
      },
      {
        id: 'q-comp-5',
        question: 'compliment を思い出すフックとして本ページが挙げたものはどれですか。',
        options: ['complete の e', 'I like it! の I', 'apple の p', 'もっとも長いスペル'],
        correctAnswer: 1,
        explanation: '真ん中 i の compliment は「I like it!（褒める気持ち）」の I と結びつけられます。',
      },
    ],
  },
  {
    id: 'stationary-stationery',
    title: 'stationary と stationery',
    chapter: 1,
    description: '同音。-ary は形容詞「動かない」、-ery は名詞「文房具」。envelope の e で覚えます。',
    content: `## どちらを使う？

発音はほぼ同じ。最後が **-ary** か **-ery** かで意味が変わります。

- **stationary** … 形容詞「**動かない・静止した**」。
- **stationery** … 名詞「**文房具・便箋類**」。

| 語 | 品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| station**a**ry | 形容詞 | 動かない・静止した | The bus stayed **stationary** in the traffic.（バスは渋滞で止まったままだった） |
| station**e**ry | 名詞 | 文房具・便箋 | I bought some **stationery** for letters.（手紙用に便箋を買った） |

💡 フック：station**e**ry の **e** は **e**nvelope（封筒）や p**e**n の e ＝「紙もの」。station**a**ry の **a** は st**a**nd（立ち止まる）の a ＝「動かない」。`,
    keyPoints: [
      'stationary（形容詞）＝動かない・静止した',
      'stationery（名詞）＝文房具・便箋',
      'フック：e は envelope（紙もの）、a は stand（動かない）',
    ],
    quiz: [
      {
        id: 'q-stat-1',
        question: '空所に入る適切な語はどれですか。「The car remained ( ) at the red light.（車は赤信号で止まったままだった）」',
        options: ['stationery', 'stationary', 'station', 'stationed'],
        correctAnswer: 1,
        explanation: '「動かない・静止した」は形容詞 stationary（-ary）。',
      },
      {
        id: 'q-stat-2',
        question: '空所に入る適切な語はどれですか。「She runs a ( ) shop selling pens and notebooks.（ペンやノートを売る文房具店）」',
        options: ['stationary', 'stationery', 'stationaries', 'stationing'],
        correctAnswer: 1,
        explanation: '「文房具」を表す名詞は stationery（-ery）。envelope の e で覚えます。',
      },
      {
        id: 'q-stat-3',
        question: 'stationary と stationery の覚え方として正しいものはどれですか。',
        options: [
          'stationary は文房具、stationery は動かない',
          'stationery の e は envelope の e（紙もの）、stationary の a は stand の a（動かない）',
          'どちらも形容詞',
          'どちらも名詞',
        ],
        correctAnswer: 1,
        explanation: 'stationery（名詞・文房具）の e は envelope、stationary（形容詞・動かない）の a は stand。',
      },
      {
        id: 'q-stat-4',
        question: 'stationery の品詞と意味の組み合わせとして正しいものはどれですか。',
        options: ['形容詞・動かない', '名詞・文房具', '動詞・止まる', '副詞・静かに'],
        correctAnswer: 1,
        explanation: 'stationery は名詞で「文房具・便箋類」です。',
      },
      {
        id: 'q-stat-5',
        question: '空所に入る適切な語はどれですか。「A ( ) bike is used for indoor exercise.（室内運動に固定式バイクが使われる）」',
        options: ['stationery', 'stationary', 'stationeries', 'stationer'],
        correctAnswer: 1,
        explanation: '「動かない・固定式の」は形容詞 stationary です。',
      },
    ],
  },
  {
    id: 'desert-dessert',
    title: 'desert と dessert',
    chapter: 1,
    description: 's が1つか2つか。desert は「砂漠／見捨てる」、dessert は「デザート」。Sweet Stuff の ss。',
    content: `## どちらを使う？

**s が1つか2つか**。さらに desert は品詞でアクセントが動きます。

- **desert** … 名詞「砂漠」（前にアクセント）／動詞「見捨てる」（後ろにアクセント）。
- **dessert** … 名詞「（食後の）デザート」（後ろにアクセント）。

| 語 | 品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| desert（名） | 名詞 | 砂漠 | Few plants grow in the **desert**.（砂漠では植物がほとんど育たない） |
| desert（動） | 動詞 | 見捨てる・放棄する | He would never **desert** his friends.（彼は決して友を見捨てない） |
| dessert | 名詞 | 食後のデザート | We had cake for **dessert**.（デザートにケーキを食べた） |

🎯 フック：dessert は s が2つ＝「**S**weet **S**tuff（甘いもの）」。砂漠 desert は s が1つ。`,
    keyPoints: [
      'desert＝砂漠（名）/見捨てる（動）、s は1つ',
      'dessert＝食後のデザート、s は2つ（Sweet Stuff）',
      'desert は名詞と動詞でアクセント位置が動く',
    ],
    quiz: [
      {
        id: 'q-des-1',
        question: '空所に入る適切な語はどれですか。「We had ice cream for ( ) after dinner.（夕食後にアイスを食べた）」',
        options: ['desert', 'dessert', 'deserts', 'deserted'],
        correctAnswer: 1,
        explanation: '「食後の甘いもの」は dessert（s が2つ）。',
      },
      {
        id: 'q-des-2',
        question: '空所に入る適切な語はどれですか。「Camels can survive in the ( ) for days.（らくだは砂漠で何日も生き延びられる）」',
        options: ['dessert', 'desert', 'desserts', 'deserve'],
        correctAnswer: 1,
        explanation: '「砂漠」は desert（s が1つ、前にアクセント）。',
      },
      {
        id: 'q-des-3',
        question: 'desert（動詞）の意味として正しいものはどれですか。',
        options: ['デザートを食べる', '見捨てる・放棄する', '砂漠化する', '乾燥させる'],
        correctAnswer: 1,
        explanation: 'desert は動詞で「見捨てる・放棄する」（後ろにアクセント）。名詞では「砂漠」。',
      },
      {
        id: 'q-des-4',
        question: 'dessert を間違えないフックとして正しいものはどれですか。',
        options: ['s が1つ', 's が2つ＝Sweet Stuff', 'd が2つ', 't が2つ'],
        correctAnswer: 1,
        explanation: 'dessert は s が2つ。「Sweet Stuff（甘いもの）」で覚えます。',
      },
      {
        id: 'q-des-5',
        question: '空所に入る適切な語はどれですか。「The soldiers refused to ( ) their post.（兵士たちは持ち場を放棄するのを拒んだ）」',
        options: ['dessert', 'desert', 'desserts', 'desserted'],
        correctAnswer: 1,
        explanation: '「放棄する・見捨てる」は動詞 desert。dessert は名詞「デザート」です。',
      },
    ],
  },
  {
    id: 'altar-alter',
    title: 'altar と alter',
    chapter: 1,
    description: '-ar か -er か。altar は名詞「祭壇」、alter は動詞「変える」。alternative の仲間。',
    content: `## どちらを使う？

最後が **-ar** か **-er** か。**品詞がそもそも違います**。

- **altar** … 名詞「**祭壇**」（教会などにある台）。
- **alter** … 動詞「**変える・変更する**」。

| 語 | 品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| alt**ar** | 名詞 | 祭壇 | They married at the **altar**.（二人は祭壇の前で結婚した） |
| alt**er** | 動詞 | 変える・変更する | I had to **alter** the plan.（計画を変えなければならなかった） |

💡 フック：alt**er** は alt**er**native（別の・代わりの）と同じ alter- で「別のものに**変える**」動詞。alt**ar** は「祭壇という“もの”（名詞）」。`,
    keyPoints: [
      'altar（名詞）＝祭壇',
      'alter（動詞）＝変える・変更する',
      'フック：alter は alternative の仲間（変える）',
    ],
    quiz: [
      {
        id: 'q-alt-1',
        question: '空所に入る適切な語はどれですか。「The couple exchanged vows at the ( ).（二人は祭壇の前で誓いを交わした）」',
        options: ['alter', 'altar', 'alters', 'altered'],
        correctAnswer: 1,
        explanation: '「祭壇」は名詞 altar（-ar）。',
      },
      {
        id: 'q-alt-2',
        question: '空所に入る適切な語はどれですか。「We may need to ( ) the schedule.（予定を変更する必要があるかも）」',
        options: ['altar', 'alter', 'altars', 'altarage'],
        correctAnswer: 1,
        explanation: '「変える・変更する」は動詞 alter（-er）。',
      },
      {
        id: 'q-alt-3',
        question: 'altar と alter の品詞の組み合わせとして正しいものはどれですか。',
        options: [
          'altar＝動詞、alter＝名詞',
          'altar＝名詞（祭壇）、alter＝動詞（変える）',
          'どちらも名詞',
          'どちらも動詞',
        ],
        correctAnswer: 1,
        explanation: 'altar は名詞「祭壇」、alter は動詞「変える」。語尾 -ar/-er と品詞をセットで覚えます。',
      },
      {
        id: 'q-alt-4',
        question: 'alter を思い出すフックとして本ページが挙げたものはどれですか。',
        options: ['altitude（高度）', 'alternative（別の）の仲間', 'always（いつも）', 'almost（ほとんど）'],
        correctAnswer: 1,
        explanation: 'alter は alternative（別の・代わりの）と同じ alter- で「別のものに変える」。',
      },
      {
        id: 'q-alt-5',
        question: '空所に入る適切な語はどれですか。「A tailor can ( ) the suit to fit you.（仕立屋がスーツをあなたに合うよう直せる）」',
        options: ['altar', 'alter', 'altars', 'altared'],
        correctAnswer: 1,
        explanation: '「（衣服を）直す・変える」は動詞 alter です。',
      },
    ],
  },
  {
    id: 'precede-proceed',
    title: 'precede と proceed',
    chapter: 1,
    description: '接頭辞で方向が逆。precede（pre＝前に）は「先行する」、proceed（pro＝前へ）は「進む」。',
    content: `## どちらを使う？

どちらも動詞ですが、**接頭辞**で方向が逆になります。

- **precede** … **pre（前に）**＝「〜の前に来る・先行する」。
- **proceed** … **pro（前へ）**＝「（先へ）進む・続ける」。

| 語 | 接頭辞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| **pre**cede | pre＝前に | 〜より前に来る・先行する | A short speech **preceded** the dinner.（短いスピーチが夕食に先立った） |
| **pro**ceed | pro＝前方へ | 先へ進む・続ける | Please **proceed** to gate 5.（5番ゲートへお進みください） |

🎯 precede は「前に**位置する**（順序が先）」、proceed は「前へ**動く**（先に進む）」。pre＝既に前にある、pro＝これから前方へ、と分けます。`,
    keyPoints: [
      'precede（pre＝前に）＝〜より前に来る・先行する',
      'proceed（pro＝前へ）＝進む・続ける',
      'pre＝既に前にある、pro＝これから前方へ',
    ],
    quiz: [
      {
        id: 'q-pre-1',
        question: '空所に入る適切な語はどれですか。「The ceremony was ( ) by a moment of silence.（式典は黙とうに先立たれた）」',
        options: ['proceeded', 'preceded', 'precedes', 'proceeding'],
        correctAnswer: 1,
        explanation: '「〜の前に来る・先行する」は precede。pre（前に）が手がかり。',
      },
      {
        id: 'q-pre-2',
        question: '空所に入る適切な語はどれですか。「After a short break, we will ( ) with the meeting.（休憩後、会議を続けます）」',
        options: ['precede', 'proceed', 'precedes', 'preceded'],
        correctAnswer: 1,
        explanation: '「先へ進む・続ける」は proceed（pro＝前方へ）。',
      },
      {
        id: 'q-pre-3',
        question: 'precede と proceed の見分け方として正しいものはどれですか。',
        options: [
          'precede は前へ進む、proceed は前に来る',
          'precede は前に位置する（先行）、proceed は前へ動く（進む）',
          'どちらも「保険をかける」',
          'どちらも名詞',
        ],
        correctAnswer: 1,
        explanation: 'pre＝既に前にある（先行する）、pro＝これから前方へ動く（進む）。接頭辞で区別します。',
      },
      {
        id: 'q-pre-4',
        question: '「The introduction ( ) the main chapters.（序論が本編の章に先立つ）」空所に入る語はどれですか。',
        options: ['proceeds', 'precedes', 'proceed', 'preceding'],
        correctAnswer: 1,
        explanation: '「〜より前に来る」は precede（三単現 precedes）。',
      },
      {
        id: 'q-pre-5',
        question: '接頭辞の意味の組み合わせとして正しいものはどれですか。',
        options: ['pre＝前へ進む、pro＝前にある', 'pre＝前に、pro＝前方へ', 'pre＝後ろに、pro＝横に', 'どちらも「後ろ」'],
        correctAnswer: 1,
        explanation: 'pre＝前に（precede＝先行）、pro＝前方へ（proceed＝進む）。',
      },
    ],
  },
  {
    id: 'except-expect',
    title: 'except と expect',
    chapter: 1,
    description: '品詞が違う。except は前置詞「〜を除いて」、expect は動詞「予期する」。役割で見分けます。',
    content: `## どちらを使う？

**品詞がそもそも違う**ので、文の中での役割で見分けます。

- **except** … おもに**前置詞・接続詞**「〜を除いて」。
- **expect** … **動詞**「〜を予期する・期待する」。

| 語 | 品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| ex**c**ept | 前置詞 | 〜を除いて | Everyone came **except** Tom.（トム以外みんな来た） |
| ex**p**ect | 動詞 | 〜を予期する | We **expect** rain tomorrow.（明日は雨だと思う） |

💡 フック：ex**c**ept は ex**c**lude（除外する）と同じ c で「除く」。expect は主語のあとに置く「動作（〜する）」＝動詞。空所が「動詞の位置」なら expect です。`,
    keyPoints: [
      'except は前置詞・接続詞「〜を除いて」（exclude の c）',
      'expect は動詞「〜を予期する」',
      '文中の役割（品詞）で見分ける',
    ],
    quiz: [
      {
        id: 'q-exc-1',
        question: '空所に入る適切な語はどれですか。「The shop is open every day ( ) Sunday.（日曜以外毎日開いている）」',
        options: ['expect', 'except', 'expects', 'expected'],
        correctAnswer: 1,
        explanation: '「〜を除いて」は前置詞 except（exclude の c）。',
      },
      {
        id: 'q-exc-2',
        question: '空所に入る適切な語はどれですか。「I didn\'t ( ) so many people to come.（こんなに来るとは思わなかった）」',
        options: ['except', 'expect', 'excepts', 'excepting'],
        correctAnswer: 1,
        explanation: '主語のあとの動作（動詞）「予期する」は expect。',
      },
      {
        id: 'q-exc-3',
        question: 'except と expect の見分け方として正しいものはどれですか。',
        options: [
          'except は動詞、expect は前置詞',
          'except は前置詞「除いて」（exclude の c）、expect は動詞「予期する」',
          'どちらも前置詞',
          'どちらも動詞',
        ],
        correctAnswer: 1,
        explanation: 'except は前置詞・接続詞、expect は動詞。文中の役割で見分けます。',
      },
      {
        id: 'q-exc-4',
        question: '空所に入る適切な語はどれですか。「All the answers are correct ( ) the last one.（最後の1つを除いて全部正しい）」',
        options: ['expect', 'except', 'expecting', 'expected'],
        correctAnswer: 1,
        explanation: '「〜を除いて」は前置詞 except です。',
      },
      {
        id: 'q-exc-5',
        question: 'except を思い出すフックとして本ページが挙げたものはどれですか。',
        options: ['expensive の p', 'exclude の c（除く）', 'expert の p', 'example の a'],
        correctAnswer: 1,
        explanation: 'exCept は exClude（除外する）と同じ c で「除く」と結びつけられます。',
      },
    ],
  },
  {
    id: 'ensure-assure-insure',
    title: 'ensure と assure と insure',
    chapter: 1,
    description: '「保証」の3兄弟。事を確実に（ensure）／人を安心（assure）／保険（insure）で使い分け。',
    content: `## どれを使う？

発音が近く、すべて「確実・保証」に関わりますが、**何を／誰を**対象にするかで使い分けます。

- **ensure** … **事柄**を確実にする。
- **assure** … **人**を安心させる・保証する（目的語は人）。
- **insure** … **保険**をかける。

| 語 | 対象 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| **en**sure | 事 | 〜を確実にする | Please **ensure** the door is locked.（ドアの施錠を確実に） |
| **a**ssure | 人 | （人）を安心させる・保証する | I **assure** you it is safe.（安全だと保証します） |
| **in**sure | 物・リスク | 〜に保険をかける | They **insured** the car against theft.（盗難に備え車に保険をかけた） |

🎯 フック：**a**ssure の a は「**a** person（人）を安心」、**in**sure の in は「**in**surance（保険）」、**en**sure は「事を確実に」。目的語が人なら assure、保険の話なら insure、それ以外で「確実にする」なら ensure。`,
    keyPoints: [
      'ensure＝事を確実にする',
      'assure＝人を安心させる（目的語は人）',
      'insure＝保険をかける（insurance）',
    ],
    quiz: [
      {
        id: 'q-ens-1',
        question: '空所に入る適切な語はどれですか。「Please ( ) that all windows are closed.（全部の窓が閉まっているのを確実に）」',
        options: ['assure', 'ensure', 'insure', 'assured'],
        correctAnswer: 1,
        explanation: '対象が「事柄」を確実にするので ensure。',
      },
      {
        id: 'q-ens-2',
        question: '空所に入る適切な語はどれですか。「I ( ) you that there is nothing to worry about.（心配いらないと保証します）」',
        options: ['ensure', 'assure', 'insure', 'ensured'],
        correctAnswer: 1,
        explanation: '目的語が「人（you）」を安心させる・保証するので assure。',
      },
      {
        id: 'q-ens-3',
        question: '空所に入る適切な語はどれですか。「You should ( ) your house against fire.（火災に備えて家に保険をかけるべき）」',
        options: ['ensure', 'assure', 'insure', 'assure'],
        correctAnswer: 2,
        explanation: '「保険をかける」は insure（insurance の in）。',
      },
      {
        id: 'q-ens-4',
        question: 'ensure / assure / insure の使い分けとして正しいものはどれですか。',
        options: [
          'ensure＝保険、assure＝事を確実に、insure＝人を安心',
          'ensure＝事を確実に、assure＝人を安心、insure＝保険',
          'すべて同じで交換可能',
          'ensure＝人を安心、assure＝保険、insure＝事を確実に',
        ],
        correctAnswer: 1,
        explanation: 'ensure＝事を確実に、assure＝人を安心、insure＝保険。対象で使い分けます。',
      },
      {
        id: 'q-ens-5',
        question: '目的語が「人」のとき選ぶべき語はどれですか。',
        options: ['ensure', 'assure', 'insure', 'どれでもよい'],
        correctAnswer: 1,
        explanation: 'assure は人を安心させる動詞で、目的語に人をとります（assure + 人）。',
      },
    ],
  },
  {
    id: 'capital-capitol',
    title: 'capital と capitol',
    chapter: 1,
    description: 'ほぼ同音。capital は「首都・資本・大文字」、capitol は「議事堂」。ドームの O。',
    content: `## どちらを使う？

ほぼ同音。l の前が **a** か **o** かで変わります。

- **capital** … 名詞「**首都**・資本（金）・大文字」、形容詞「主要な」。
- **capitol** … 名詞「**議事堂**」（とくに米国の the Capitol）。

| 語 | 中心の意味 | 自作の例文 |
| --- | --- | --- |
| capit**a**l | 首都・資本・大文字 | Tokyo is the **capital** of Japan.（東京は日本の首都だ） |
| capit**o**l | 議事堂（建物） | Lawmakers gathered at the **capitol**.（議員たちが議事堂に集まった） |

🎯 フック：capit**o**l の **o** は、議事堂の丸い**ドーム（dome）の O**。建物の話なら capitol、それ以外（首都・資本など）はほぼ capital。`,
    keyPoints: [
      'capital＝首都・資本・大文字・主要な',
      'capitol＝議事堂（建物）',
      'フック：capitOl の O はドームの O',
    ],
    quiz: [
      {
        id: 'q-cap-1',
        question: '空所に入る適切な語はどれですか。「Paris is the ( ) of France.（パリはフランスの首都だ）」',
        options: ['capitol', 'capital', 'capitals', 'capitalize'],
        correctAnswer: 1,
        explanation: '「首都」は capital。capitol は「議事堂」です。',
      },
      {
        id: 'q-cap-2',
        question: '空所に入る適切な語はどれですか。「The protest took place outside the ( ) building.（議事堂の外で抗議が行われた）」',
        options: ['capital', 'capitol', 'capitals', 'capitally'],
        correctAnswer: 1,
        explanation: '「議事堂（建物）」は capitol。ドームの O で覚えます。',
      },
      {
        id: 'q-cap-3',
        question: 'capital の意味として当てはまらないものはどれですか。',
        options: ['首都', '資本（金）', '大文字', '議事堂'],
        correctAnswer: 3,
        explanation: '「議事堂」は capitol。capital は首都・資本・大文字・主要な、を表します。',
      },
      {
        id: 'q-cap-4',
        question: '空所に入る適切な語はどれですか。「The company needs more ( ) to expand.（拡大にはもっと資本が必要だ）」',
        options: ['capitol', 'capital', 'capitols', 'capitally'],
        correctAnswer: 1,
        explanation: '「資本（金）」は capital です。',
      },
      {
        id: 'q-cap-5',
        question: 'capitol を間違えないフックとして正しいものはどれですか。',
        options: ['a は apple の a', 'o はドーム（dome）の O', 'l が2つ', 't が2つ'],
        correctAnswer: 1,
        explanation: 'capitOl の O を議事堂の丸いドームと結びつけると、建物の意味だと思い出せます。',
      },
    ],
  },
  {
    id: 'discreet-discrete',
    title: 'discreet と discrete',
    chapter: 1,
    description: '同音。discreet は「慎重な・口が堅い」、discrete は「個別の・分離した」。e の位置で。',
    content: `## どちらを使う？

同音ですが意味は別物。**e の位置**で覚えます。

- **discreet** … 形容詞「**慎重な・口が堅い・控えめ**」。
- **discrete** … 形容詞「**個別の・分離した・離散的な**」。

| 語 | 中心の意味 | 自作の例文 |
| --- | --- | --- |
| discr**ee**t | 慎重な・口が堅い | He was **discreet** about the secret.（彼はその秘密に口が堅かった） |
| discr**e**t**e** | 個別の・分離した | The course has three **discrete** parts.（その講座は3つの独立した部分から成る） |

💡 フック：discr**e**t**e** は、2つの e が真ん中の **t で分けられている**＝「分離した」。discr**ee**t は **ee がくっついて**「ひそひそ＝慎重」。`,
    keyPoints: [
      'discreet＝慎重な・口が堅い（ee がくっつく）',
      'discrete＝個別の・分離した（e が t で分かれる）',
      'フック：分けられた e＝分離、くっつく ee＝ひそひそ',
    ],
    quiz: [
      {
        id: 'q-dis-1',
        question: '空所に入る適切な語はどれですか。「Please be ( ) — don\'t tell anyone.（慎重に。誰にも言わないで）」',
        options: ['discrete', 'discreet', 'discretes', 'discreetly'],
        correctAnswer: 1,
        explanation: '「慎重な・口が堅い」は discreet（ee がくっつく）。',
      },
      {
        id: 'q-dis-2',
        question: '空所に入る適切な語はどれですか。「The data is divided into ( ) categories.（データは個別のカテゴリに分けられている）」',
        options: ['discreet', 'discrete', 'discreets', 'discreetly'],
        correctAnswer: 1,
        explanation: '「個別の・分離した」は discrete（e が t で分かれる）。',
      },
      {
        id: 'q-dis-3',
        question: 'discreet と discrete の覚え方として正しいものはどれですか。',
        options: [
          'discrete は慎重な、discreet は分離した',
          'discrete は e が t で分かれる＝分離、discreet は ee がくっつく＝慎重',
          'どちらも「個別の」',
          'どちらも「慎重な」',
        ],
        correctAnswer: 1,
        explanation: 'discrEtE は e が t で分けられて「分離」、discrEEt は ee がくっついて「慎重」。',
      },
      {
        id: 'q-dis-4',
        question: 'discreet の意味として正しいものはどれですか。',
        options: ['個別の', '慎重な・口が堅い', '離散的な', '連続した'],
        correctAnswer: 1,
        explanation: 'discreet は「慎重な・口が堅い・控えめ」。',
      },
      {
        id: 'q-dis-5',
        question: '空所に入る適切な語はどれですか。「Each device has a ( ) function.（各装置は個別の機能を持つ）」',
        options: ['discreet', 'discrete', 'discreets', 'discreetly'],
        correctAnswer: 1,
        explanation: '「個別の・独立した」は discrete です。',
      },
    ],
  },
  {
    id: 'eminent-imminent',
    title: 'eminent と imminent',
    chapter: 1,
    description: '頭が e か i か。eminent は「著名な」、imminent は「差し迫った」。Excellent/Immediate。',
    content: `## どちらを使う？

頭が **e** か **i** か。意味はまったく別です。

- **eminent** … 形容詞「**著名な・卓越した**」。
- **imminent** … 形容詞「**差し迫った・今にも起こりそう**」（多くは良くない事に使う）。

| 語 | 中心の意味 | 自作の例文 |
| --- | --- | --- |
| **e**minent | 著名な・卓越した | She is an **eminent** scientist.（彼女は著名な科学者だ） |
| **i**mminent | 差し迫った | A storm is **imminent**.（嵐が差し迫っている） |

🎯 フック：**E**minent は **E**xcellent（卓越）の E、**I**mminent は **I**mmediate（即座・差し迫った）の I。頭文字で連想します。`,
    keyPoints: [
      'eminent＝著名な・卓越した（Excellent の E）',
      'imminent＝差し迫った（Immediate の I）',
      'imminent は多く良くない事（危険など）に使う',
    ],
    quiz: [
      {
        id: 'q-emi-1',
        question: '空所に入る適切な語はどれですか。「He is an ( ) historian, known worldwide.（彼は世界的に有名な歴史家だ）」',
        options: ['imminent', 'eminent', 'immanent', 'imminently'],
        correctAnswer: 1,
        explanation: '「著名な・卓越した」は eminent（Excellent の E）。',
      },
      {
        id: 'q-emi-2',
        question: '空所に入る適切な語はどれですか。「The workers were warned of ( ) danger.（差し迫った危険を警告された）」',
        options: ['eminent', 'imminent', 'eminently', 'eminence'],
        correctAnswer: 1,
        explanation: '「差し迫った」は imminent（Immediate の I）。多くは危険など良くない事に使います。',
      },
      {
        id: 'q-emi-3',
        question: 'eminent と imminent の見分け方として正しいものはどれですか。',
        options: [
          'eminent＝差し迫った、imminent＝著名な',
          'eminent＝著名な（Excellent）、imminent＝差し迫った（Immediate）',
          'どちらも「著名な」',
          'どちらも「差し迫った」',
        ],
        correctAnswer: 1,
        explanation: '頭文字で、Eminent＝Excellent（著名）、Imminent＝Immediate（差し迫った）。',
      },
      {
        id: 'q-emi-4',
        question: 'imminent が多く使われる文脈はどれですか。',
        options: ['楽しい予定', '危険・脅威など良くない事の切迫', '過去の出来事', '人の性格'],
        correctAnswer: 1,
        explanation: 'imminent は危険・脅威など、多く良くない事が差し迫っている状況に使われます。',
      },
      {
        id: 'q-emi-5',
        question: '空所に入る適切な語はどれですか。「Her ( ) contribution earned worldwide respect.（彼女の卓越した貢献は世界的な尊敬を得た）」',
        options: ['imminent', 'eminent', 'imminently', 'imminence'],
        correctAnswer: 1,
        explanation: '「卓越した・著名な」は eminent です。',
      },
    ],
  },

  // ══════════════════════════════════════════════
  // 第2章 意味が近く使い分けが難しい語
  // ══════════════════════════════════════════════
  {
    id: 'lie-lay',
    title: 'lie と lay',
    chapter: 2,
    description: '自動詞 lie（横たわる）と他動詞 lay（〜を横たえる）。「目的語があるか」で見分け、活用の罠に注意。',
    content: `## どちらを使う？

意味が近いうえに**活用が交差する**、英語学習の最難関ペアです。決め手は**「直後に目的語（〜を）があるか」**。

- **lie** … **自動詞**「横たわる・ある」。目的語をとらない。
- **lay** … **他動詞**「〜を横たえる・置く」。目的語が必要。

| 語 | 自他 | 中心の意味 | 活用（原形-過去-過去分詞-ing） | 自作の例文 |
| --- | --- | --- | --- | --- |
| lie | 自動詞 | 横たわる・ある | lie - **lay** - lain - lying | I **lie** on the sofa.（ソファに横になる） |
| lay | 他動詞 | 〜を横たえる・置く | lay - laid - laid - laying | I **lay** the baby on the bed.（赤ちゃんをベッドに寝かせる） |

🎯 見分け方：直後に「**〜を**（目的語）」があれば **lay**、なければ **lie**。「I lay the book down（本を置く）」は目的語 the book があるので lay。「I lie down（横になる）」は目的語なしで lie。

⚠️ 最大の罠：**lie（横たわる）の過去形は lay**。つまり "I lay on the bed." は「横たわった（lie の過去）」。現在形の lay（置く）と形が同じなので、文脈と目的語の有無で判断します。`,
    keyPoints: [
      'lie＝自動詞「横たわる」（目的語なし）、活用 lie-lay-lain',
      'lay＝他動詞「〜を置く」（目的語あり）、活用 lay-laid-laid',
      '見分け：直後に「〜を」があれば lay、なければ lie',
      '罠：lie の過去形が lay と同形',
    ],
    quiz: [
      {
        id: 'q-lielay-1',
        question: '空所に入る適切な語はどれですか（現在形）。「Every afternoon I ( ) on the grass and relax.（毎日午後、芝生に横になってくつろぐ）」',
        options: ['lay', 'lie', 'laid', 'lain'],
        correctAnswer: 1,
        explanation: '目的語がなく「横になる」自動詞なので lie。直後に「〜を」がない点が手がかりです。',
      },
      {
        id: 'q-lielay-2',
        question: '空所に入る適切な語はどれですか（現在形）。「Please ( ) the books on the table.（本をテーブルに置いてください）」',
        options: ['lie', 'lay', 'lain', 'lying'],
        correctAnswer: 1,
        explanation: '目的語 the books があるので他動詞 lay（〜を置く）。',
      },
      {
        id: 'q-lielay-3',
        question: 'lie と lay の見分け方として正しいものはどれですか。',
        options: [
          '意味が「横」なら必ず lay',
          '直後に目的語（〜を）があれば lay、なければ lie',
          'lie はいつも過去形',
          'どちらも他動詞',
        ],
        correctAnswer: 1,
        explanation: '目的語の有無が決め手。lay は他動詞で目的語が必要、lie は自動詞で目的語をとりません。',
      },
      {
        id: 'q-lielay-4',
        question: '「横たわる」という意味の lie の過去形はどれですか。',
        options: ['lied', 'lay', 'laid', 'lain'],
        correctAnswer: 1,
        explanation: 'lie（横たわる）の活用は lie-lay-lain。過去形は lay で、現在形の lay（置く）と同形なのが混乱の元です。',
      },
      {
        id: 'q-lielay-5',
        question: '空所に入る適切な語はどれですか（過去形）。「She ( ) the blanket over the child last night.（昨夜、子どもに毛布をかけた）」',
        options: ['lay', 'laid', 'lain', 'lied'],
        correctAnswer: 1,
        explanation: '目的語 the blanket があるので他動詞 lay。その過去形は laid です。',
      },
    ],
  },
  {
    id: 'rise-raise',
    title: 'rise と raise',
    chapter: 2,
    description: '自動詞 rise（上がる）と他動詞 raise（〜を上げる）。目的語の有無と活用で見分けます。',
    content: `## どちらを使う？

lie/lay と同じ「自動詞 vs 他動詞」の関係です。決め手も同じく**目的語の有無**。

- **rise** … **自動詞**「上がる・のぼる」。目的語をとらない。
- **raise** … **他動詞**「〜を上げる」。目的語が必要。

| 語 | 自他 | 中心の意味 | 活用（原形-過去-過去分詞） | 自作の例文 |
| --- | --- | --- | --- | --- |
| rise | 自動詞 | 上がる・のぼる | rise - rose - risen | The sun **rises** in the east.（太陽は東からのぼる） |
| raise | 他動詞 | 〜を上げる | raise - raised - raised | Please **raise** your hand.（手を上げてください） |

🎯 見分け方：直後に「**〜を**（目的語）」があれば **raise**、なければ **rise**。「Prices rise（物価が上がる）」は目的語なしで rise、「raise prices（物価を上げる）」は目的語ありで raise。

💡 活用も対照的：rise は不規則（rise-rose-risen）、raise は規則（raise-raised-raised）。「自分で上がる rise」「何かを上げる raise」と方向で覚えると、lie/lay と同じパターンで整理できます。`,
    keyPoints: [
      'rise＝自動詞「上がる」（目的語なし）、活用 rise-rose-risen',
      'raise＝他動詞「〜を上げる」（目的語あり）、活用 raise-raised-raised',
      '見分け：直後に「〜を」があれば raise、なければ rise',
      'lie/lay と同じ「自動詞 vs 他動詞」パターン',
    ],
    quiz: [
      {
        id: 'q-rise-1',
        question: '空所に入る適切な語はどれですか。「Hot air ( ) because it is lighter.（暖かい空気は軽いので上昇する）」',
        options: ['raises', 'rises', 'raised', 'is raised'],
        correctAnswer: 1,
        explanation: '目的語がなく「自分で上がる」自動詞なので rises。',
      },
      {
        id: 'q-rise-2',
        question: '空所に入る適切な語はどれですか。「The company plans to ( ) wages next year.（来年賃金を上げる予定だ）」',
        options: ['rise', 'raise', 'risen', 'rose'],
        correctAnswer: 1,
        explanation: '目的語 wages があるので他動詞 raise（〜を上げる）。',
      },
      {
        id: 'q-rise-3',
        question: 'rise と raise の見分け方として正しいものはどれですか。',
        options: [
          '「上」の意味なら必ず raise',
          '直後に目的語（〜を）があれば raise、なければ rise',
          'rise はいつも他動詞',
          'どちらも自動詞',
        ],
        correctAnswer: 1,
        explanation: '目的語の有無が決め手。raise は他動詞で目的語が必要、rise は自動詞で目的語をとりません。',
      },
      {
        id: 'q-rise-4',
        question: 'rise の活用として正しいものはどれですか。',
        options: ['rise-rised-rised', 'rise-rose-risen', 'rise-raised-raised', 'rise-rose-rose'],
        correctAnswer: 1,
        explanation: 'rise は不規則変化で rise-rose-risen。他動詞 raise は規則変化 raise-raised-raised です。',
      },
      {
        id: 'q-rise-5',
        question: '空所に入る適切な語はどれですか（過去形）。「The sun ( ) at 5 a.m. this morning.（今朝5時に日が昇った）」',
        options: ['raised', 'rose', 'risen', 'raise'],
        correctAnswer: 1,
        explanation: '目的語がなく「昇る」自動詞 rise の過去形は rose です。',
      },
    ],
  },
  {
    id: 'borrow-lend',
    title: 'borrow と lend',
    chapter: 2,
    description: 'どちらも一時的なやり取りだが向きが逆。borrow は「借りる（受け取る側）」、lend は「貸す（渡す側）」。',
    content: `## どちらを使う？

同じ貸し借りでも、**自分がどちら側か（受け取る／渡す）**で語が変わります。

- **borrow** … 「**借りる**」。自分が**受け取る**側。ふつう **borrow … from 〜**。
- **lend** … 「**貸す**」。自分が**渡す**側。**lend 人 物** または **lend 物 to 人**。

| 語 | 向き | 中心の意味 | よく使う形 | 自作の例文 |
| --- | --- | --- | --- | --- |
| borrow | 受け取る側 | （無償で一時的に）借りる | borrow … from 〜 | Can I **borrow** your pen?（ペンを借りていい？） |
| lend | 渡す側 | （一時的に）貸す | lend 人 物 / lend 物 to 人 | I'll **lend** you my umbrella.（傘を貸すよ） |

🎯 見分け方：主語が「**受け取る人**」なら borrow、「**渡す人**」なら lend。同じ場面でも視点が逆。「A borrows from B」＝「B lends to A」。

💡 フック：bo**rrow** は「（受け取って後で）返す（return）」イメージ、**l**end は **l**oan（貸付）の l。活用は lend-**lent**-lent（不規則）、borrow-borrowed-borrowed（規則）。`,
    keyPoints: [
      'borrow＝借りる（受け取る側）、borrow … from 〜',
      'lend＝貸す（渡す側）、lend 人 物／lend 物 to 人',
      '見分け：主語が受け取る人なら borrow、渡す人なら lend',
      '活用：lend-lent-lent（不規則）、borrow は規則',
    ],
    quiz: [
      {
        id: 'q-borrow-1',
        question: '空所に入る適切な語はどれですか。「Can I ( ) your dictionary for a minute?（少し辞書を借りていい？）」',
        options: ['lend', 'borrow', 'lent', 'borrowed'],
        correctAnswer: 1,
        explanation: '主語 I が受け取る側なので borrow（借りる）。',
      },
      {
        id: 'q-borrow-2',
        question: '空所に入る適切な語はどれですか。「Could you ( ) me some money until payday?（給料日までお金を貸してくれる？）」',
        options: ['borrow', 'lend', 'borrowed', 'borrowing'],
        correctAnswer: 1,
        explanation: '主語 you が渡す側で、lend 人 物（lend me some money）の形なので lend。',
      },
      {
        id: 'q-borrow-3',
        question: 'borrow と lend の見分け方として正しいものはどれですか。',
        options: [
          '金額が大きければ lend',
          '主語が受け取る人なら borrow、渡す人なら lend',
          'borrow はいつも過去形',
          'どちらも「貸す」',
        ],
        correctAnswer: 1,
        explanation: '視点で決まります。受け取る側の動作が borrow、渡す側の動作が lend。',
      },
      {
        id: 'q-borrow-4',
        question: 'lend の過去形はどれですか。',
        options: ['lended', 'lent', 'lend', 'lont'],
        correctAnswer: 1,
        explanation: 'lend は不規則変化で lend-lent-lent。borrow は規則変化です。',
      },
      {
        id: 'q-borrow-5',
        question: '「A borrows a book from B.」と同じ出来事を表す文はどれですか。',
        options: [
          'A lends a book to B.',
          'B lends a book to A.',
          'B borrows a book from A.',
          'A and B borrow a book.',
        ],
        correctAnswer: 1,
        explanation: 'A が B から借りる＝B が A に貸す。視点が逆になるだけで同じやり取りです。',
      },
    ],
  },
  {
    id: 'beside-besides',
    title: 'beside と besides',
    chapter: 2,
    description: 's が付くだけで意味が変わる。beside は「〜のそばに」（位置）、besides は「〜に加えて」（追加）。',
    content: `## どちらを使う？

末尾の **s の有無**で、**位置**を表すか**追加**を表すかが変わります。

- **beside** … 前置詞「**〜のそばに・横に**」（場所）。
- **besides** … 前置詞「**〜に加えて・〜のほかに**」／副詞「**その上・さらに**」（追加）。

| 語 | 品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| beside | 前置詞 | 〜のそばに | She sat **beside** me.（彼女は私のそばに座った） |
| besides | 前置詞／副詞 | 〜に加えて／その上 | **Besides** English, he speaks French.（英語に加えてフランス語も話す） |

🎯 見分け方：**位置**（横に・そばに）なら beside、**追加**（〜のほかに・その上）なら besides。「s が付くと“さらに（プラス）”」と覚えると、追加の意味と結びつきます。`,
    keyPoints: [
      'beside＝前置詞「〜のそばに」（位置）',
      'besides＝前置詞「〜に加えて」／副詞「その上」（追加）',
      's が付くと「さらに（プラス）」＝追加の意味',
    ],
    quiz: [
      {
        id: 'q-bes-1',
        question: '空所に入る適切な語はどれですか。「There is a small table ( ) the bed.（ベッドのそばに小さな机がある）」',
        options: ['besides', 'beside', 'beneath', 'beyond'],
        correctAnswer: 1,
        explanation: '「〜のそばに」という位置は beside（s なし）。',
      },
      {
        id: 'q-bes-2',
        question: '空所に入る適切な語はどれですか。「( ) the cost, the plan has other problems.（コストに加えて、その計画には他の問題もある）」',
        options: ['Beside', 'Besides', 'Beneath', 'Beyond'],
        correctAnswer: 1,
        explanation: '「〜に加えて」という追加は besides（s あり）。',
      },
      {
        id: 'q-bes-3',
        question: 'beside と besides の見分け方として正しいものはどれですか。',
        options: [
          '位置なら besides、追加なら beside',
          '位置なら beside、追加なら besides',
          'どちらも「そばに」',
          'どちらも「加えて」',
        ],
        correctAnswer: 1,
        explanation: '位置（横に・そばに）は beside、追加（〜に加えて・その上）は besides。s で区別します。',
      },
      {
        id: 'q-bes-4',
        question: '空所に入る適切な語はどれですか。「I\'m too tired to go out. ( ), it\'s raining.（疲れて外出したくない。その上、雨も降っている）」',
        options: ['Beside', 'Besides', 'Aside', 'Beneath'],
        correctAnswer: 1,
        explanation: '「その上・さらに」という副詞は besides。文頭で理由を付け加える使い方です。',
      },
      {
        id: 'q-bes-5',
        question: 'besides の意味として当てはまらないものはどれですか。',
        options: ['〜に加えて', 'その上', '〜のほかに', '〜のそばに'],
        correctAnswer: 3,
        explanation: '「〜のそばに」（位置）は beside の意味です。besides は追加を表します。',
      },
    ],
  },
  {
    id: 'suitable-appropriate',
    title: 'suitable と appropriate',
    chapter: 2,
    description: 'どちらも「適切な」。suitable は「目的・用途に合う」、appropriate は「その場・社会的にふさわしい」。',
    content: `## どちらを使う？

訳はどちらも「適切な・ふさわしい」ですが、**何に対して適切か**の重心が違います。

- **suitable** … **目的・用途・条件に合っている**（fit for purpose）。実用的な適合。
- **appropriate** … **その場面・状況・社会的な礼儀にふさわしい**。文脈・場にかなう。

| 語 | 重心 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| suitable | 目的・用途 | （目的に）合った・ふさわしい | These shoes are **suitable** for hiking.（この靴はハイキングに向いている） |
| appropriate | 場面・礼儀 | （その場に）ふさわしい・妥当な | Jeans are not **appropriate** for a formal party.（ジーンズは正式なパーティーにふさわしくない） |

🎯 見分け方：「**目的にかなうか**（道具・条件）」なら suitable、「**その場・礼儀にかなうか**（服装・言動・状況）」なら appropriate。重なる場面も多いですが、社会的な“ふさわしさ”を問うなら appropriate が自然です。

📖 appropriate は動詞で「（資金などを）充てる・私物化する」の意味もあります（発音も変わる）。3級〜2級では形容詞の使い分けをまず押さえれば十分です。`,
    keyPoints: [
      'suitable＝目的・用途・条件に合う（fit for purpose）',
      'appropriate＝その場・状況・社会的礼儀にふさわしい',
      '道具・条件なら suitable、場・礼儀なら appropriate',
    ],
    quiz: [
      {
        id: 'q-suit-1',
        question: '空所に入る適切な語はどれですか。「This software is ( ) for beginners.（このソフトは初心者に向いている）」',
        options: ['appropriate', 'suitable', 'available', 'capable'],
        correctAnswer: 1,
        explanation: '目的・用途（初心者の使用）に合うという適合性なので suitable が自然です。',
      },
      {
        id: 'q-suit-2',
        question: '空所に入る適切な語はどれですか。「His joke was not ( ) for such a serious meeting.（彼の冗談はそんな真剣な会議にふさわしくなかった）」',
        options: ['suitable', 'appropriate', 'sensible', 'available'],
        correctAnswer: 1,
        explanation: 'その場・状況の礼儀にふさわしいかを問うので appropriate が自然です。',
      },
      {
        id: 'q-suit-3',
        question: 'suitable と appropriate の重心のちがいとして正しいものはどれですか。',
        options: [
          'suitable＝場・礼儀、appropriate＝目的・用途',
          'suitable＝目的・用途、appropriate＝場・状況・礼儀',
          'どちらも「目的に合う」だけ',
          'どちらも「礼儀にかなう」だけ',
        ],
        correctAnswer: 1,
        explanation: 'suitable は目的・用途への適合、appropriate は場面・社会的礼儀への適合に重心があります。',
      },
      {
        id: 'q-suit-4',
        question: '空所に入る適切な語はどれですか。「We are looking for a ( ) location for the new store.（新店舗に適した場所を探している）」',
        options: ['appropriate', 'suitable', 'sensitive', 'considerate'],
        correctAnswer: 1,
        explanation: '目的（出店）に条件が合うかという適合性なので suitable が自然です（appropriate も文脈次第で可ですが、用途適合は suitable が基本）。',
      },
      {
        id: 'q-suit-5',
        question: '「その場・礼儀にふさわしいか」を問うときに自然な語はどれですか。',
        options: ['suitable', 'appropriate', 'available', 'capable'],
        correctAnswer: 1,
        explanation: '社会的・文脈的なふさわしさを問うときは appropriate が自然です。',
      },
    ],
  },
  {
    id: 'profit-revenue',
    title: 'profit と revenue',
    chapter: 2,
    description: 'ビジネス頻出。revenue は「総収入・売上」、profit は「純利益（収入−経費）」。引き算の前か後か。',
    content: `## どちらを使う？

決算・財務の文章で頻出。**経費を引く前か後か**で区別します。

- **revenue** … 「**総収入・売上**」。入ってきたお金の合計（経費を引く**前**）。
- **profit** … 「**利益・純利益**」。売上から経費を引いた**残り**（経費を引いた**後**）。

| 語 | 位置 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| revenue | 引く前 | 総収入・売上 | The company's **revenue** rose to $10 million.（売上は1000万ドルに増えた） |
| profit | 引いた後 | 純利益 | After costs, the **profit** was small.（経費を引くと利益はわずかだった） |

🎯 関係：**profit ＝ revenue − 経費（cost）**。だから「売上は大きいのに利益は小さい」（high revenue, low profit）という文がよく出ます。

💡 フック：reve**nue** は「（まず）入ってくる（come back）お金の総額」、**profit** は最後に手元に残る「儲け」。順番は revenue →（経費を引く）→ profit。`,
    keyPoints: [
      'revenue＝総収入・売上（経費を引く前）',
      'profit＝純利益（売上から経費を引いた後）',
      'profit ＝ revenue − 経費',
    ],
    quiz: [
      {
        id: 'q-prof-1',
        question: '空所に入る適切な語はどれですか。「Total ( ) from ticket sales reached $2 million.（チケット売上の総収入は200万ドルに達した）」',
        options: ['profit', 'revenue', 'benefit', 'budget'],
        correctAnswer: 1,
        explanation: '「売上の総額（経費を引く前）」は revenue。',
      },
      {
        id: 'q-prof-2',
        question: '空所に入る適切な語はどれですか。「After paying all expenses, the ( ) was only $50,000.（全経費を払うと利益はわずか5万ドルだった）」',
        options: ['revenue', 'profit', 'income', 'turnover'],
        correctAnswer: 1,
        explanation: '「経費を引いた後の残り（純利益）」は profit。',
      },
      {
        id: 'q-prof-3',
        question: 'revenue と profit の関係として正しいものはどれですか。',
        options: [
          'revenue ＝ profit − 経費',
          'profit ＝ revenue − 経費',
          'profit と revenue は同じ',
          'revenue は経費を引いた後の額',
        ],
        correctAnswer: 1,
        explanation: 'profit（利益）＝ revenue（売上）− 経費。revenue は引く前、profit は引いた後です。',
      },
      {
        id: 'q-prof-4',
        question: '「売上は大きいのに利益は小さい」を表す組み合わせはどれですか。',
        options: [
          'low revenue, high profit',
          'high revenue, low profit',
          'high profit, low cost',
          'low revenue, low cost',
        ],
        correctAnswer: 1,
        explanation: '経費が大きいと、売上（revenue）が大きくても利益（profit）は小さくなります。high revenue, low profit です。',
      },
      {
        id: 'q-prof-5',
        question: 'revenue の意味として正しいものはどれですか。',
        options: ['経費を引いた後の利益', '総収入・売上', '借入金', '税金の還付'],
        correctAnswer: 1,
        explanation: 'revenue は経費を引く前の総収入・売上（turnover）です。',
      },
    ],
  },
  {
    id: 'propose-suggest',
    title: 'propose と suggest',
    chapter: 2,
    description: 'どちらも「提案する」。propose は直接的・正式、suggest は控えめ。語法 suggest doing / suggest that に注意。',
    content: `## どちらを使う？

訳は同じ「提案する」でも、**強さ**と**語法**が違います。

- **propose** … 改まって**はっきり提案する**（正式・直接的）。名詞は proposal。
- **suggest** … **控えめに提案・示唆する**。名詞は suggestion。

| 語 | 調子 | 中心の意味 | よく使う形 | 自作の例文 |
| --- | --- | --- | --- | --- |
| propose | 正式・直接 | （正式に）提案する | propose doing / propose that … | They **proposed** building a new bridge.（新しい橋の建設を提案した） |
| suggest | 控えめ | 提案・示唆する | suggest doing / suggest that … | I **suggest** taking a short break.（少し休憩することを提案します） |

⚠️ 語法の罠：**「suggest 人 to do」「propose 人 to do」は不可**。「私はあなたに〜するよう提案する」は <code>suggest that you (should) do</code> または <code>suggest doing</code> の形にします。「I suggest you to go」は誤りで、<code>I suggest that you go</code> が正しい形です。

🎯 試験では「suggest + 人 + to do」を選ばせる誤答が定番。**suggest / propose は to不定詞で人に指示する形をとらない**と覚えておきましょう。`,
    keyPoints: [
      'propose＝正式・直接的に提案、suggest＝控えめに提案・示唆',
      '語法：suggest doing / suggest that (should) V',
      '罠：「suggest 人 to do」は不可（that節か doing にする）',
    ],
    quiz: [
      {
        id: 'q-prop-1',
        question: '語法として正しい文はどれですか。',
        options: [
          'I suggest you to take a rest.',
          'I suggest that you take a rest.',
          'I suggest you taking a rest.',
          'I suggest to you take a rest.',
        ],
        correctAnswer: 1,
        explanation: 'suggest は「人 to do」をとりません。suggest that you (should) take … が正しい形です。',
      },
      {
        id: 'q-prop-2',
        question: '空所に入る適切な語はどれですか。「She ( ) meeting again next week.（来週もう一度会うことを提案した）」',
        options: ['proposed', 'hoped', 'wanted', 'refused'],
        correctAnswer: 0,
        explanation: 'propose doing の形で「（正式に）提案した」。suggest meeting でも可ですが、選択肢では proposed が適切です。',
      },
      {
        id: 'q-prop-3',
        question: 'propose と suggest の調子のちがいとして正しいものはどれですか。',
        options: [
          'propose の方が控えめ、suggest の方が直接的',
          'propose の方が正式・直接、suggest の方が控えめ',
          'どちらも命令的',
          '意味も語法も完全に同じ',
        ],
        correctAnswer: 1,
        explanation: 'propose は改まって直接的、suggest は控えめに示唆するニュアンスです。',
      },
      {
        id: 'q-prop-4',
        question: '「suggest 人 to do」が誤りである理由として正しいものはどれですか。',
        options: [
          'suggest は名詞だから',
          'suggest は「人＋to不定詞」の形をとらないから',
          'suggest は過去形がないから',
          'suggest は受け身にできないから',
        ],
        correctAnswer: 1,
        explanation: 'suggest は that節（that you should do）か doing をとり、「人 to do」の形はとりません。',
      },
      {
        id: 'q-prop-5',
        question: '空所に入る適切な形はどれですか。「The manager suggested ( ) the meeting.（部長は会議を延期することを提案した）」',
        options: ['to postpone', 'postpone', 'postponing', 'postponed'],
        correctAnswer: 2,
        explanation: 'suggest doing の形で suggested postponing。to不定詞は不可です。',
      },
    ],
  },
  {
    id: 'benefit-advantage',
    title: 'benefit と advantage',
    chapter: 2,
    description: 'どちらも「利点」。benefit は「（直接的な）恩恵」、advantage は「（他と比べた）優位」。',
    content: `## どちらを使う？

訳は「利点・メリット」で近いですが、**比較の視点があるか**で分けます。

- **benefit** … 「**恩恵・利益**」。それ自体がもたらす良いこと（一般的な得）。
- **advantage** … 「**優位・強み**」。**他と比べて**有利な点（比較の視点）。

| 語 | 視点 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| benefit | 直接の得 | 恩恵・利益 | Exercise has many health **benefits**.（運動には多くの健康上の恩恵がある） |
| advantage | 他との比較 | 優位・強み | Speaking two languages is a big **advantage** in business.（二か国語を話せるのはビジネスで大きな強みだ） |

🎯 見分け方：「**そのものが与える良いこと**」なら benefit、「**他より有利**（競争・比較）」なら advantage。take advantage of 〜（〜を利用する）という熟語も頻出です。`,
    keyPoints: [
      'benefit＝恩恵・利益（それ自体が与える良いこと）',
      'advantage＝優位・強み（他と比べて有利）',
      'take advantage of 〜（〜を利用する）も頻出',
    ],
    quiz: [
      {
        id: 'q-ben-1',
        question: '空所に入る適切な語はどれですか。「One ( ) of this job is free training.（この仕事の恩恵の一つは無料研修だ）」',
        options: ['advantage', 'benefit', 'profit', 'revenue'],
        correctAnswer: 1,
        explanation: 'それ自体が与える良いこと（恩恵）なので benefit が自然です。',
      },
      {
        id: 'q-ben-2',
        question: '空所に入る適切な語はどれですか。「Being tall is an ( ) in basketball.（背が高いことはバスケで有利だ）」',
        options: ['benefit', 'advantage', 'income', 'effect'],
        correctAnswer: 1,
        explanation: '他の選手と比べて有利という比較の視点なので advantage が自然です。',
      },
      {
        id: 'q-ben-3',
        question: 'benefit と advantage のちがいとして正しいものはどれですか。',
        options: [
          'benefit は他との比較、advantage は直接の得',
          'benefit は直接の恩恵、advantage は他と比べた優位',
          'どちらも「純利益」',
          'どちらも「総収入」',
        ],
        correctAnswer: 1,
        explanation: 'benefit はそのものが与える恩恵、advantage は他と比べた優位・強みに重心があります。',
      },
      {
        id: 'q-ben-4',
        question: '熟語 take advantage of 〜 の意味として正しいものはどれですか。',
        options: ['〜を恩恵にする', '〜を利用する・活用する', '〜を比較する', '〜を提案する'],
        correctAnswer: 1,
        explanation: 'take advantage of 〜 は「〜を（うまく）利用する・活用する」という頻出熟語です。',
      },
      {
        id: 'q-ben-5',
        question: '「他より有利な点（競争上の強み）」を表すのに自然な語はどれですか。',
        options: ['benefit', 'advantage', 'revenue', 'effect'],
        correctAnswer: 1,
        explanation: '比較・競争の視点で「優位・強み」を表すのは advantage です。',
      },
    ],
  },
  {
    id: 'say-tell-talk-speak',
    title: 'say・tell・talk・speak',
    chapter: 2,
    description: '「言う・話す」4兄弟。後ろにとる形（人を直接とるか、to が要るか）で見分けます。',
    content: `## どれを使う？

すべて「言う・話す」に関わりますが、**後ろにとる形（文型）**で使い分けます。意味より語法で覚えるのが近道です。

- **say** … **内容（ことば）**に焦点。say + ことば／say (that) …。相手は **say to 人**（say 人 は不可）。
- **tell** … **人に伝える**。**tell 人 + 内容**（tell me a story）／**tell 人 to do**。後ろに人を直接とる。
- **talk** … **自動詞**。会話する。**talk to / with 人**、**talk about 〜**。
- **speak** … （言語を）話す **speak English**／**speak to 人**（ややフォーマル・一方向的）。

| 語 | よくとる形 | 焦点 | 自作の例文 |
| --- | --- | --- | --- |
| say | say + ことば／say (that) … | 言った内容 | He **said** he was tired.（疲れたと言った） |
| tell | tell 人 + 内容／tell 人 to do | 人に情報を伝える | She **told** me the news.（私にその知らせを伝えた） |
| talk | talk to/with 人, talk about 〜 | 会話・やりとり | We **talked** about the plan.（計画について話した） |
| speak | speak 言語／speak to 人 | （主に）一方向に話す | Do you **speak** Japanese?（日本語を話せますか） |

🎯 罠の定番：**tell は後ろに人を直接とる（tell me）**が、**say は人を直接とらない（say me は不可、say to me）**。「彼は私に〜と言った」は <code>He told me …</code> か <code>He said to me …</code>。`,
    keyPoints: [
      'say＝内容に焦点（say to 人。say 人 は不可）',
      'tell＝人に伝える（tell 人 物／tell 人 to do）',
      'talk＝自動詞（talk to/with, talk about）',
      'speak＝言語を話す／speak to 人（ややフォーマル）',
    ],
    quiz: [
      {
        id: 'q-say-1',
        question: '空所に入る適切な語はどれですか。「She ( ) me an interesting story.（私に面白い話をしてくれた）」',
        options: ['said', 'told', 'talked', 'spoke'],
        correctAnswer: 1,
        explanation: '後ろに人（me）＋内容（story）を直接とるのは tell。say me とは言えません。',
      },
      {
        id: 'q-say-2',
        question: '空所に入る適切な語はどれですか。「He ( ) that he would be late.（遅れると言った）」',
        options: ['told', 'said', 'talked', 'spoke'],
        correctAnswer: 1,
        explanation: 'say (that) … で「言った内容」に焦点。that節をとり、人を直接とらない say が適切です。',
      },
      {
        id: 'q-say-3',
        question: '空所に入る適切な語はどれですか。「We ( ) about our holiday plans for an hour.（休暇の計画について1時間話した）」',
        options: ['said', 'told', 'talked', 'spoke about it to'],
        correctAnswer: 2,
        explanation: 'talk about 〜（自動詞）で「〜について話す・会話する」。',
      },
      {
        id: 'q-say-4',
        question: '空所に入る適切な語はどれですか。「Can you ( ) French?（フランス語を話せますか）」',
        options: ['say', 'tell', 'talk', 'speak'],
        correctAnswer: 3,
        explanation: '「（言語を）話す」は speak。speak + 言語 の形です。',
      },
      {
        id: 'q-say-5',
        question: 'say と tell の語法のちがいとして正しいものはどれですか。',
        options: [
          'say は後ろに人を直接とる、tell は人を直接とらない',
          'tell は後ろに人を直接とる（tell me）、say は人を直接とらない（say to me）',
          'どちらも自動詞',
          'どちらも言語名を目的語にする',
        ],
        correctAnswer: 1,
        explanation: 'tell は tell + 人（tell me）、say は人を直接とらず say to 人。ここが定番の罠です。',
      },
    ],
  },

  // ══════════════════════════════════════════════
  // 第3章 品詞・派生でまぎらわしい語
  // ══════════════════════════════════════════════
  {
    id: 'economic-economical',
    title: 'economic と economical',
    chapter: 3,
    description: '同じ語根で -ic か -ical か。economic は「経済の」、economical は「節約的・お得な」。',
    content: `## どちらを使う？

語根は同じでも、**-ic** と **-ical** で意味が分かれます。

- **economic** … 「**経済の・経済学の**」。国や社会の経済活動に関する。
- **economical** … 「**節約的・無駄がない・お得な**」。お金や資源を無駄にしない。

| 語 | 中心の意味 | 自作の例文 |
| --- | --- | --- |
| economic | 経済の・経済学の | The country faces **economic** problems.（その国は経済問題に直面している） |
| economical | 節約的・お得な | A small car is more **economical**.（小型車のほうが燃費が良い＝経済的だ） |

🎯 見分け方：**国・社会の「経済」**の話なら economic、**お金や資源を「節約」**する話なら economical。「-al が付くと“家計にやさしい（節約）”」と結びつけると覚えやすいです。`,
    keyPoints: [
      'economic＝経済の・経済学の（国・社会の経済）',
      'economical＝節約的・無駄がない・お得な',
      '-al が付くと「節約（家計にやさしい）」と覚える',
    ],
    quiz: [
      {
        id: 'q-eco-1',
        question: '空所に入る適切な語はどれですか。「The government announced a new ( ) policy.（政府は新しい経済政策を発表した）」',
        options: ['economical', 'economic', 'economically', 'economy'],
        correctAnswer: 1,
        explanation: '国の「経済」に関する政策なので economic。',
      },
      {
        id: 'q-eco-2',
        question: '空所に入る適切な語はどれですか。「This heater is very ( ); it saves electricity.（このヒーターはとても経済的で電気を節約できる）」',
        options: ['economic', 'economical', 'economics', 'economy'],
        correctAnswer: 1,
        explanation: '資源（電気）を無駄にしない「節約的」は economical。',
      },
      {
        id: 'q-eco-3',
        question: 'economic と economical の見分け方として正しいものはどれですか。',
        options: [
          'economic＝節約的、economical＝経済の',
          'economic＝経済の、economical＝節約的・お得な',
          'どちらも「経済学の」',
          'どちらも「節約的」',
        ],
        correctAnswer: 1,
        explanation: 'economic は国・社会の経済、economical は節約・お得さに関する語です。',
      },
      {
        id: 'q-eco-4',
        question: '空所に入る適切な語はどれですか。「The ( ) growth of the region was rapid.（その地域の経済成長は急速だった）」',
        options: ['economical', 'economic', 'economically', 'economize'],
        correctAnswer: 1,
        explanation: '「経済成長（economic growth）」は economic。社会・地域の経済の話です。',
      },
      {
        id: 'q-eco-5',
        question: '「燃費が良い・お金がかからない」を表すのに自然な語はどれですか。',
        options: ['economic', 'economical', 'economics', 'economy'],
        correctAnswer: 1,
        explanation: '無駄がなくお得という意味は economical です。',
      },
    ],
  },
  {
    id: 'historic-historical',
    title: 'historic と historical',
    chapter: 3,
    description: 'historic は「歴史に残るほど重要な」、historical は「歴史上の・過去の（重要かは問わない）」。',
    content: `## どちらを使う？

同じ「歴史」でも、**重要性を含むか**で分かれます。

- **historic** … 「**歴史に残るほど重要な**」。後世が記憶するような出来事・場所。
- **historical** … 「**歴史（上）の・過去の**」。過去に関するもの全般（重要かどうかは問わない）。

| 語 | 中心の意味 | 自作の例文 |
| --- | --- | --- |
| historic | 歴史に残る重要な | The signing was a **historic** moment.（その調印は歴史的瞬間だった） |
| historical | 歴史上の・過去の | She studies **historical** documents.（彼女は歴史資料を研究している） |

🎯 見分け方：「**重要で記憶に残る**」なら historic、「**ただ過去に関する**」なら historical。a historic event＝重大な出来事、a historical event＝（重要かは別として）過去の出来事、と使い分けます。`,
    keyPoints: [
      'historic＝歴史に残るほど重要な（記憶される出来事）',
      'historical＝歴史上の・過去の（重要かは問わない）',
      'a historic moment（重大）／ historical documents（過去の資料）',
    ],
    quiz: [
      {
        id: 'q-his-1',
        question: '空所に入る適切な語はどれですか。「The fall of the wall was a ( ) event.（壁の崩壊は歴史的な出来事だった＝重大）」',
        options: ['historical', 'historic', 'history', 'historically'],
        correctAnswer: 1,
        explanation: '「歴史に残るほど重要な」は historic。',
      },
      {
        id: 'q-his-2',
        question: '空所に入る適切な語はどれですか。「The museum keeps many ( ) records.（博物館は多くの歴史的記録を保管している）」',
        options: ['historic', 'historical', 'historically', 'historian'],
        correctAnswer: 1,
        explanation: '「過去に関する・歴史上の」記録は historical（重要性は問わない）。',
      },
      {
        id: 'q-his-3',
        question: 'historic と historical の見分け方として正しいものはどれですか。',
        options: [
          'historic＝過去一般、historical＝重要な',
          'historic＝歴史に残る重要な、historical＝過去に関する（重要かは別）',
          'どちらも「重要な」',
          'どちらも「過去の」だけ',
        ],
        correctAnswer: 1,
        explanation: 'historic は重要性を含み、historical は過去全般を指します。',
      },
      {
        id: 'q-his-4',
        question: '空所に入る適切な語はどれですか。「The novel is based on ( ) facts.（その小説は史実に基づいている）」',
        options: ['historic', 'historical', 'historically', 'historic event'],
        correctAnswer: 1,
        explanation: '「史実（過去の事実）」は historical facts。重要性ではなく過去に関する点が焦点です。',
      },
      {
        id: 'q-his-5',
        question: '「重大で記憶に残る出来事」を表すのに自然な語はどれですか。',
        options: ['historical', 'historic', 'historically', 'historian'],
        correctAnswer: 1,
        explanation: '記憶に残る重要な出来事は historic です。',
      },
    ],
  },
  {
    id: 'sensible-sensitive',
    title: 'sensible と sensitive',
    chapter: 3,
    description: 'sensible は「分別がある・賢明な」、sensitive は「敏感な・神経質な」。sense の使い方が逆。',
    content: `## どちらを使う？

どちらも sense（感覚・センス）の仲間ですが、**良識**か**過敏さ**かで正反対に近い意味になります。

- **sensible** … 「**分別がある・賢明な・実用的な**」。センスを働かせて賢く判断する。
- **sensitive** … 「**敏感な・感受性が強い・神経質な**」。刺激や感情に強く反応する。

| 語 | 中心の意味 | 自作の例文 |
| --- | --- | --- |
| sensible | 分別がある・賢明な | It was **sensible** to bring an umbrella.（傘を持ってきたのは賢明だった） |
| sensitive | 敏感な・神経質な | She is **sensitive** to criticism.（彼女は批判に敏感だ） |

🎯 見分け方：「**賢く判断する（良識）**」なら sensible、「**刺激・感情に過敏**」なら sensitive。sensitive skin（敏感肌）、sensitive issue（デリケートな問題）はすべて“過敏・繊細”の sensitive です。`,
    keyPoints: [
      'sensible＝分別がある・賢明な・実用的（良識）',
      'sensitive＝敏感な・感受性が強い・神経質',
      'sensitive skin（敏感肌）、sensitive issue（デリケートな問題）',
    ],
    quiz: [
      {
        id: 'q-sen-1',
        question: '空所に入る適切な語はどれですか。「That was a ( ) decision; you thought it through.（それは賢明な決定だった。よく考えたね）」',
        options: ['sensitive', 'sensible', 'sensational', 'senseless'],
        correctAnswer: 1,
        explanation: '「分別がある・賢明な」は sensible。',
      },
      {
        id: 'q-sen-2',
        question: '空所に入る適切な語はどれですか。「My eyes are ( ) to bright light.（私の目は強い光に敏感だ）」',
        options: ['sensible', 'sensitive', 'sensibly', 'sensation'],
        correctAnswer: 1,
        explanation: '刺激（光）に強く反応する「敏感な」は sensitive。',
      },
      {
        id: 'q-sen-3',
        question: 'sensible と sensitive の見分け方として正しいものはどれですか。',
        options: [
          'sensible＝敏感、sensitive＝賢明',
          'sensible＝分別がある・賢明、sensitive＝敏感・神経質',
          'どちらも「賢明な」',
          'どちらも「敏感な」',
        ],
        correctAnswer: 1,
        explanation: 'sensible は良識・賢明さ、sensitive は感情や刺激への過敏さを表します。',
      },
      {
        id: 'q-sen-4',
        question: '「敏感肌」を表す英語として正しいものはどれですか。',
        options: ['sensible skin', 'sensitive skin', 'sensational skin', 'senseless skin'],
        correctAnswer: 1,
        explanation: '刺激に過敏な肌は sensitive skin。sensible は「分別がある」で肌には使いません。',
      },
      {
        id: 'q-sen-5',
        question: '「よく考えた実用的・賢明な」という意味で自然な語はどれですか。',
        options: ['sensitive', 'sensible', 'sensational', 'sensory'],
        correctAnswer: 1,
        explanation: '良識をもって賢く判断するさまは sensible です。',
      },
    ],
  },
  {
    id: 'respectable-respectful-respective',
    title: 'respectable・respectful・respective',
    chapter: 3,
    description: 'respect の3兄弟。立派な（respectable）／敬意を払う（respectful）／それぞれの（respective）。',
    content: `## どれを使う？

同じ respect から派生した3語。**接尾辞**で意味がはっきり分かれます。

- **respectable** … 「**立派な・世間体の良い・尊敬に値する**」。
- **respectful** … 「**敬意を払う・礼儀正しい**」（full of respect）。
- **respective** … 「**それぞれの・各自の**」。

| 語 | 接尾辞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| respect**able** | -able（価値ある） | 立派な・世間体の良い | He has a **respectable** job.（彼は立派な職に就いている） |
| respect**ful** | -ful（満ちた） | 敬意を払う・礼儀正しい | Please be **respectful** to your elders.（年長者には敬意を払って） |
| respect**ive** | -ive（各自の） | それぞれの | They went back to their **respective** rooms.（各自の部屋に戻った） |

🎯 接尾辞で覚える：**-able＝価値がある（立派）**、**-ful＝（敬意で）満ちている（礼儀正しい）**、**-ive＝それぞれ**。副詞 **respectively** は「（順に）それぞれ」で、A and B は X and Y respectively（A は X、B は Y）のように対応させます。`,
    keyPoints: [
      'respectable＝立派な・世間体の良い（-able）',
      'respectful＝敬意を払う・礼儀正しい（-ful）',
      'respective＝それぞれの（-ive）／respectively＝順にそれぞれ',
    ],
    quiz: [
      {
        id: 'q-resp-1',
        question: '空所に入る適切な語はどれですか。「Students should be ( ) to their teachers.（生徒は先生に敬意を払うべきだ）」',
        options: ['respectable', 'respectful', 'respective', 'respected'],
        correctAnswer: 1,
        explanation: '「敬意を払う・礼儀正しい」は respectful（-ful）。',
      },
      {
        id: 'q-resp-2',
        question: '空所に入る適切な語はどれですか。「After the meeting, they returned to their ( ) offices.（会議後、各自のオフィスに戻った）」',
        options: ['respectful', 'respective', 'respectable', 'respectively'],
        correctAnswer: 1,
        explanation: '「それぞれの・各自の」は respective（-ive）。',
      },
      {
        id: 'q-resp-3',
        question: '空所に入る適切な語はどれですか。「She comes from a ( ) family.（彼女は立派な家庭の出だ）」',
        options: ['respectful', 'respective', 'respectable', 'respectively'],
        correctAnswer: 2,
        explanation: '「立派な・世間体の良い」は respectable（-able）。',
      },
      {
        id: 'q-resp-4',
        question: '接尾辞と意味の組み合わせとして正しいものはどれですか。',
        options: [
          '-able＝敬意を払う、-ful＝それぞれ、-ive＝立派な',
          '-able＝立派な、-ful＝敬意を払う、-ive＝それぞれ',
          'すべて「それぞれ」',
          'すべて「敬意を払う」',
        ],
        correctAnswer: 1,
        explanation: 'respectable（-able）＝立派、respectful（-ful）＝敬意を払う、respective（-ive）＝それぞれ。',
      },
      {
        id: 'q-resp-5',
        question: '「Tom and Mary are 20 and 22 years old ( ).（トムとメアリーはそれぞれ20歳と22歳だ）」空所に入る語はどれですか。',
        options: ['respective', 'respectively', 'respectful', 'respectable'],
        correctAnswer: 1,
        explanation: '「（順に）それぞれ」と複数を対応させる副詞は respectively です。',
      },
    ],
  },
  {
    id: 'industrial-industrious',
    title: 'industrial と industrious',
    chapter: 3,
    description: 'industrial は「工業の・産業の」（もの）、industrious は「勤勉な」（人）。-al か -ous か。',
    content: `## どちらを使う？

同じ industry（産業／勤勉）から派生。**もの（産業）**か**人（勤勉）**かで分かれます。

- **industrial** … 「**工業の・産業の**」。工場・製造・産業全体に関する。
- **industrious** … 「**勤勉な・よく働く**」。人の性質。

| 語 | 対象 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| industri**al** | もの・分野 | 工業の・産業の | This is an **industrial** area with many factories.（多くの工場がある工業地域だ） |
| industri**ous** | 人 | 勤勉な | She is an **industrious** student.（彼女は勤勉な学生だ） |

🎯 見分け方：**工場・産業**の話なら industrial、**人がよく働く**なら industrious。「-ous は人の性質を表すことが多い（famous, generous…）」と結びつけると、industrious＝勤勉（人）と覚えられます。`,
    keyPoints: [
      'industrial＝工業の・産業の（もの・分野）',
      'industrious＝勤勉な・よく働く（人）',
      '-ous は人の性質に多い → industrious＝勤勉',
    ],
    quiz: [
      {
        id: 'q-ind-1',
        question: '空所に入る適切な語はどれですか。「The city grew during the ( ) revolution.（その都市は産業革命の間に発展した）」',
        options: ['industrious', 'industrial', 'industry', 'industrially'],
        correctAnswer: 1,
        explanation: '「産業革命（the Industrial Revolution）」は industrial。産業・工業に関する語です。',
      },
      {
        id: 'q-ind-2',
        question: '空所に入る適切な語はどれですか。「Employers value ( ) workers.（雇い主は勤勉な労働者を高く評価する）」',
        options: ['industrial', 'industrious', 'industry', 'industrialized'],
        correctAnswer: 1,
        explanation: '人の性質「勤勉な」は industrious。',
      },
      {
        id: 'q-ind-3',
        question: 'industrial と industrious の見分け方として正しいものはどれですか。',
        options: [
          'industrial＝勤勉な（人）、industrious＝工業の',
          'industrial＝工業の・産業の（もの）、industrious＝勤勉な（人）',
          'どちらも「工業の」',
          'どちらも「勤勉な」',
        ],
        correctAnswer: 1,
        explanation: 'industrial は産業・工業（もの・分野）、industrious は人の勤勉さを表します。',
      },
      {
        id: 'q-ind-4',
        question: '空所に入る適切な語はどれですか。「The factory uses heavy ( ) machinery.（工場は大型の産業機械を使う）」',
        options: ['industrious', 'industrial', 'industriously', 'industry'],
        correctAnswer: 1,
        explanation: '「産業（用）機械」は industrial machinery。工業・産業に関する語です。',
      },
      {
        id: 'q-ind-5',
        question: '「人がよく働く・勤勉な」を表すのに自然な語はどれですか。',
        options: ['industrial', 'industrious', 'industrialized', 'industry'],
        correctAnswer: 1,
        explanation: '人の勤勉さは industrious です。',
      },
    ],
  },
  {
    id: 'considerable-considerate',
    title: 'considerable と considerate',
    chapter: 3,
    description: 'considerable は「かなりの（量・程度）」、considerate は「思いやりのある（人）」。-able か -ate か。',
    content: `## どちらを使う？

同じ consider から派生。**量・程度**か**人の態度**かで分かれます。

- **considerable** … 「**かなりの・相当の**」（大きさ・量・程度が無視できない）。
- **considerate** … 「**思いやりのある・配慮のある**」（人の態度）。

| 語 | 対象 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| consider**able** | 量・程度 | かなりの・相当の | The project took a **considerable** amount of time.（その計画はかなりの時間を要した） |
| consider**ate** | 人の態度 | 思いやりのある | It was **considerate** of you to call.（電話をくれて気が利くね） |

🎯 見分け方：**量・程度が大きい**なら considerable、**人が思いやりがある**なら considerate。consider**able**（-able＝無視できないほど大きい）と consider**ate**（人の態度）で区別。副詞 considerably は「かなり」、considerately は「思いやりをもって」。`,
    keyPoints: [
      'considerable＝かなりの・相当の（量・程度）',
      'considerate＝思いやりのある（人の態度）',
      'considerably＝かなり／considerately＝思いやりをもって',
    ],
    quiz: [
      {
        id: 'q-con-1',
        question: '空所に入る適切な語はどれですか。「The storm caused ( ) damage to the town.（嵐は町にかなりの被害を与えた）」',
        options: ['considerate', 'considerable', 'considering', 'considered'],
        correctAnswer: 1,
        explanation: '「かなりの・相当の（量・程度）」は considerable。',
      },
      {
        id: 'q-con-2',
        question: '空所に入る適切な語はどれですか。「He is always ( ) toward his neighbors.（彼はいつも近所の人に思いやりがある）」',
        options: ['considerable', 'considerate', 'considerably', 'consideration'],
        correctAnswer: 1,
        explanation: '人の態度「思いやりのある」は considerate。',
      },
      {
        id: 'q-con-3',
        question: 'considerable と considerate の見分け方として正しいものはどれですか。',
        options: [
          'considerable＝思いやりのある、considerate＝かなりの',
          'considerable＝かなりの（量・程度）、considerate＝思いやりのある（人）',
          'どちらも「かなりの」',
          'どちらも「思いやりのある」',
        ],
        correctAnswer: 1,
        explanation: 'considerable は量・程度の大きさ、considerate は人の思いやりを表します。',
      },
      {
        id: 'q-con-4',
        question: '空所に入る適切な語はどれですか。「She earns a ( ) salary.（彼女はかなりの給料を稼いでいる）」',
        options: ['considerate', 'considerable', 'considerately', 'considering'],
        correctAnswer: 1,
        explanation: '「かなりの（額）」は considerable。量・程度の大きさです。',
      },
      {
        id: 'q-con-5',
        question: '副詞 considerably の意味として正しいものはどれですか。',
        options: ['思いやりをもって', 'かなり・相当に', '考えながら', 'おそらく'],
        correctAnswer: 1,
        explanation: 'considerably は「かなり・相当に」。思いやりをもっては considerately です。',
      },
    ],
  },
  {
    id: 'effective-efficient',
    title: 'effective と efficient',
    chapter: 3,
    description: 'effective は「効果的（結果を出す）」、efficient は「効率的（無駄がない）」。結果か効率か。',
    content: `## どちらを使う？

訳が「効果的・効率的」で近いですが、**結果**を見るか**無駄のなさ**を見るかで分かれます。

- **effective** … 「**効果的・有効な**」。望む**結果を出す**。
- **efficient** … 「**効率的な**」。時間・資源を**無駄にしない**。

| 語 | 見るところ | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| effective | 結果が出るか | 効果的・有効な | This is an **effective** way to lose weight.（これは効果的な減量法だ） |
| efficient | 無駄がないか | 効率的な | The new system is more **efficient**; it saves time.（新システムは効率的で時間を節約する） |

🎯 見分け方：**「ちゃんと結果が出る」なら effective**（effect＝結果）、**「無駄なく速い」なら efficient**（efficiency＝効率）。効果はあるが非効率（effective but not efficient）ということもあり得ます。`,
    keyPoints: [
      'effective＝効果的・有効（望む結果を出す）',
      'efficient＝効率的（時間・資源を無駄にしない）',
      'effect＝結果→effective、efficiency＝効率→efficient',
    ],
    quiz: [
      {
        id: 'q-eff-1',
        question: '空所に入る適切な語はどれですか。「Aspirin is an ( ) painkiller.（アスピリンは効果的な鎮痛剤だ）」',
        options: ['efficient', 'effective', 'efficiently', 'effect'],
        correctAnswer: 1,
        explanation: '望む結果（痛みを抑える）を出すので effective。',
      },
      {
        id: 'q-eff-2',
        question: '空所に入る適切な語はどれですか。「The factory is very ( ); it wastes little energy.（その工場は効率的でエネルギーをほとんど無駄にしない）」',
        options: ['effective', 'efficient', 'effectively', 'effect'],
        correctAnswer: 1,
        explanation: '無駄がない（資源を節約）という効率なので efficient。',
      },
      {
        id: 'q-eff-3',
        question: 'effective と efficient の見分け方として正しいものはどれですか。',
        options: [
          'effective＝無駄がない、efficient＝結果を出す',
          'effective＝結果を出す（効果的）、efficient＝無駄がない（効率的）',
          'どちらも「効率的」',
          'どちらも「効果的」',
        ],
        correctAnswer: 1,
        explanation: 'effective は結果（effect）に、efficient は無駄のなさ（efficiency）に重心があります。',
      },
      {
        id: 'q-eff-4',
        question: '空所に入る適切な語はどれですか。「She is an ( ) manager who never wastes time.（彼女は時間を無駄にしない効率的な管理職だ）」',
        options: ['effective', 'efficient', 'effect', 'effectively'],
        correctAnswer: 1,
        explanation: '時間を無駄にしない＝効率的なので efficient。',
      },
      {
        id: 'q-eff-5',
        question: '「望む結果をちゃんと出す」という意味で自然な語はどれですか。',
        options: ['efficient', 'effective', 'efficiency', 'efficiently'],
        correctAnswer: 1,
        explanation: '結果を出す（効果がある）のは effective です。',
      },
    ],
  },
  {
    id: 'personal-personnel',
    title: 'personal と personnel',
    chapter: 3,
    description: 'personal は形容詞「個人の・私的な」、personnel は名詞「職員・人員・人事」。アクセント位置も違う。',
    content: `## どちらを使う？

スペルが近いですが、**品詞**も**アクセント**も違います。

- **personal** … 形容詞「**個人の・私的な**」。前にアクセント（**per**sonal）。
- **personnel** … 名詞「**職員・人員・人事（部）**」（集合的）。**後ろ**にアクセント（person**nel**）。

| 語 | 品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| **per**sonal | 形容詞 | 個人の・私的な | This is my **personal** opinion.（これは私個人の意見です） |
| person**nel** | 名詞 | 職員・人員・人事 | The company hired new **personnel**.（会社は新しい人員を雇った） |

🎯 見分け方：「**個人の・私的な**」という形容詞なら personal、「**従業員・人員（の集まり）**」という名詞なら personnel。personnel は語尾が **-nnel** で後ろにアクセント、と音とつづりをセットで覚えます。`,
    keyPoints: [
      'personal＝形容詞「個人の・私的な」（前にアクセント）',
      'personnel＝名詞「職員・人員・人事」（後ろにアクセント）',
      'personnel は集合名詞、語尾 -nnel',
    ],
    quiz: [
      {
        id: 'q-pers-1',
        question: '空所に入る適切な語はどれですか。「Please do not read my ( ) letters.（私の私的な手紙を読まないで）」',
        options: ['personnel', 'personal', 'personally', 'person'],
        correctAnswer: 1,
        explanation: '「個人の・私的な」という形容詞は personal。',
      },
      {
        id: 'q-pers-2',
        question: '空所に入る適切な語はどれですか。「All ( ) must wear an ID badge.（全職員はIDバッジを着用しなければならない）」',
        options: ['personal', 'personnel', 'personally', 'persons'],
        correctAnswer: 1,
        explanation: '「職員・人員（の集まり）」という名詞は personnel。',
      },
      {
        id: 'q-pers-3',
        question: 'personal と personnel の見分け方として正しいものはどれですか。',
        options: [
          'personal＝職員（名詞）、personnel＝個人の（形容詞）',
          'personal＝個人の（形容詞）、personnel＝職員・人員（名詞）',
          'どちらも形容詞',
          'どちらも名詞',
        ],
        correctAnswer: 1,
        explanation: 'personal は形容詞「個人の」、personnel は名詞「職員・人員」。品詞が違います。',
      },
      {
        id: 'q-pers-4',
        question: '空所に入る適切な語はどれですか。「Talk to the ( ) department about your contract.（契約のことは人事部に相談して）」',
        options: ['personal', 'personnel', 'personally', 'person'],
        correctAnswer: 1,
        explanation: '「人事（部）」は personnel department。personnel は人員・人事を表す名詞です。',
      },
      {
        id: 'q-pers-5',
        question: 'personnel の特徴として正しいものはどれですか。',
        options: [
          '形容詞で前にアクセント',
          '名詞（職員・人員）で後ろにアクセント',
          '動詞で「個人化する」',
          '副詞で「個人的に」',
        ],
        correctAnswer: 1,
        explanation: 'personnel は集合的な名詞「職員・人員」で、後ろの音節にアクセントがあります。',
      },
    ],
  },
  {
    id: 'complain-complaint',
    title: 'complain と complaint',
    chapter: 3,
    description: 'complain は動詞「苦情を言う」、complaint は名詞「苦情」。-t が付くと名詞、で見分けます。',
    content: `## どちらを使う？

スペルはほぼ同じ。語尾の **-t の有無**で**品詞**が変わります。

- **complain** … **動詞**「不平・苦情を言う」。complain about/to の形。
- **complaint** … **名詞**「苦情・不平」。make a complaint の形。

| 語 | 品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| complain | 動詞 | 苦情を言う | Customers **complain** about the noise.（客が騒音について苦情を言う） |
| complain**t** | 名詞 | 苦情・不平 | We received many **complaints**.（多くの苦情を受け取った） |

🎯 見分け方：**動作（〜する）**なら動詞 complain、**もの（〜という苦情）**なら名詞 complaint。語尾に **t が付くと名詞**（complaint）と覚えると、動詞・名詞の判定問題で迷いません。`,
    keyPoints: [
      'complain＝動詞「苦情を言う」（complain about/to）',
      'complaint＝名詞「苦情・不平」（make a complaint）',
      '語尾に t が付くと名詞（complaint）',
    ],
    quiz: [
      {
        id: 'q-compl-1',
        question: '空所に入る適切な語はどれですか。「Many people ( ) about the new rule.（多くの人が新しい規則に不満を言う）」',
        options: ['complaint', 'complain', 'complaints', 'complaining'],
        correctAnswer: 1,
        explanation: '主語のあとの動作（動詞）「苦情を言う」は complain。',
      },
      {
        id: 'q-compl-2',
        question: '空所に入る適切な語はどれですか。「She filed a formal ( ) with the company.（会社に正式な苦情を申し立てた）」',
        options: ['complain', 'complaint', 'complains', 'complained'],
        correctAnswer: 1,
        explanation: 'a formal ___ と冠詞・形容詞のあとなので名詞 complaint。',
      },
      {
        id: 'q-compl-3',
        question: 'complain と complaint の品詞の組み合わせとして正しいものはどれですか。',
        options: [
          'complain＝名詞、complaint＝動詞',
          'complain＝動詞、complaint＝名詞',
          'どちらも名詞',
          'どちらも動詞',
        ],
        correctAnswer: 1,
        explanation: 'complain は動詞「苦情を言う」、complaint は名詞「苦情」。t が付くと名詞です。',
      },
      {
        id: 'q-compl-4',
        question: '空所に入る適切な語はどれですか。「If you have a ( ), please tell the manager.（苦情があれば店長に伝えてください）」',
        options: ['complain', 'complaint', 'complaining', 'complained'],
        correctAnswer: 1,
        explanation: 'have a ___ と冠詞のあとなので名詞 complaint。',
      },
      {
        id: 'q-compl-5',
        question: '名詞だと見分けるための手がかりとして正しいものはどれですか。',
        options: ['語尾が -ing', '語尾に t が付く（complaint）', '語尾が -ed', '語頭が com-'],
        correctAnswer: 1,
        explanation: '語尾に t が付く complaint が名詞、t のない complain が動詞です。',
      },
    ],
  },
  {
    id: 'imaginative-imaginary-imaginable',
    title: 'imaginative・imaginary・imaginable',
    chapter: 3,
    description: 'imagine の3兄弟。想像力豊か（-ative）／架空の（-ary）／考えうる（-able）。接尾辞で区別。',
    content: `## どれを使う？

同じ imagine から派生した3語。**接尾辞**で意味がはっきり分かれます。

- **imaginative** … 「**想像力豊かな・創造的な**」（人・作品の性質）。
- **imaginary** … 「**実在しない・架空の・想像上の**」。
- **imaginable** … 「**想像できる限りの・考えうる**」。

| 語 | 接尾辞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| imagin**ative** | -ative（能力） | 想像力豊かな | She wrote an **imaginative** story.（彼女は想像力豊かな物語を書いた） |
| imagin**ary** | -ary（非実在） | 架空の・想像上の | The child has an **imaginary** friend.（その子には空想上の友達がいる） |
| imagin**able** | -able（可能） | 考えうる限りの | We tried every **imaginable** solution.（考えうる限りの解決策を試した） |

🎯 接尾辞で覚える：**-ative＝（想像する）能力がある（豊か）**、**-ary＝実在しない（架空）**、**-able＝（想像）できる**。`,
    keyPoints: [
      'imaginative＝想像力豊かな・創造的な（-ative）',
      'imaginary＝実在しない・架空の（-ary）',
      'imaginable＝考えうる限りの（-able）',
    ],
    quiz: [
      {
        id: 'q-imag-1',
        question: '空所に入る適切な語はどれですか。「Children often have ( ) friends.（子どもにはよく空想上の友達がいる）」',
        options: ['imaginative', 'imaginary', 'imaginable', 'imagined'],
        correctAnswer: 1,
        explanation: '「実在しない・架空の」は imaginary（-ary）。',
      },
      {
        id: 'q-imag-2',
        question: '空所に入る適切な語はどれですか。「He is a very ( ) designer, full of new ideas.（彼は新しい発想に満ちた創造的なデザイナーだ）」',
        options: ['imaginary', 'imaginative', 'imaginable', 'imagined'],
        correctAnswer: 1,
        explanation: '「想像力豊かな・創造的な」は imaginative（-ative）。',
      },
      {
        id: 'q-imag-3',
        question: '空所に入る適切な語はどれですか。「They offered help in every ( ) way.（考えうるあらゆる方法で助けてくれた）」',
        options: ['imaginative', 'imaginary', 'imaginable', 'imagining'],
        correctAnswer: 2,
        explanation: '「考えうる限りの」は imaginable（-able）。',
      },
      {
        id: 'q-imag-4',
        question: '接尾辞と意味の組み合わせとして正しいものはどれですか。',
        options: [
          '-ative＝架空、-ary＝想像力豊か、-able＝考えうる',
          '-ative＝想像力豊か、-ary＝架空、-able＝考えうる',
          'すべて「架空の」',
          'すべて「考えうる」',
        ],
        correctAnswer: 1,
        explanation: 'imaginative（-ative）＝想像力豊か、imaginary（-ary）＝架空、imaginable（-able）＝考えうる。',
      },
      {
        id: 'q-imag-5',
        question: '「実在しない・想像の中だけの」を表すのに自然な語はどれですか。',
        options: ['imaginative', 'imaginary', 'imaginable', 'imagining'],
        correctAnswer: 1,
        explanation: '実在しないものは imaginary です。',
      },
    ],
  },
  {
    id: 'literal-literary-literate',
    title: 'literal・literary・literate',
    chapter: 3,
    description: 'literal は「文字どおりの」、literary は「文学の」、literate は「読み書きできる」。',
    content: `## どれを使う？

すべて「文字（letter）」に由来しますが、意味は別物です。

- **literal** … 「**文字どおりの・逐語的な**」（比喩でなく言葉のとおり）。
- **literary** … 「**文学の・文芸の**」。
- **literate** … 「**読み書きができる・教養のある**」（人の能力）。

| 語 | 中心の意味 | 自作の例文 |
| --- | --- | --- |
| literal | 文字どおりの | The **literal** meaning differs from the joke.（文字どおりの意味は冗談とは違う） |
| literary | 文学の・文芸の | He won a **literary** prize.（彼は文学賞を取った） |
| literate | 読み書きできる | The program helps adults become **literate**.（その事業は大人が読み書きできるよう助ける） |

🎯 見分け方：**言葉のとおり**なら literal、**文学**なら literary、**読み書きできる（人）**なら literate。literate は literacy（識字）と結びつけて「読み書き能力」と覚えます。`,
    keyPoints: [
      'literal＝文字どおりの・逐語的な',
      'literary＝文学の・文芸の',
      'literate＝読み書きできる・教養のある（literacy）',
    ],
    quiz: [
      {
        id: 'q-lit-1',
        question: '空所に入る適切な語はどれですか。「Don\'t take my words in a ( ) sense; I was joking.（私の言葉を文字どおりに受け取らないで。冗談だよ）」',
        options: ['literary', 'literal', 'literate', 'literally'],
        correctAnswer: 1,
        explanation: '「文字どおりの・逐語的な」は literal。',
      },
      {
        id: 'q-lit-2',
        question: '空所に入る適切な語はどれですか。「Shakespeare made a huge ( ) contribution.（シェイクスピアは文学に大きく貢献した）」',
        options: ['literal', 'literary', 'literate', 'literally'],
        correctAnswer: 1,
        explanation: '「文学の・文芸の」は literary。',
      },
      {
        id: 'q-lit-3',
        question: '空所に入る適切な語はどれですか。「Most adults in the country are ( ).（その国のほとんどの大人は読み書きができる）」',
        options: ['literal', 'literary', 'literate', 'literarily'],
        correctAnswer: 2,
        explanation: '「読み書きができる」は literate（literacy の仲間）。',
      },
      {
        id: 'q-lit-4',
        question: 'literal・literary・literate の意味の組み合わせとして正しいものはどれですか。',
        options: [
          'literal＝文学の、literary＝読み書き、literate＝文字どおり',
          'literal＝文字どおり、literary＝文学の、literate＝読み書きできる',
          'すべて「文学の」',
          'すべて「文字どおり」',
        ],
        correctAnswer: 1,
        explanation: 'literal＝文字どおり、literary＝文学の、literate＝読み書きできる、です。',
      },
      {
        id: 'q-lit-5',
        question: '「読み書きができる（人）」を表すのに自然な語はどれですか。',
        options: ['literal', 'literary', 'literate', 'literally'],
        correctAnswer: 2,
        explanation: '人が読み書きできることは literate。識字 literacy と結びつきます。',
      },
    ],
  },
  {
    id: 'institution-instruction',
    title: 'institution と instruction',
    chapter: 3,
    description: 'スペルが似た別語。institution は「機関・制度」、instruction は「指示・説明・指導」。',
    content: `## どちらを使う？

つづりは似ていますが意味は別。**組織・制度**か**指示・教え**かで分けます。

- **institution** … 「**機関・組織・制度**」（学校・銀行・社会の慣習など）。
- **instruction** … 「**指示・説明・指導**」（やり方を教えること、説明書）。

| 語 | 中心の意味 | 自作の例文 |
| --- | --- | --- |
| institution | 機関・組織・制度 | A university is an educational **institution**.（大学は教育機関だ） |
| instruction | 指示・説明・指導 | Follow the **instructions** on the box.（箱の説明書に従って） |

🎯 見分け方：**組織・制度（established なもの）**なら institution、**やり方を教える・指示する**なら instruction。instruct（教える・指示する）の名詞が instruction、と動詞から結びつけると確実です。`,
    keyPoints: [
      'institution＝機関・組織・制度',
      'instruction＝指示・説明・指導（instruct の名詞）',
      'instructions＝（複数で）説明書・手順',
    ],
    quiz: [
      {
        id: 'q-inst-1',
        question: '空所に入る適切な語はどれですか。「The bank is a financial ( ).（銀行は金融機関だ）」',
        options: ['instruction', 'institution', 'instructor', 'instructive'],
        correctAnswer: 1,
        explanation: '「機関・組織」は institution。',
      },
      {
        id: 'q-inst-2',
        question: '空所に入る適切な語はどれですか。「Read the assembly ( ) carefully.（組み立て説明書をよく読んで）」',
        options: ['institution', 'instructions', 'institutions', 'instituted'],
        correctAnswer: 1,
        explanation: '「説明書・手順」は instructions。やり方を教えるものです。',
      },
      {
        id: 'q-inst-3',
        question: 'institution と instruction の見分け方として正しいものはどれですか。',
        options: [
          'institution＝指示、instruction＝機関',
          'institution＝機関・制度、instruction＝指示・説明',
          'どちらも「機関」',
          'どちらも「指示」',
        ],
        correctAnswer: 1,
        explanation: 'institution は組織・制度、instruction は指示・説明（instruct の名詞）です。',
      },
      {
        id: 'q-inst-4',
        question: '空所に入る適切な語はどれですか。「Marriage is a social ( ).（結婚は社会的な制度だ）」',
        options: ['instruction', 'institution', 'instructor', 'instructional'],
        correctAnswer: 1,
        explanation: '社会的な「制度」は institution です。',
      },
      {
        id: 'q-inst-5',
        question: 'instruction を動詞から確認する手がかりとして正しいものはどれですか。',
        options: [
          'institute（設立する）の名詞',
          'instruct（教える・指示する）の名詞',
          'instrument（道具）の仲間',
          'install（設置する）の名詞',
        ],
        correctAnswer: 1,
        explanation: 'instruction は instruct（教える・指示する）の名詞。institution は institute（設立する）の仲間です。',
      },
    ],
  },
  {
    id: 'permission-admission',
    title: 'permission と admission',
    chapter: 3,
    description: 'permission は「（行為の）許可」、admission は「入場・入学（の許可）／入場料／（罪の）認め」。',
    content: `## どちらを使う？

どちらも「許す」に関わりますが、**何を許すか**が違います。

- **permission** … 「**（行為をする）許可**」。〜してよいという許し。
- **admission** … 「**入場・入学（を認めること）／入場料／（事実・罪を）認めること**」。

| 語 | 中心の意味 | 自作の例文 |
| --- | --- | --- |
| permission | （行為の）許可 | You need **permission** to enter the lab.（実験室に入るには許可が必要だ） |
| admission | 入場・入学／入場料／認め | **Admission** to the museum is free.（博物館の入場は無料だ） |

🎯 見分け方：**「〜してよい」という行為の許し**なら permission、**入場・入学そのものや入場料、罪の自白**なら admission。admission は admit（入れる・認める）の名詞、permission は permit（許可する）の名詞、と動詞から確認できます。`,
    keyPoints: [
      'permission＝（行為をする）許可（permit の名詞）',
      'admission＝入場・入学／入場料／（罪・事実の）認め（admit の名詞）',
      '入場・入学・自白は admission、行為の許しは permission',
    ],
    quiz: [
      {
        id: 'q-perm-1',
        question: '空所に入る適切な語はどれですか。「Students need ( ) to leave early.（早退するには許可が必要だ）」',
        options: ['admission', 'permission', 'admittance', 'permit'],
        correctAnswer: 1,
        explanation: '「〜してよい（早退する）」という行為の許しは permission。',
      },
      {
        id: 'q-perm-2',
        question: '空所に入る適切な語はどれですか。「( ) to the concert costs $20.（コンサートの入場料は20ドルだ）」',
        options: ['Permission', 'Admission', 'Permit', 'Permitting'],
        correctAnswer: 1,
        explanation: '「入場（料）」は admission。permission は行為の許可です。',
      },
      {
        id: 'q-perm-3',
        question: 'permission と admission の見分け方として正しいものはどれですか。',
        options: [
          'permission＝入場、admission＝行為の許可',
          'permission＝行為の許可、admission＝入場・入学・認め',
          'どちらも「入場料」',
          'どちらも「行為の許可」',
        ],
        correctAnswer: 1,
        explanation: 'permission は行為の許し、admission は入場・入学や入場料、罪の自白などを表します。',
      },
      {
        id: 'q-perm-4',
        question: '空所に入る適切な語はどれですか。「Her ( ) of guilt surprised everyone.（彼女の罪の自白はみなを驚かせた）」',
        options: ['permission', 'admission', 'permit', 'permitting'],
        correctAnswer: 1,
        explanation: '「（罪・事実を）認めること」は admission（admit の名詞）です。',
      },
      {
        id: 'q-perm-5',
        question: 'admission を動詞から確認する手がかりとして正しいものはどれですか。',
        options: ['permit の名詞', 'admit（入れる・認める）の名詞', 'admire（賞賛する）の名詞', 'add（加える）の名詞'],
        correctAnswer: 1,
        explanation: 'admission は admit（入れる・認める）の名詞。permission は permit（許可する）の名詞です。',
      },
    ],
  },
  {
    id: 'agent-agency',
    title: 'agent と agency',
    chapter: 3,
    description: 'agent は「代理人・行為者（人）」、agency は「代理店・機関（組織）」。人か組織か。',
    content: `## どちらを使う？

同じ語根ですが、**人**か**組織**かで分かれます。

- **agent** … 「**代理人・取次人・行為者**」（人や主体）。
- **agency** … 「**代理店・機関・取次業**」（組織・仕組み）。

| 語 | 対象 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| agent | 人 | 代理人・行為者 | A travel **agent** booked our trip.（旅行代理人が旅行を手配した） |
| agency | 組織 | 代理店・機関 | She works at a travel **agency**.（彼女は旅行代理店で働いている） |

🎯 見分け方：**人（〜する人・代理人）**なら agent、**会社・機関（組織）**なら agency。「-cy が付くと組織・機関」と結びつけると整理できます（例：agen**cy**）。`,
    keyPoints: [
      'agent＝代理人・取次人・行為者（人）',
      'agency＝代理店・機関・取次業（組織）',
      '-cy が付くと組織・機関',
    ],
    quiz: [
      {
        id: 'q-agen-1',
        question: '空所に入る適切な語はどれですか。「Our real estate ( ) found us a house.（不動産業者が家を見つけてくれた＝人）」',
        options: ['agency', 'agent', 'agencies', 'agential'],
        correctAnswer: 1,
        explanation: '「代理人・取次人（人）」は agent。',
      },
      {
        id: 'q-agen-2',
        question: '空所に入る適切な語はどれですか。「He runs an advertising ( ).（彼は広告代理店を経営している＝組織）」',
        options: ['agent', 'agency', 'agents', 'agential'],
        correctAnswer: 1,
        explanation: '「代理店・機関（組織）」は agency。',
      },
      {
        id: 'q-agen-3',
        question: 'agent と agency の見分け方として正しいものはどれですか。',
        options: [
          'agent＝組織、agency＝人',
          'agent＝人（代理人）、agency＝組織（代理店・機関）',
          'どちらも「人」',
          'どちらも「組織」',
        ],
        correctAnswer: 1,
        explanation: 'agent は人（代理人・行為者）、agency は組織（代理店・機関）です。',
      },
      {
        id: 'q-agen-4',
        question: '空所に入る適切な語はどれですか。「The government ( ) regulates food safety.（その政府機関は食品安全を規制している）」',
        options: ['agent', 'agency', 'agents', 'agential'],
        correctAnswer: 1,
        explanation: '「政府機関（組織）」は agency。-cy が組織・機関の手がかりです。',
      },
      {
        id: 'q-agen-5',
        question: '「組織・機関」を表す手がかりとして正しいものはどれですか。',
        options: ['語尾 -ent（人）', '語尾 -cy（組織・機関）', '語尾 -ing', '語尾 -ed'],
        correctAnswer: 1,
        explanation: 'agen-cy のように -cy が付くと組織・機関を表すと覚えられます。',
      },
    ],
  },
  {
    id: 'related-relevant',
    title: 'related と relevant',
    chapter: 3,
    description: 'related は「（単に）関連した」、relevant は「（その話題に）関連があり重要・適切な」。',
    content: `## どちらを使う？

訳は「関連した」で近いですが、**重要性・適切さを含むか**で分かれます。

- **related** … 「**関連した・つながった**」（単につながりがある）。
- **relevant** … 「**（今の話題・状況に）関連があり、重要・適切な**」（文脈で意味を持つ）。

| 語 | 含み | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| related | 単なる関連 | 関連した・つながった | These two problems are **related**.（この2つの問題はつながっている） |
| relevant | 関連＋重要・適切 | （文脈に）適切で重要な | Please give only **relevant** information.（関連して重要な情報だけください） |

🎯 見分け方：**ただ「つながっている」**なら related、**「今の話に効いてくる・適切」**なら relevant。relevant は relevant **to** 〜（〜に関連して）の形が頻出です。`,
    keyPoints: [
      'related＝関連した・つながった（単なる関連）',
      'relevant＝文脈に関連があり重要・適切',
      'relevant to 〜（〜に関連して）の形が頻出',
    ],
    quiz: [
      {
        id: 'q-rel-1',
        question: '空所に入る適切な語はどれですか。「Is this question ( ) to the topic?（この質問は話題に関連して適切ですか）」',
        options: ['related', 'relevant', 'relating', 'relation'],
        correctAnswer: 1,
        explanation: '「（その話題に）関連があり適切」は relevant（relevant to 〜）。',
      },
      {
        id: 'q-rel-2',
        question: '空所に入る適切な語はどれですか。「Stress and sleep are closely ( ).（ストレスと睡眠は密接に関連している）」',
        options: ['relevant', 'related', 'relevance', 'relating to'],
        correctAnswer: 1,
        explanation: '単に「つながっている」という関連は related。',
      },
      {
        id: 'q-rel-3',
        question: 'related と relevant の見分け方として正しいものはどれですか。',
        options: [
          'related＝重要で適切、relevant＝単なる関連',
          'related＝単なる関連、relevant＝文脈で重要・適切',
          'どちらも「重要な」',
          'どちらも「無関係な」',
        ],
        correctAnswer: 1,
        explanation: 'related は単なるつながり、relevant は文脈における重要性・適切さを含みます。',
      },
      {
        id: 'q-rel-4',
        question: '空所に入る適切な語はどれですか。「The lawyer asked for all ( ) documents.（弁護士は関連して重要な書類すべてを求めた）」',
        options: ['related', 'relevant', 'relating', 'relation'],
        correctAnswer: 1,
        explanation: 'その件に効いてくる・重要という含みなら relevant が自然です。',
      },
      {
        id: 'q-rel-5',
        question: 'relevant がよくとる形はどれですか。',
        options: ['relevant from 〜', 'relevant to 〜', 'relevant of 〜', 'relevant with 〜'],
        correctAnswer: 1,
        explanation: 'relevant to 〜（〜に関連して）の形が頻出です。',
      },
    ],
  },
  {
    id: 'advice-advise',
    title: 'advice と advise',
    chapter: 3,
    description: 'advice は名詞「助言」、advise は動詞「助言する」。語尾 c か s かで品詞が変わる。',
    content: `## どちらを使う？

語尾の **c か s** で**品詞**が変わります（発音も少し違う）。

- **advice** … **名詞**「**助言・忠告**」（数えない名詞）。
- **advise** … **動詞**「**助言する・勧める**」。

| 語 | 品詞 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| advi**c**e | 名詞 | 助言・忠告 | She gave me good **advice**.（良い助言をくれた） |
| advi**s**e | 動詞 | 助言する・勧める | I **advise** you to rest.（休むことを勧めます） |

🎯 見分け方：**「〜という助言（もの）」**なら名詞 advice（c）、**「助言する（動作）」**なら動詞 advise（s）。同じパターンに **practice（名詞）/ practise（動詞）**、**device（名詞）/ devise（動詞）** があり、**c が名詞・s が動詞**と覚えられます。`,
    keyPoints: [
      'advice＝名詞「助言」（c、数えない名詞）',
      'advise＝動詞「助言する」（s）',
      'c が名詞・s が動詞（device/devise, practice/practise も同型）',
    ],
    quiz: [
      {
        id: 'q-adv-1',
        question: '空所に入る適切な語はどれですか。「Can you give me some ( )?（助言をもらえますか）」',
        options: ['advise', 'advice', 'advises', 'advising'],
        correctAnswer: 1,
        explanation: 'some ___（数えない名詞）「助言」は advice（c）。',
      },
      {
        id: 'q-adv-2',
        question: '空所に入る適切な語はどれですか。「Doctors ( ) patients to exercise.（医者は患者に運動を勧める）」',
        options: ['advice', 'advise', 'advices', 'adviced'],
        correctAnswer: 1,
        explanation: '主語のあとの動作（動詞）「助言する・勧める」は advise（s）。',
      },
      {
        id: 'q-adv-3',
        question: 'advice と advise の品詞の組み合わせとして正しいものはどれですか。',
        options: [
          'advice＝動詞、advise＝名詞',
          'advice＝名詞（助言）、advise＝動詞（助言する）',
          'どちらも名詞',
          'どちらも動詞',
        ],
        correctAnswer: 1,
        explanation: 'advice は名詞「助言」、advise は動詞「助言する」。c が名詞・s が動詞です。',
      },
      {
        id: 'q-adv-4',
        question: '同じ「c＝名詞／s＝動詞」のパターンに当てはまる組はどれですか。',
        options: ['big / bigger', 'device（名）/ devise（動）', 'go / went', 'happy / happily'],
        correctAnswer: 1,
        explanation: 'device（名詞・装置）/ devise（動詞・考案する）も c が名詞・s が動詞のパターンです。',
      },
      {
        id: 'q-adv-5',
        question: '空所に入る適切な語はどれですか。「My ( ) is to wait a few days.（私の助言は数日待つことです）」',
        options: ['advise', 'advice', 'advises', 'advising'],
        correctAnswer: 1,
        explanation: 'My ___ is …（主語の名詞）なので名詞 advice（c）です。',
      },
    ],
  },
  {
    id: 'adapt-adopt',
    title: 'adapt と adopt',
    chapter: 3,
    description: 'a か o か。adapt は「適応させる・改造する」、adopt は「採用する・養子にする」。',
    content: `## どちらを使う？

真ん中が **a か o** か。意味は別物です。

- **adapt** … 「**適応させる・合わせて変える・改造する**」（adjust）。
- **adopt** … 「**採用する・取り入れる・養子にする**」（take as one's own）。

| 語 | 中心の意味 | 自作の例文 |
| --- | --- | --- |
| ad**a**pt | 適応させる・改造する | Animals **adapt** to their environment.（動物は環境に適応する） |
| ad**o**pt | 採用する・養子にする | The company **adopted** a new policy.（会社は新しい方針を採用した） |

🎯 フック：ad**a**pt は **A**djust（調整・合わせる）の a、ad**o**pt は take as one's **O**wn（自分のものにする＝採用・養子）の o。「合わせて変える」か「そのまま取り入れる」かで区別します。`,
    keyPoints: [
      'adapt＝適応させる・合わせて変える・改造する（Adjust の a）',
      'adopt＝採用する・取り入れる・養子にする（Own の o）',
      '変えて合わせる adapt／そのまま取り入れる adopt',
    ],
    quiz: [
      {
        id: 'q-adapt-1',
        question: '空所に入る適切な語はどれですか。「It took time to ( ) to the new culture.（新しい文化に適応するのに時間がかかった）」',
        options: ['adopt', 'adapt', 'adept', 'adopted'],
        correctAnswer: 1,
        explanation: '「（環境などに）適応する・合わせる」は adapt（Adjust の a）。',
      },
      {
        id: 'q-adapt-2',
        question: '空所に入る適切な語はどれですか。「They decided to ( ) a child.（彼らは子どもを養子に迎えることにした）」',
        options: ['adapt', 'adopt', 'adept', 'adapted'],
        correctAnswer: 1,
        explanation: '「養子にする・取り入れる」は adopt（Own の o）。',
      },
      {
        id: 'q-adapt-3',
        question: 'adapt と adopt の見分け方として正しいものはどれですか。',
        options: [
          'adapt＝採用する、adopt＝適応させる',
          'adapt＝適応させる・改造する、adopt＝採用する・養子にする',
          'どちらも「適応させる」',
          'どちらも「採用する」',
        ],
        correctAnswer: 1,
        explanation: 'adapt は合わせて変える（適応・改造）、adopt はそのまま取り入れる（採用・養子）です。',
      },
      {
        id: 'q-adapt-4',
        question: '空所に入る適切な語はどれですか。「The novel was ( ) into a movie.（その小説は映画化＝脚色された）」',
        options: ['adopted', 'adapted', 'adept', 'adopting'],
        correctAnswer: 1,
        explanation: '「（別の形式に）作り変える・脚色する」は adapt。映画化は be adapted into a movie です。',
      },
      {
        id: 'q-adapt-5',
        question: 'フックの組み合わせとして正しいものはどれですか。',
        options: [
          'adapt＝Own の o、adopt＝Adjust の a',
          'adapt＝Adjust の a、adopt＝Own の o',
          'どちらも Adjust',
          'どちらも Own',
        ],
        correctAnswer: 1,
        explanation: 'adApt は Adjust（調整）の a、adOpt は take as one\'s Own（自分のものに）の o で覚えます。',
      },
    ],
  },

  // ══════════════════════════════════════════════
  // 第4章 発音が似ている語
  // ══════════════════════════════════════════════
  {
    id: 'breed-bleed',
    title: 'breed と bleed',
    chapter: 4,
    description: '/r/ と /l/ の違い。breed /briːd/「繁殖させる・品種」、bleed /bliːd/「出血する」。',
    content: `## 音のちがいで見分ける

日本語の「ブリード」に圧縮されがちですが、**/r/ と /l/** で別の語です。

- **breed** … /briːd/ 「**繁殖させる・育てる／品種**」。活用 breed-bred-bred。
- **bleed** … /bliːd/ 「**出血する**」。活用 bleed-bled-bled。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| b**r**eed | /briːd/ | 繁殖させる・品種 | They **breed** dogs on this farm.（この農場で犬を繁殖させている） |
| b**l**eed | /bliːd/ | 出血する | The cut on my finger started to **bleed**.（指の切り傷から血が出始めた） |

🎯 リスニングの要点：**/r/ は舌を口の中で丸める音、/l/ は舌先を上の歯ぐきにつける音**。breed（r）／bleed（l）。さらに過去形 bred（/bred/）と bread（パン /bred/）は同音なので、文脈で判断します。`,
    keyPoints: [
      'breed /briːd/＝繁殖させる・品種（breed-bred-bred）',
      'bleed /bliːd/＝出血する（bleed-bled-bled）',
      '/r/ は舌を丸める音、/l/ は舌先を歯ぐきにつける音',
    ],
    quiz: [
      {
        id: 'q-breed-1',
        question: '「出血する」という意味の語はどれですか。',
        options: ['breed', 'bleed', 'bread', 'broad'],
        correctAnswer: 1,
        explanation: 'bleed /bliːd/ が「出血する」。breed は「繁殖させる・品種」です。',
      },
      {
        id: 'q-breed-2',
        question: '空所に入る適切な語はどれですか。「This farm ( ) award-winning horses.（この農場は受賞馬を育てている）」',
        options: ['bleeds', 'breeds', 'breads', 'broods'],
        correctAnswer: 1,
        explanation: '「繁殖させる・育てる」は breed（/r/）。',
      },
      {
        id: 'q-breed-3',
        question: 'breed と bleed を分けている音の違いはどれですか。',
        options: ['母音 /iː/ と /e/', '子音 /r/ と /l/', '語尾 /d/ と /t/', 'アクセントの位置'],
        correctAnswer: 1,
        explanation: 'breed は /r/、bleed は /l/。子音 /r/-/l/ の対立です。',
      },
      {
        id: 'q-breed-4',
        question: 'bleed の過去形はどれですか。',
        options: ['bleeded', 'bled', 'bread', 'bled'],
        correctAnswer: 1,
        explanation: 'bleed-bled-bled。なお bred（breed の過去）と bread（パン）は別語です。',
      },
      {
        id: 'q-breed-5',
        question: '「品種・種類」の意味で使えるのはどちらですか。',
        options: ['bleed', 'breed', 'どちらも', 'どちらも不可'],
        correctAnswer: 1,
        explanation: 'breed には名詞「品種・種類」の意味があります（a breed of dog）。',
      },
    ],
  },
  {
    id: 'grow-glow',
    title: 'grow と glow',
    chapter: 4,
    description: '/r/ と /l/ の違い。grow /ɡroʊ/「成長する」、glow /ɡloʊ/「輝く・赤熱する」。',
    content: `## 音のちがいで見分ける

**/r/ と /l/** だけの違いです。

- **grow** … /ɡroʊ/ 「**成長する・育つ・増える**」。活用 grow-grew-grown。
- **glow** … /ɡloʊ/ 「**輝く・赤熱する／輝き**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| g**r**ow | /ɡroʊ/ | 成長する・増える | Plants **grow** in spring.（植物は春に育つ） |
| g**l**ow | /ɡloʊ/ | 輝く・赤熱する | The embers still **glow** in the dark.（残り火が暗闇でまだ赤く光る） |

🎯 リスニングの要点：g の直後が **/r/（grow）か /l/（glow）**か。意味は「育つ（grow）」と「光る（glow）」で全く別なので、文脈でも判別できます。`,
    keyPoints: [
      'grow /ɡroʊ/＝成長する・育つ・増える（grow-grew-grown）',
      'glow /ɡloʊ/＝輝く・赤熱する',
      'g の直後が /r/ か /l/ か',
    ],
    quiz: [
      {
        id: 'q-grow-1',
        question: '「（火や金属が）赤く光る・輝く」という意味の語はどれですか。',
        options: ['grow', 'glow', 'grew', 'gloom'],
        correctAnswer: 1,
        explanation: 'glow /ɡloʊ/ が「輝く・赤熱する」。grow は「成長する」です。',
      },
      {
        id: 'q-grow-2',
        question: '空所に入る適切な語はどれですか。「Children ( ) quickly.（子どもは早く成長する）」',
        options: ['glow', 'grow', 'glew', 'gloom'],
        correctAnswer: 1,
        explanation: '「成長する」は grow（/r/）。',
      },
      {
        id: 'q-grow-3',
        question: 'grow と glow を分けている音の違いはどれですか。',
        options: ['母音の違い', '子音 /r/ と /l/', '語尾の違い', 'アクセント'],
        correctAnswer: 1,
        explanation: 'grow は /r/、glow は /l/ の対立です。',
      },
      {
        id: 'q-grow-4',
        question: 'grow の過去形はどれですか。',
        options: ['growed', 'grew', 'grown', 'glew'],
        correctAnswer: 1,
        explanation: 'grow-grew-grown。過去形は grew です。',
      },
      {
        id: 'q-grow-5',
        question: '空所に入る適切な語はどれですか。「Her face began to ( ) with happiness.（彼女の顔は幸せで輝き始めた）」',
        options: ['grow', 'glow', 'grew', 'grown'],
        correctAnswer: 1,
        explanation: '「輝く」は glow。比喩的に「（感情で）顔が輝く」にも使います。',
      },
    ],
  },
  {
    id: 'flow-flaw',
    title: 'flow と flaw',
    chapter: 4,
    description: '母音 /oʊ/ と /ɔː/ の違い。flow /floʊ/「流れる」、flaw /flɔː/「欠点・きず」。',
    content: `## 音のちがいで見分ける

子音は同じ fl-。違うのは**母音 /oʊ/ と /ɔː/** です。

- **flow** … /floʊ/ 「**流れる／流れ**」。
- **flaw** … /flɔː/ 「**欠点・きず・不備**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| fl**ow** | /floʊ/ | 流れる・流れ | The river **flows** to the sea.（川は海へ流れる） |
| fl**aw** | /flɔː/ | 欠点・きず | The plan has a serious **flaw**.（その計画には重大な欠点がある） |

🎯 リスニングの要点：**/oʊ/ は「オウ」と口をすぼめる二重母音（flow）**、**/ɔː/ は「オー」と口を開く長母音（flaw）**。品質管理の文章で flaw（欠陥）は頻出です。`,
    keyPoints: [
      'flow /floʊ/＝流れる・流れ',
      'flaw /flɔː/＝欠点・きず・不備',
      '/oʊ/（オウ・二重母音）と /ɔː/（オー・長母音）の対立',
    ],
    quiz: [
      {
        id: 'q-flow-1',
        question: '「欠点・きず」という意味の語はどれですか。',
        options: ['flow', 'flaw', 'flew', 'flour'],
        correctAnswer: 1,
        explanation: 'flaw /flɔː/ が「欠点・きず」。flow は「流れる」です。',
      },
      {
        id: 'q-flow-2',
        question: '空所に入る適切な語はどれですか。「Traffic ( ) smoothly this morning.（今朝は交通がスムーズに流れた）」',
        options: ['flawed', 'flowed', 'flew', 'floured'],
        correctAnswer: 1,
        explanation: '「流れる」は flow（過去 flowed）。',
      },
      {
        id: 'q-flow-3',
        question: 'flow と flaw を分けている音の違いはどれですか。',
        options: ['子音 /f/ と /v/', '母音 /oʊ/ と /ɔː/', '語尾の子音', 'アクセント'],
        correctAnswer: 1,
        explanation: 'flow は /oʊ/、flaw は /ɔː/ の母音対立です。',
      },
      {
        id: 'q-flow-4',
        question: '空所に入る適切な語はどれですか。「Inspectors look for any ( ) in the product.（検査官は製品の欠陥を探す）」',
        options: ['flow', 'flaw', 'flew', 'flour'],
        correctAnswer: 1,
        explanation: '製品の「欠陥」は flaw。品質管理の文脈で頻出です。',
      },
      {
        id: 'q-flow-5',
        question: '/ɔː/（口を開く「オー」）の母音を持つのはどちらですか。',
        options: ['flow', 'flaw', 'どちらも', 'どちらも違う'],
        correctAnswer: 1,
        explanation: 'flaw が /flɔː/。flow は /floʊ/（二重母音）です。',
      },
    ],
  },
  {
    id: 'break-brake',
    title: 'break と brake',
    chapter: 4,
    description: '同音 /breɪk/。break「壊す・休憩」、brake「ブレーキ・制動する」。文脈とスペルで判断。',
    content: `## 音は同じ、意味で見分ける

**break と brake はまったく同じ発音 /breɪk/（同音異義語）**。耳では区別できないので、**文脈とスペル**で判断します。

- **break** … 「**壊す・割れる／休憩**」。活用 break-broke-broken。
- **brake** … 「**ブレーキ／制動する（速度を落とす）**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| break | /breɪk/ | 壊す・割れる／休憩 | Be careful not to **break** the glass.（グラスを割らないように） |
| brake | /breɪk/ | ブレーキ／制動する | He hit the **brake** to stop.（止まるためにブレーキを踏んだ） |

🎯 リスニングの要点：音は同じなので**意味と場面**で決める。**車・自転車の「止める／減速」なら brake**、それ以外の「壊す・休む」は break。スペルも brAKE（車）と breAK（壊す・休憩）で覚えます。`,
    keyPoints: [
      'break と brake は同音 /breɪk/',
      'break＝壊す・割れる／休憩（break-broke-broken）',
      'brake＝ブレーキ／制動する（車・自転車の減速）',
    ],
    quiz: [
      {
        id: 'q-break-1',
        question: '空所に入る適切な語はどれですか。「Step on the ( ) to slow down.（減速するにはブレーキを踏んで）」',
        options: ['break', 'brake', 'broke', 'broken'],
        correctAnswer: 1,
        explanation: '車・自転車の「ブレーキ／制動」は brake。',
      },
      {
        id: 'q-break-2',
        question: '空所に入る適切な語はどれですか。「Let\'s take a short ( ) and have some coffee.（少し休憩してコーヒーを飲もう）」',
        options: ['brake', 'break', 'braked', 'braking'],
        correctAnswer: 1,
        explanation: '「休憩」は break。break には「壊す」のほか「休憩」の意味があります。',
      },
      {
        id: 'q-break-3',
        question: 'break と brake の発音の関係として正しいものはどれですか。',
        options: [
          '母音が違う',
          'まったく同じ発音（同音異義語）',
          '子音が /r/ と /l/ で違う',
          'アクセントが違う',
        ],
        correctAnswer: 1,
        explanation: 'どちらも /breɪk/ で同音。耳では区別できず、意味・文脈で判断します。',
      },
      {
        id: 'q-break-4',
        question: 'break の過去形はどれですか。',
        options: ['breaked', 'broke', 'broken', 'braked'],
        correctAnswer: 1,
        explanation: 'break-broke-broken。brake は規則変化（braked）です。',
      },
      {
        id: 'q-break-5',
        question: '空所に入る適切な語はどれですか。「The brakes failed and the car couldn\'t ( ).（ブレーキが効かず車は止まれなかった）」',
        options: ['break', 'brake', 'broke', 'broken'],
        correctAnswer: 1,
        explanation: '「制動する・止まる（ブレーキをかける）」は動詞 brake。',
      },
    ],
  },
  {
    id: 'bear-bare',
    title: 'bear と bare',
    chapter: 4,
    description: '同音 /beə(r)/。bear「クマ／耐える・運ぶ」、bare「裸の・むき出しの」。文脈で判断。',
    content: `## 音は同じ、意味で見分ける

**bear と bare は同じ発音 /beə(r)/（同音異義語）**。意味と品詞で見分けます。

- **bear** … 名詞「**クマ**」／動詞「**耐える・我慢する／(重さを)支える・運ぶ／(子を)産む**」。活用 bear-bore-borne。
- **bare** … 形容詞「**裸の・むき出しの・最低限の**」／動詞「**さらす・むき出しにする**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| bear | /beə(r)/ | クマ／耐える・支える | I can't **bear** this heat.（この暑さには耐えられない） |
| bare | /beə(r)/ | 裸の・むき出しの | He walked on the **bare** floor.（彼はむき出しの床を歩いた） |

🎯 リスニングの要点：音は同じなので意味で判断。**「耐える・クマ」なら bear**、**「むき出し・何もない」なら bare**。bare hands（素手）、bare feet（裸足）はすべて bare です。`,
    keyPoints: [
      'bear と bare は同音 /beə(r)/',
      'bear＝クマ／耐える・支える・運ぶ（bear-bore-borne）',
      'bare＝裸の・むき出しの／さらす（bare hands＝素手）',
    ],
    quiz: [
      {
        id: 'q-bear-1',
        question: '空所に入る適切な語はどれですか。「She picked up the hot pan with her ( ) hands.（彼女は素手で熱い鍋を持った）」',
        options: ['bear', 'bare', 'bore', 'born'],
        correctAnswer: 1,
        explanation: '「素手」は bare hands。bare は「むき出しの」。',
      },
      {
        id: 'q-bear-2',
        question: '空所に入る適切な語はどれですか。「I can\'t ( ) to see him so sad.（彼がそんなに悲しむのを見るのは耐えられない）」',
        options: ['bare', 'bear', 'bared', 'baring'],
        correctAnswer: 1,
        explanation: '「耐える・我慢する」は bear。',
      },
      {
        id: 'q-bear-3',
        question: 'bear と bare の発音の関係として正しいものはどれですか。',
        options: [
          '子音が /b/ と /p/ で違う',
          'まったく同じ発音（同音異義語）',
          '母音 /iː/ と /e/ で違う',
          'アクセントが違う',
        ],
        correctAnswer: 1,
        explanation: 'どちらも /beə(r)/ で同音。意味・文脈で判断します。',
      },
      {
        id: 'q-bear-4',
        question: 'bear の意味として当てはまらないものはどれですか。',
        options: ['クマ', '耐える', '（重さを）支える', '裸の'],
        correctAnswer: 3,
        explanation: '「裸の・むき出しの」は bare の意味です。bear は名詞「クマ」、動詞「耐える・支える・産む」。',
      },
      {
        id: 'q-bear-5',
        question: '空所に入る適切な語はどれですか。「The trees were ( ) in winter.（冬、木々は葉を落として裸だった）」',
        options: ['bear', 'bare', 'bore', 'borne'],
        correctAnswer: 1,
        explanation: '「（葉などがなく）むき出しの・裸の」は bare です。',
      },
    ],
  },
  {
    id: 'ant-aunt',
    title: 'ant と aunt',
    chapter: 4,
    description: 'ant「アリ」、aunt「おば」。米発音では同音 /ænt/、英発音では aunt /ɑːnt/ と異なる。',
    content: `## 発音の地域差に注意

- **ant** … /ænt/ 「**アリ（昆虫）**」。
- **aunt** … 米 /ænt/（ant と同音）／英 /ɑːnt/（「アーント」と長め）「**おば**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| ant | /ænt/ | アリ | An **ant** carried a crumb.（アリがパンくずを運んだ） |
| aunt | 米 /ænt/・英 /ɑːnt/ | おば | My **aunt** lives in Osaka.（おばは大阪に住んでいる） |

🎯 リスニングの要点：**アメリカ英語では ant と aunt がほぼ同音**なので、文脈で判断します（昆虫の話か家族の話か）。**イギリス英語では aunt は /ɑːnt/「アーント」と母音が長く**、区別できます。`,
    keyPoints: [
      'ant /ænt/＝アリ',
      'aunt＝おば。米 /ænt/（ant と同音）／英 /ɑːnt/',
      '米では同音→文脈判断、英では母音の長さで区別',
    ],
    quiz: [
      {
        id: 'q-ant-1',
        question: '「おば」という意味の語はどれですか。',
        options: ['ant', 'aunt', 'uncle', 'and'],
        correctAnswer: 1,
        explanation: 'aunt が「おば」。ant は「アリ」です。',
      },
      {
        id: 'q-ant-2',
        question: 'アメリカ英語での ant と aunt の発音の関係として正しいものはどれですか。',
        options: [
          '母音の長さで明確に区別される',
          'ほぼ同音 /ænt/ で、文脈で判断する',
          '子音が違う',
          'アクセントが違う',
        ],
        correctAnswer: 1,
        explanation: 'アメリカ英語では多くの地域で ant も aunt も /ænt/ とほぼ同音です。',
      },
      {
        id: 'q-ant-3',
        question: 'イギリス英語で aunt はどう発音されますか。',
        options: ['/ænt/（ant と同じ）', '/ɑːnt/（アーントと長め）', '/eɪnt/', '/ʌnt/'],
        correctAnswer: 1,
        explanation: 'イギリス英語では aunt は /ɑːnt/ で、ant /ænt/ と母音が異なり区別できます。',
      },
      {
        id: 'q-ant-4',
        question: '空所に入る適切な語はどれですか。「An ( ) colony can have thousands of insects.（アリのコロニーには数千匹がいることがある）」',
        options: ['aunt', 'ant', 'and', 'aren\'t'],
        correctAnswer: 1,
        explanation: '昆虫の「アリ」は ant です。',
      },
      {
        id: 'q-ant-5',
        question: '米英で発音が分かれる理由として正しいものはどれですか。',
        options: [
          'aunt の母音が米 /æ/・英 /ɑː/ と異なるため',
          'ant のスペルが地域で違うため',
          'どちらも常に同音だから',
          'アクセント位置が違うため',
        ],
        correctAnswer: 0,
        explanation: 'aunt の母音が米では /æ/、英では /ɑː/ となるため、英では ant と区別されます。',
      },
    ],
  },
  {
    id: 'brush-blush',
    title: 'brush と blush',
    chapter: 4,
    description: '/r/ と /l/ の違い。brush /brʌʃ/「ブラシ・磨く」、blush /blʌʃ/「赤面する」。',
    content: `## 音のちがいで見分ける

**/r/ と /l/** だけの違いです。

- **brush** … /brʌʃ/ 「**ブラシ／（ブラシで）磨く・はく**」。
- **blush** … /blʌʃ/ 「**赤面する・顔が赤くなる**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| b**r**ush | /brʌʃ/ | ブラシ・磨く | **Brush** your teeth before bed.（寝る前に歯を磨いて） |
| b**l**ush | /blʌʃ/ | 赤面する | She **blushed** when he praised her.（褒められて彼女は顔を赤らめた） |

🎯 リスニングの要点：b の直後が **/r/（brush）か /l/（blush）**か。意味も「磨く」と「赤面する」で別なので、文脈でも判別できます。`,
    keyPoints: [
      'brush /brʌʃ/＝ブラシ・磨く',
      'blush /blʌʃ/＝赤面する',
      'b の直後が /r/ か /l/ か',
    ],
    quiz: [
      {
        id: 'q-brush-1',
        question: '「（恥ずかしさで）顔が赤くなる」という意味の語はどれですか。',
        options: ['brush', 'blush', 'brash', 'bless'],
        correctAnswer: 1,
        explanation: 'blush /blʌʃ/ が「赤面する」。brush は「ブラシ・磨く」です。',
      },
      {
        id: 'q-brush-2',
        question: '空所に入る適切な語はどれですか。「Don\'t forget to ( ) your hair.（髪をとかすのを忘れないで）」',
        options: ['blush', 'brush', 'brash', 'blash'],
        correctAnswer: 1,
        explanation: '「ブラシでとかす・磨く」は brush（/r/）。',
      },
      {
        id: 'q-brush-3',
        question: 'brush と blush を分けている音の違いはどれですか。',
        options: ['母音 /ʌ/ と /æ/', '子音 /r/ と /l/', '語尾 /ʃ/ と /s/', 'アクセント'],
        correctAnswer: 1,
        explanation: 'brush は /r/、blush は /l/ の対立です。',
      },
      {
        id: 'q-brush-4',
        question: '空所に入る適切な語はどれですか。「He felt his face ( ) with embarrassment.（彼は恥ずかしさで顔が赤くなるのを感じた）」',
        options: ['brush', 'blush', 'brash', 'bash'],
        correctAnswer: 1,
        explanation: '「赤面する」は blush です。',
      },
      {
        id: 'q-brush-5',
        question: '/l/ を含むのはどちらですか。',
        options: ['brush', 'blush', 'どちらも', 'どちらも違う'],
        correctAnswer: 1,
        explanation: 'blush が /blʌʃ/ で /l/ を含みます。brush は /r/ です。',
      },
    ],
  },
  {
    id: 'room-loom',
    title: 'room と loom',
    chapter: 4,
    description: '/r/ と /l/ の違い。room /ruːm/「部屋」、loom /luːm/「織機／ぬっと現れる・迫る」。',
    content: `## 音のちがいで見分ける

**/r/ と /l/** だけの違いです。

- **room** … /ruːm/ 「**部屋／空間・余地**」。
- **loom** … /luːm/ 名詞「**織機**」／動詞「**ぬっと現れる・（不安なものが）迫る**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| **r**oom | /ruːm/ | 部屋・余地 | There is no **room** for error.（誤りの余地はない） |
| **l**oom | /luːm/ | 織機／迫る | A deadline **looms** next week.（来週、締め切りが迫っている） |

🎯 リスニングの要点：語頭が **/r/（room）か /l/（loom）**か。loom は「（試験・締め切り・危機などが）迫る」という比喩でよく使われます。`,
    keyPoints: [
      'room /ruːm/＝部屋・空間・余地',
      'loom /luːm/＝織機／ぬっと現れる・迫る',
      '語頭が /r/ か /l/ か',
    ],
    quiz: [
      {
        id: 'q-room-1',
        question: '空所に入る適切な語はどれですか。「Exams ( ) at the end of the month.（試験が月末に迫っている）」',
        options: ['room', 'loom', 'bloom', 'gloom'],
        correctAnswer: 1,
        explanation: '「（不安なものが）迫る」は loom（/l/）。',
      },
      {
        id: 'q-room-2',
        question: '空所に入る適切な語はどれですか。「Is there enough ( ) for one more chair?（もう一脚いすを置く余地はある？）」',
        options: ['loom', 'room', 'broom', 'bloom'],
        correctAnswer: 1,
        explanation: '「空間・余地」は room（/r/）。',
      },
      {
        id: 'q-room-3',
        question: 'room と loom を分けている音の違いはどれですか。',
        options: ['母音 /uː/ と /ʊ/', '語頭の子音 /r/ と /l/', '語尾 /m/ と /n/', 'アクセント'],
        correctAnswer: 1,
        explanation: 'room は /r/、loom は /l/ の対立です。',
      },
      {
        id: 'q-room-4',
        question: 'loom（名詞）の意味として正しいものはどれですか。',
        options: ['部屋', '織機', 'ほうき', '花'],
        correctAnswer: 1,
        explanation: 'loom は名詞で「織機」、動詞で「ぬっと現れる・迫る」です。',
      },
      {
        id: 'q-room-5',
        question: '「危機・締め切りが迫る」という比喩で使えるのはどちらですか。',
        options: ['room', 'loom', 'どちらも', 'どちらも不可'],
        correctAnswer: 1,
        explanation: 'loom は「（不安なものが）迫る」という比喩でよく使われます。',
      },
    ],
  },
  {
    id: 'crash-crush-clash',
    title: 'crash・crush・clash',
    chapter: 4,
    description: '母音 /æ/ /ʌ/ と /r/ /l/ の複合。crash 衝突・墜落／crush 押しつぶす・夢中／clash 対立・衝突。',
    content: `## 音と意味のちがい

3語とも似た響きですが、**母音（/æ/ か /ʌ/）と子音（/r/ か /l/）**、そして意味が違います。

- **crash** … /kræʃ/ 「**激突・墜落／（システムが）クラッシュする**」。
- **crush** … /krʌʃ/ 「**押しつぶす**／（名詞）一時的な**夢中・片思い**」。
- **clash** … /klæʃ/ 「**対立する・ぶつかる／（予定などが）かち合う**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| c**r**a**sh** | /kræʃ/ | 激突・墜落 | The two cars **crashed** on the highway.（2台の車が高速で衝突した） |
| c**r**u**sh** | /krʌʃ/ | 押しつぶす／夢中 | Don't **crush** the box.（箱をつぶさないで） |
| c**l**a**sh** | /klæʃ/ | 対立・かち合う | Their opinions **clashed**.（彼らの意見は対立した） |

🎯 ポイント：**crash と clash は母音 /æ/「ア」**、**crush は母音 /ʌ/**。さらに crash/crush は **/r/**、clash は **/l/**。意味は「激突（crash）／押しつぶす・夢中（crush）／対立（clash）」と整理します。`,
    keyPoints: [
      'crash /kræʃ/＝激突・墜落・(システム)クラッシュ',
      'crush /krʌʃ/＝押しつぶす／（名詞）夢中・片思い',
      'clash /klæʃ/＝対立する・かち合う',
    ],
    quiz: [
      {
        id: 'q-crash-1',
        question: '空所に入る適切な語はどれですか。「The plane ( ) into the mountain.（飛行機が山に激突した）」',
        options: ['crushed', 'crashed', 'clashed', 'clasped'],
        correctAnswer: 1,
        explanation: '「激突・墜落」は crash（/kræʃ/）。',
      },
      {
        id: 'q-crash-2',
        question: '空所に入る適切な語はどれですか。「Heavy boxes ( ) the fragile items.（重い箱が壊れやすい品物を押しつぶした）」',
        options: ['crashed', 'crushed', 'clashed', 'clapped'],
        correctAnswer: 1,
        explanation: '「押しつぶす」は crush（/krʌʃ/）。',
      },
      {
        id: 'q-crash-3',
        question: '空所に入る適切な語はどれですか。「My meeting ( ) with my dentist appointment.（会議が歯医者の予約とかち合った）」',
        options: ['crashed', 'crushed', 'clashed', 'crushed'],
        correctAnswer: 2,
        explanation: '「（予定などが）かち合う・対立する」は clash（/klæʃ/）。',
      },
      {
        id: 'q-crash-4',
        question: 'crush だけが持つ母音はどれですか。',
        options: ['/æ/（crash, clash と同じ）', '/ʌ/', '/iː/', '/ɔː/'],
        correctAnswer: 1,
        explanation: 'crush は /ʌ/。crash と clash は /æ/ です。',
      },
      {
        id: 'q-crash-5',
        question: '名詞で「（一時的な）夢中・片思い」の意味があるのはどれですか。',
        options: ['crash', 'crush', 'clash', 'clap'],
        correctAnswer: 1,
        explanation: 'crush には名詞で「（短期的な）夢中・片思い」の意味があります（have a crush on 〜）。',
      },
    ],
  },
  {
    id: 'low-law',
    title: 'low と law',
    chapter: 4,
    description: '母音 /oʊ/ と /ɔː/ の違い。low /loʊ/「低い」、law /lɔː/「法・法律」。',
    content: `## 音のちがいで見分ける

子音は同じ l-。違うのは**母音 /oʊ/ と /ɔː/** です。

- **low** … /loʊ/ 「**低い・少ない**」。
- **law** … /lɔː/ 「**法・法律・法則**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| l**ow** | /loʊ/ | 低い・少ない | Prices are very **low** this month.（今月は価格がとても低い） |
| l**aw** | /lɔː/ | 法・法律 | Everyone must obey the **law**.（誰もが法に従わなければならない） |

🎯 リスニングの要点：**/oʊ/「オウ」（low）**と**/ɔː/「オー」（law）**の母音差。lawyer（弁護士）/lower（より低い）の聞き分けも同じ対立です。`,
    keyPoints: [
      'low /loʊ/＝低い・少ない',
      'law /lɔː/＝法・法律・法則',
      '/oʊ/（オウ）と /ɔː/（オー）の母音対立',
    ],
    quiz: [
      {
        id: 'q-low-1',
        question: '「法・法律」という意味の語はどれですか。',
        options: ['low', 'law', 'lawn', 'load'],
        correctAnswer: 1,
        explanation: 'law /lɔː/ が「法・法律」。low は「低い」です。',
      },
      {
        id: 'q-low-2',
        question: '空所に入る適切な語はどれですか。「The temperature is very ( ) today.（今日は気温がとても低い）」',
        options: ['law', 'low', 'lawn', 'law'],
        correctAnswer: 1,
        explanation: '「低い」は low（/loʊ/）。',
      },
      {
        id: 'q-low-3',
        question: 'low と law を分けている音の違いはどれですか。',
        options: ['子音 /l/ と /r/', '母音 /oʊ/ と /ɔː/', '語尾の子音', 'アクセント'],
        correctAnswer: 1,
        explanation: 'low は /oʊ/、law は /ɔː/ の母音対立です。',
      },
      {
        id: 'q-low-4',
        question: '空所に入る適切な語はどれですか。「She studies ( ) at university.（彼女は大学で法律を学んでいる）」',
        options: ['low', 'law', 'lower', 'loan'],
        correctAnswer: 1,
        explanation: '「法律」は law です。',
      },
      {
        id: 'q-low-5',
        question: '/ɔː/（口を開く「オー」）の母音を持つのはどちらですか。',
        options: ['low', 'law', 'どちらも', 'どちらも違う'],
        correctAnswer: 1,
        explanation: 'law が /lɔː/。low は /loʊ/（二重母音）です。',
      },
    ],
  },
  {
    id: 'raw-row',
    title: 'raw と row',
    chapter: 4,
    description: '母音 /ɔː/ と /oʊ/ の違い。raw /rɔː/「生の・未加工の」、row /roʊ/「列／（舟を）漕ぐ」。',
    content: `## 音のちがいで見分ける

子音は同じ r-。違うのは**母音 /ɔː/ と /oʊ/** です。

- **raw** … /rɔː/ 「**生の・未加工の・未経験の**」。
- **row** … /roʊ/ 「**（横の）列／（舟を）漕ぐ**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| r**aw** | /rɔː/ | 生の・未加工の | You shouldn't eat **raw** chicken.（生の鶏肉は食べないほうがいい） |
| r**ow** | /roʊ/ | 列／漕ぐ | We sat in the front **row**.（私たちは最前列に座った） |

🎯 リスニングの要点：**/ɔː/「オー」（raw）**と**/oʊ/「オウ」（row）**の母音差。raw data（生データ）、raw material（原料）は頻出です。📖 row には別発音 /raʊ/「ラウ」で「口論」の意味もあります。`,
    keyPoints: [
      'raw /rɔː/＝生の・未加工の・未経験の',
      'row /roʊ/＝（横の）列／（舟を）漕ぐ',
      '/ɔː/（オー）と /oʊ/（オウ）の母音対立',
    ],
    quiz: [
      {
        id: 'q-raw-1',
        question: '「生の・未加工の」という意味の語はどれですか。',
        options: ['row', 'raw', 'roar', 'raw'],
        correctAnswer: 1,
        explanation: 'raw /rɔː/ が「生の・未加工の」。row は「列／漕ぐ」です。',
      },
      {
        id: 'q-raw-2',
        question: '空所に入る適切な語はどれですか。「The students sat in a long ( ).（生徒たちは長い列に座った）」',
        options: ['raw', 'row', 'roar', 'raw'],
        correctAnswer: 1,
        explanation: '「（横の）列」は row（/roʊ/）。',
      },
      {
        id: 'q-raw-3',
        question: 'raw と row を分けている音の違いはどれですか。',
        options: ['子音 /r/ と /l/', '母音 /ɔː/ と /oʊ/', '語尾の子音', 'アクセント'],
        correctAnswer: 1,
        explanation: 'raw は /ɔː/、row は /oʊ/ の母音対立です。',
      },
      {
        id: 'q-raw-4',
        question: '空所に入る適切な語はどれですか。「This factory processes ( ) materials.（この工場は原料を加工する）」',
        options: ['row', 'raw', 'roar', 'raw'],
        correctAnswer: 1,
        explanation: '「原料（raw material）」は raw。未加工という意味です。',
      },
      {
        id: 'q-raw-5',
        question: '「（舟を）漕ぐ」の意味で使えるのはどちらですか。',
        options: ['raw', 'row', 'どちらも', 'どちらも不可'],
        correctAnswer: 1,
        explanation: 'row /roʊ/ には「（舟を）漕ぐ」の意味があります。',
      },
    ],
  },
  {
    id: 'cell-sell',
    title: 'cell と sell',
    chapter: 4,
    description: '同音 /sel/。cell「細胞・独房・電池・携帯」、sell「売る」。文脈とスペルで判断。',
    content: `## 音は同じ、意味で見分ける

**cell と sell は同じ発音 /sel/（同音異義語）**。意味と品詞で見分けます。

- **cell** … 名詞「**細胞・独房・電池・（cell phone で）携帯電話**」。
- **sell** … 動詞「**売る**」。活用 sell-sold-sold。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| cell | /sel/ | 細胞・独房・携帯 | The human body has many **cells**.（人体には多くの細胞がある） |
| sell | /sel/ | 売る | They **sell** fresh vegetables here.（ここでは新鮮な野菜を売っている） |

🎯 リスニングの要点：音は同じなので**品詞と意味**で判断。**「売る（動作・動詞）」なら sell**、**「細胞・独房・電池・携帯（もの・名詞）」なら cell**。`,
    keyPoints: [
      'cell と sell は同音 /sel/',
      'cell＝名詞（細胞・独房・電池・携帯）',
      'sell＝動詞「売る」（sell-sold-sold）',
    ],
    quiz: [
      {
        id: 'q-cell-1',
        question: '空所に入る適切な語はどれですか。「They ( ) handmade jewelry online.（彼らは手作りのアクセサリーをネットで売っている）」',
        options: ['cell', 'sell', 'cells', 'sold out'],
        correctAnswer: 1,
        explanation: '主語のあとの動作（動詞）「売る」は sell。',
      },
      {
        id: 'q-cell-2',
        question: '空所に入る適切な語はどれですか。「The prisoner was kept in a small ( ).（囚人は小さな独房に入れられた）」',
        options: ['sell', 'cell', 'sells', 'selling'],
        correctAnswer: 1,
        explanation: '「独房」は名詞 cell。cell には細胞・電池・携帯などの意味もあります。',
      },
      {
        id: 'q-cell-3',
        question: 'cell と sell の発音の関係として正しいものはどれですか。',
        options: [
          '母音が違う',
          'まったく同じ発音 /sel/（同音異義語）',
          '子音 /s/ と /ʃ/ で違う',
          'アクセントが違う',
        ],
        correctAnswer: 1,
        explanation: 'どちらも /sel/ で同音。品詞・意味・文脈で判断します。',
      },
      {
        id: 'q-cell-4',
        question: 'cell の意味として当てはまらないものはどれですか。',
        options: ['細胞', '独房', '電池', '売る'],
        correctAnswer: 3,
        explanation: '「売る」は sell（動詞）。cell は名詞で細胞・独房・電池・携帯などを表します。',
      },
      {
        id: 'q-cell-5',
        question: 'sell の過去形はどれですか。',
        options: ['selled', 'sold', 'sale', 'sells'],
        correctAnswer: 1,
        explanation: 'sell-sold-sold。過去形・過去分詞は sold です。',
      },
    ],
  },
  {
    id: 'claw-crow',
    title: 'claw と crow',
    chapter: 4,
    description: '/l/ /r/ と母音 /ɔː/ /oʊ/ の複合。claw /klɔː/「（動物の）爪」、crow /kroʊ/「カラス」。',
    content: `## 音のちがいで見分ける

子音（**/l/ か /r/**）と母音（**/ɔː/ か /oʊ/**）の両方が違います。

- **claw** … /klɔː/ 「**（動物の）かぎ爪・はさみ**」。
- **crow** … /kroʊ/ 「**カラス**」。

| 語 | 発音 | 中心の意味 | 自作の例文 |
| --- | --- | --- | --- |
| c**l****aw** | /klɔː/ | （動物の）爪 | The cat sharpened its **claws**.（猫は爪を研いだ） |
| c**r****ow** | /kroʊ/ | カラス | A **crow** landed on the fence.（カラスが柵に止まった） |

🎯 リスニングの要点：c の直後が **/l/（claw）か /r/（crow）**か、母音が **/ɔː/「オー」（claw）か /oʊ/「オウ」（crow）**か。生き物の描写問題（鳴き声・動作）でよく出ます。`,
    keyPoints: [
      'claw /klɔː/＝（動物の）かぎ爪・はさみ',
      'crow /kroʊ/＝カラス',
      'c の直後 /l/ vs /r/、母音 /ɔː/ vs /oʊ/',
    ],
    quiz: [
      {
        id: 'q-claw-1',
        question: '「カラス」という意味の語はどれですか。',
        options: ['claw', 'crow', 'clow', 'craw'],
        correctAnswer: 1,
        explanation: 'crow /kroʊ/ が「カラス」。claw は「（動物の）爪」です。',
      },
      {
        id: 'q-claw-2',
        question: '空所に入る適切な語はどれですか。「The eagle gripped the fish with its ( ).（ワシは爪で魚をつかんだ）」',
        options: ['crows', 'claws', 'crow', 'craw'],
        correctAnswer: 1,
        explanation: '「（動物の）かぎ爪」は claw（/l/, /ɔː/）。',
      },
      {
        id: 'q-claw-3',
        question: 'claw と crow を分けている音の違いはどれですか。',
        options: [
          '子音 /l/-/r/ と母音 /ɔː/-/oʊ/ の両方',
          'アクセントだけ',
          '語尾の子音だけ',
          '違いはない',
        ],
        correctAnswer: 0,
        explanation: 'claw（/klɔː/）と crow（/kroʊ/）は子音 /l/-/r/ と母音 /ɔː/-/oʊ/ の両方が違います。',
      },
      {
        id: 'q-claw-4',
        question: '/r/ を含むのはどちらですか。',
        options: ['claw', 'crow', 'どちらも', 'どちらも違う'],
        correctAnswer: 1,
        explanation: 'crow が /kroʊ/ で /r/ を含みます。claw は /l/ です。',
      },
      {
        id: 'q-claw-5',
        question: '空所に入る適切な語はどれですか。「The crab waved its big ( ).（カニは大きなはさみを振った）」',
        options: ['crow', 'claw', 'crew', 'craw'],
        correctAnswer: 1,
        explanation: '（カニの）はさみ・かぎ爪は claw です。',
      },
    ],
  },
];
