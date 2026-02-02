'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Target, Calendar, Users, MessageCircle, BookOpen, TrendingUp, Clock, User, Award, GraduationCap, Star, ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/lefy/section-header';
import { CTASection } from '@/components/lefy/cta-section';


// LEFYの塾生が通っている中高一貫校（カテゴリ別）
const ikkanSchoolsByCategory = {
  boys: [
    '浅野', '麻布', '鎌倉学園', '学習院', 'サレジオ学院',
    '芝', '逗子開成', '聖光学院', '高輪'
  ],
  girls: [
    '頌栄女子学院', '洗足学園', '田園調布学園', '田園調布雙葉',
    '東洋英和女学院', 'フェリス女学院', '横浜共立学園', '横浜女学院', '横浜雙葉'
  ],
  coed: [
    '青山学院中等部', '横浜市立南高附属', '神奈川大学附属', '関東学院',
    '慶應湘南藤沢(SFC)', '品川翔英', '湘南学園', '山手学院', '横国大附属横浜'
  ]
}

// 大学合格実績データ
const universityAchievements = [
  '慶應義塾大学 文学部',
  '立教大学 法学部',
  '東京都市大学 人間科学部（総合型選抜）',
  '日本大学 スポーツ科学部（総合型選抜）',
  '専修大学 文学部',
  '実践女子大学 文学部',
  '実践女子大学 生活科学部'
];

// 成績UP実績データ
interface SubjectScore {
  subject: string;
  before: {
    score: number;
    rank?: number;      // 順位（オプション）
    total?: number;     // 総人数（オプション）
    average?: number;   // 平均点（オプション）
  };
  after: {
    score: number;
    rank?: number;
    total?: number;
    average?: number;
  };
}

interface GradeImprovement {
  id: string;
  school: string;
  grade: string;
  subjects?: SubjectScore[];  // 複数科目対応（オプション）
  achievement?: string;       // 特別な成果（英検合格など）
  highlights?: string[];      // ハイライトポイント
  description: string;
}

const gradeImprovements: GradeImprovement[] = [
  {
    id: '1',
    school: '神奈川県内 中高一貫女子校',
    grade: '中3',
    subjects: [
      {
        subject: '英語',
        before: { score: 60, average: 60 },
        after: { score: 88, average: 60 }
      }
    ],
    description: '入塾前は学校の定期テストで平均点を取れるかどうかというラインだったが、入塾3ヵ月後の定期テストで平均点を20点以上上回った。受講科目の英語以外も積極的に質問し、総合成績も大幅UP。'
  },
  {
    id: '2',
    school: '都内 男子中高一貫校',
    grade: '中1',
    subjects: [
      {
        subject: '代数',
        before: { score: 55, rank: 150, total: 180 },
        after: { score: 75, rank: 40, total: 180 }
      },
      {
        subject: '幾何',
        before: { score: 50, rank: 100, total: 180 },
        after: { score: 80, rank: 35, total: 180 }
      }
    ],
    description: '代数と幾何を受講。LEFYの授業では、学校の授業でわからなかった箇所を丁寧に解説。さらに数学の勉強法を伝授し、自習室に通い、しっかりと指示通りに勉強した結果、約2ヶ月で数学の成績が急上昇。'
  },
  {
    id: '3',
    school: '都内 大学附属中高一貫校',
    grade: '高2',
    subjects: [
      {
        subject: '数学Ⅱ',
        before: { score: 30, average: 50 },
        after: { score: 80, average: 70 }
      },
      {
        subject: '化学',
        before: { score: 50, average: 75 },
        after: { score: 80, average: 70 }
      }
    ],
    description: 'LEFYでは数学と理科（化学メイン、物理は質問対応）を受講。入塾時の高2までの学習内容に不安があったため、必要に応じて過去範囲をフォロー。しっかりと学校の授業に合わせて復習し、サポート。入塾から約2ヵ月後のテストで平均点超えを達成。'
  },
  {
    id: '4',
    school: '神奈川県内 男子中高一貫校',
    grade: '高1〜',
    subjects: [
      {
        subject: '英語（高1）',
        before: { score: 75 },
        after: { score: 150 }
      }
    ],
    description: 'LEFYでは英語を受講し、定期テスト対策よりも、大学受験を意識した学習を進めた。もちろん定期テストの結果も徐々に伸びたが、大学受験を意識した指導により、1年後に模試の偏差値が急上昇。校内でもトップクラスの偏差値に。※難関中高一貫校生が受験する大手予備校模試の結果。'
  },
  {
    id: '5',
    school: '神奈川県内 共学中高一貫校',
    grade: '高1',
    subjects: [
      {
        subject: '英語',
        before: { score: 40, rank: 180, total: 215 },
        after: { score: 85, rank: 30, total: 215 }
      }
    ],
    description: 'LEFYでは英語を受講。大学受験に向けて特に重要な英語の文法事項の演習と解説を実施。また、学校の授業でわからなかった箇所を丁寧に解説。たった半年で校内順位が約150位アップ。'
  },
  {
    id: '6',
    school: '神奈川県内 中高一貫女子校',
    grade: '中2',
    subjects: [
      {
        subject: '古典',
        before: { score: 30, average: 60 },
        after: { score: 70, average: 60 }
      }
    ],
    description: '入塾1ヵ月後の定期テストで古典：30点⇒70点。さらに次の定期テストで古典は70点をキープ。理科が40点⇒70点。定期テストの勉強感覚を掴み、全体的に点数が安定してきた。'
  },
  {
    id: '7',
    school: '神奈川県内 大学附属中高一貫校',
    grade: '中2',
    achievement: '英検準2級に3ヵ月で合格！！',
    description: '部活動等で多忙のため、家庭学習の時間を確保できず、週1回のLEFYの授業がメイン。合格に必要なことにフォーカスし、3ヵ月で英検準2級に合格。'
  },
  {
    id: '8',
    school: '東京都内 共学中高一貫校',
    grade: '高3',
    achievement: '全国模試で偏差値79！文系で校内1位！',
    highlights: [
      '英語は30位⇒10位',
      '現代文30位⇒1位',
      '社会1位⇒1位'
    ],
    description: 'LEFYでは英語と現代文、古文を受講。レフィーに高2で入塾したが、焦らず、その時の学力に適切な教材と指導を行い、着実に成績がUP！'
  },
  {
    id: '9',
    school: '神奈川県内 男子中高一貫校',
    grade: '高3',
    achievement: '英検準1級に高3の4月に合格！',
    highlights: [
      '1次試験は高2の1月に合格済！'
    ],
    description: '高1からLEFYに通塾し、大学受験に向けて着実に英語力をつけてきたおかげで、12月からたった約1ヵ月の対策で1次試験に合格。その後、少しの対策で4月に2次試験も合格！主に英作文の添削・読解のコツ指導が中心。'
  },
  {
    id: '10',
    school: '都内 女子中高一貫校',
    grade: '中3',
    achievement: '英検2級に中3の1月に合格！',
    description: '11月から英検指導を開始。主に英作文の添削・スピーキング練習を行い、中3の1月に合格。'
  }
];

// 合格者の声データ
interface Testimonial {
  id: string;
  studentName: string;
  school: string;
  grade: string;
  studentVoice: string;
  parentVoice: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'km',
    studentName: 'K.M.君',
    school: '慶應義塾大学 文学部 合格（一般選抜）',
    grade: 'サレジオ学院高等学校',
    studentVoice: `私は高校1年生の秋にLEFYに入塾しました。2年以上LEFYに通い続け、第一志望の大学に合格することができました。

入塾した当初は大学受験への意識がなく、自分で自主的な勉強ができなかった私にとってLEFYは最高の環境でした。学校での私の状況や定期テストの結果から、自分にあった勉強方針を示してくれたため、それに従って勉強に専念することができました。

高1、高2の英語の授業では、品詞分解から文法、長文読解まで幅広く指導していただき、授業以外でも自習の時に長時間にわたり質問に答えてくださり、受験への土台を固めていくことができました。

高3になってからは大学の過去問を解きはじめました。最初は、時間以内に解き終わることができず、難関私大の英語の壁にぶち当たりました。そこで、先生からとにかく英語の長文を読むよう勧められ、6月頃から1日1個、必ず英語長文を読むようにしました。すると、夏休み明けには英語の長文を英語のまま読めるようになり、過去問を時間以内に解き終わる回数も増えていきました。

また、LEFYには成績アップだけでなく、精神的な部分でもお世話になりました。高3になると、本格的に受験モードになり、たくさんの模試を受けるようになりましたが、模試の結果がうまくいかないことが多々ありました。そんな時に、先生が励ましの言葉をかけてくれ、模試の分析を冷静に行ってくれたため、毎回気持ちを落とさず勉強を続けることができました。受験期間中も上手くいかないことがありましたが、LEFYに顔を出し、先生と話したことによって気持ちをリフレッシュすることができました。

志望校に合格できたのは、ひとえにLEFYのおかげです。
本当にLEFYの先生方には感謝しかないです。ありがとうございました。`,
    parentVoice: `息子は入塾してから2年半、大手塾には通わずに最後までLEFYだけにお世話になり志望校に合格することができました。LEFYは授業の質の高さの他に、分析力と提案力が素晴らしいと感じました。

定期テストや模試の結果も息子は必ず先生と共有して解き直しと分析を徹底したので、私は関与しなくなりました。

また、昨今の複雑な大学入試制度も先生は最新の情報を把握して、私どもの意見を踏まえてベストな受験方法を提案してくださいました。親がストレスを抱えそうな部分をプロにお願いすることで、息子とずっと良好な関係でいられたのもありがたかったです。

最後までLEFYを信じて結果を出せました。先生方、スタッフの皆様には感謝の気持ちでいっぱいです。
ありがとうございました。`
  },
  {
    id: 'mk2',
    studentName: 'M.K.さん',
    school: '東京都市大学 人間科学部 合格（総合型選抜）',
    grade: '横浜女学院高等学校',
    studentVoice: `高校2年生の秋にLEFYに入塾しました。
当初は一般受験や推薦を目指していたため、英語を受講していましたが、途中から総合型選抜を受けることに決め、総合型選抜の授業を受けました。

LEFYの先生方は、私の興味のある分野について一緒に考えてくださり、様々な大学の学部や授業内容まで丁寧に調べてくださいました。
その過程で、自分が本当に学びたいことが明確になり、行きたい大学を見つけることができました。

特に印象に残っているのは、志望理由書です。
「なぜその大学で学びたいのか」という本質的なところから、具体的な書き方まで、何度も丁寧に添削していただき、納得のいく良いものを作ることができました。
また小論文指導では、基礎的な書き方から始まり、徐々にレベルアップしていく過程で、自分の考えを論理的に表現する力が身についていきました。

先生方は私の苦手なところを細かく分析し、それに応じた対策を立ててくれました。

レフィーの前にも個別指導塾に通いましたが、レフィーはその中でもかなり面倒見が良く、授業以外でも気軽に相談できる環境があったことは、精神的な支えになりました。`,
    parentVoice: `娘が高校2年生の9月から入塾しました。

それまでにも個別指導の塾をいくつか経験していましたが、レフィーのマンツーマン指導は大変面倒見がよく、本当に通って良かったと思っています。

入塾当初、娘にはまだ受験生としての自覚が薄く、かなり心配していましたが、レフィーでは娘の性格などを見ながら、受講している各教科で最適な先生をつけてくれました。

また、先生方との距離が近く、娘が気軽に相談しやすいようで、進路相談から精神面のケアまで、親身になってサポートしてくださいました。

先生方のご指導のお陰で合格をいただくことができました。
大変お世話になりました。`
  }
];

// 悩みチェックリスト
// お悩みデータ（中高一貫校生向け）
const concerns = [
  {
    image: '/concern-ikkan-1.jpg',
    title: '中高一貫校の学習進度についていけない',
    highlightText: '中高一貫校の学習進度についていけない',
    description: '中高一貫校は公立中高より早い学習進度。一度つまずくと立て直しが難しい。定期テストの成績が低迷している。',
  },
  {
    image: '/concern-ikkan-2.png',
    title: '中高一貫校特有のテキストで苦戦',
    highlightText: '中高一貫校特有のテキストで苦戦',
    description: '体系数学、4STEP、フォーカスゴールド、NEWTREASURE、プログレスなど、中高一貫校特有のテキストは難しい。適切な勉強方法がわからない。',
  },
  {
    image: '/concern-ikkan-3.jpg',
    title: '中高一貫校生の大学受験での戦い方がわからない',
    highlightText: '大学受験での戦い方がわからない',
    description: '中高一貫校は学校の勉強もハードであり、集団塾や予備校との両立が難しい。無駄に塾に通って空回りしてしまいそうで、大学受験に向けてなにをしたらいいかわからない。',
  },
];

// 3つの価値提案
const values = [
  {
    icon: Target,
    title: 'やることを絞る',
    subtitle: '優先順位づけ',
    points: [
      '宿題を「やる/やらない」で整理',
      '直しの粒度（どこまでやるか）を決める',
      '"今週の最優先"を1枚にまとめる',
    ],
  },
  {
    icon: Calendar,
    title: '週を回す形にする',
    subtitle: '家庭学習の設計',
    points: [
      '週のどこで何をどれくらい（量/時間）',
      'テスト直しを「原因→次週の打ち手」に変換',
      '崩れた週のリカバリ手順を用意',
    ],
  },
  {
    icon: TrendingUp,
    title: '原因を特定して直す',
    subtitle: '1対1の修正',
    points: [
      '手元と考え方を見てズレを特定',
      '"再現できる手順"に落とす',
      '初見問題でも崩れにくくする',
    ],
  },
];

// 講師層カード
const teacherTypes = [
  {
    title: 'プロ講師',
    description: '中学受験指導の経験を重ねた講師が担当',
  },
  {
    title: '最難関中高一貫卒',
    description: '受験を"やり切った経験"を授業に活かす',
  },
  {
    title: '東大など最難関大の学生/院生',
    description: '学習設計と伴走が得意な講師が中心',
  },
];

// 無料相談ステップ
const consultationSteps = [
  { number: 1, title: '現状診断', description: 'テスト/ノート/学習時間' },
  { number: 2, title: '優先順位づけ', description: 'やる/やらない' },
  { number: 3, title: '週の回し方設計', description: '宿題/直し' },
  { number: 4, title: '穴補強の着手', description: '必要範囲だけ' },
];

// FAQ
const faqs = [
  {
    q: 'どのような先生が担当してくれるのですか？',
    a: 'LEFYには、指導歴の長いプロ講師から、大学生講師まで幅広い講師が在籍しています。「年齢の高い先生は子供に合わないのかな…」「大学生で大丈夫？」と不安になられる親御様もいらっしゃいますが、LEFYのほとんどの塾生が楽しんで授業に取り組んでいますのでご安心ください。\n\n成績を伸ばすためには、塾生が授業を楽しみ、高いモチベーションで日々の勉強に取り組むことが最も重要です。これを最優先に意識し、最適な講師を手配します。\n\nまた、LEFYの講師採用ハードルは非常に高く、厳選された講師だけが在籍しています。プロ講師には、素晴らしい社会人経験と指導経験をもった講師、有名校の元講師が在籍しています。また、学生講師は東大～早慶以上の難関大生、そして難関中高出身者ばかりです。研修中、また実際に授業を担当後もフィードバックを行い、指導レベル向上に取り組んでいますので、ご安心ください。',
  },
  {
    q: '最難関校を目指すような生徒さんだけが対象でしょうか？',
    a: '様々な志望校を掲げる生徒が在籍しています。一人ひとりの目標、現在の学力レベル、課題などに応じた指導を行いますのでご安心ください。',
  },
  {
    q: '同じ先生に担当いただけるのですか？',
    a: 'LEFYでは、専属アドバイザーと専属講師の2名以上担当制を取っており、同じアドバイザーと専属講師が担当します。やむを得ず専属アドバイザーや専属講師が変更となる場合もありますが、多くの場合は専属アドバイザーもしくは専属講師のどちらかは継続となりますので、ご安心ください。塾生の性格や勉強の習熟状況等を新しい担当者に細かく伝達します。',
  },
  {
    q: '先生を変えることはできますか？',
    a: 'もし講師との相性が合わないと感じた場合や、指導内容に満足いただけない場合にはお申し付けください。別の講師をご案内いたします。',
  },
  {
    q: '自習室を利用することはできますか？',
    a: '空いている自習ブースを利用することができます。以下の時間帯で利用可能です。\n平日（月～金）13時～21時\n休日（土日）：13時～19時\n※ただし、休講日・休館日は終日ご利用になれません。休講日・休館日はLEFY所定の授業カレンダーに記載がございますので、ご面談の際にご案内いたします。',
  },
  {
    q: '土日や祝祭日も授業がありますか？',
    a: 'LEFYの通常授業は、土日も含め、曜日に関係なく受講可能です。所定の授業カレンダーで指定のとおり授業を行っていますので、詳細はご面談時にご案内いたします。',
  },
  {
    q: '振替はできますか？',
    a: '基本的には前日の18時までにご連絡いただければ振替可能です。',
  },
  {
    q: '春期・夏期・冬期講習は必須ですか？',
    a: '必須ではございません。春期・夏期・冬期講習よりも前の時期に、それまでの学習状況や目標を踏まえ、集中学習により効果が最も期待される内容を具体的にご提案します。その後、ご受講をご検討をいただきます。',
  },
  {
    q: '子供の状況が気になるのですが、定期的な面談はありますか？',
    a: '約3か月に1度の頻度で指導報告面談を実施しています。3か月間の学習状況や課題を保護者様にも共有させていただきます。',
  },
  {
    q: '学校や他の塾の宿題でいっぱいいっぱいなのですが、宿題はたくさんでますか？',
    a: 'LEFYはひとりひとりオーダーメイドの学習計画を作成しますので、宿題の有無や量はご希望に沿って対応いたします。',
  },
];

// TestimonialCard コンポーネント
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'student' | 'parent'>('student');

  return (
    <div className="rounded-lg border-2 border-navy-100 bg-white shadow-sm">
      {/* ヘッダー（クリックで展開） */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-navy-50"
      >
        <div>
          <h3 className="text-base font-bold text-navy-800">
            {testimonial.studentName}（{testimonial.grade}）
          </h3>
          <p className="mt-1 text-base font-semibold text-navy-600">
            {testimonial.school} 合格
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-navy-400 transition-transform ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      {/* 展開コンテンツ */}
      {isOpen && (
        <div className="border-t border-navy-100 p-3">
          {/* タブ切り替え */}
          <div className="mb-3 flex gap-2">
            <button
              onClick={() => setActiveTab('student')}
              className={`rounded px-3 py-1.5 text-sm font-semibold transition-all ${activeTab === 'student'
                ? 'bg-navy-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              生徒の声
            </button>
            <button
              onClick={() => setActiveTab('parent')}
              className={`rounded px-3 py-1.5 text-sm font-semibold transition-all ${activeTab === 'parent'
                ? 'bg-navy-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              保護者の声
            </button>
          </div>

          {/* コンテンツ */}
          <div className="rounded bg-gray-50 p-3">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-navy-700">
              {activeTab === 'student'
                ? testimonial.studentVoice
                : testimonial.parentVoice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// IkkanSchoolsSection コンポーネント（男子校/女子校/共学タブ切り替え）
function IkkanSchoolsSection() {
  const [selectedCategory, setSelectedCategory] = useState<'boys' | 'girls' | 'coed'>('boys');

  const categoryLabels = {
    boys: '男子校',
    girls: '女子校',
    coed: '共学'
  };

  const categoryColors = {
    boys: 'border-blue-400 hover:border-blue-600',
    girls: 'border-fuchsia-500 hover:border-fuchsia-600',
    coed: 'border-green-400 hover:border-green-600'
  };

  const buttonColors = {
    boys: { active: 'bg-blue-600 text-white shadow-md', inactive: 'bg-white/70 text-blue-800 hover:bg-white' },
    girls: { active: 'bg-fuchsia-600 text-white shadow-md', inactive: 'bg-white/70 text-fuchsia-800 hover:bg-white' },
    coed: { active: 'bg-green-600 text-white shadow-md', inactive: 'bg-white/70 text-green-800 hover:bg-white' }
  };

  return (
    <div className="mt-10 rounded-xl border-2 border-navy-100 bg-gradient-to-br from-navy-50 to-white p-6">
      <h3 className="mb-5 text-center text-xl font-bold text-navy-800">
        LEFYの塾生が通っている中高一貫校
      </h3>

      {/* タブ切り替え */}
      <div className="mb-6 flex justify-center gap-3">
        {(['boys', 'girls', 'coed'] as const).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-lg px-6 py-2.5 text-base font-semibold transition-all ${selectedCategory === category
              ? buttonColors[category].active
              : buttonColors[category].inactive
              }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* 学校リスト */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {ikkanSchoolsByCategory[selectedCategory].map((school, index) => (
          <div
            key={index}
            className={`flex items-center justify-center rounded border-2 bg-white px-2 py-2 text-center text-sm font-semibold text-navy-800 shadow-sm transition-all hover:shadow-md ${categoryColors[selectedCategory]}`}
          >
            {school}
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-navy-500">
        ※一部のみ記載
      </p>
    </div>
  );
}

export default function AboutPage() {


  return (
    <div className="mx-auto max-w-5xl px-4 py-8">

      {/* Section 1: Hero Banner - 画面横いっぱい */}
      <section className="-mx-4 mb-12 md:-mx-8">
        <Image
          src="/hero-banner-ikkan.png"
          alt="中高一貫校生に特化 定期テスト・大学受験 - LEFY"
          width={1920}
          height={600}
          className="h-auto w-full"
          priority
        />
      </section>

      {/* Section 1.5: 説明とミニカード */}
      <section className="mb-16">
        {/* コンパクトなバッジカード */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full border-2 border-navy-200 bg-gradient-to-r from-navy-50 to-white px-4 py-2 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600">
              <Award className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-navy-800">中高一貫校生専門</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border-2 border-navy-200 bg-gradient-to-r from-navy-50 to-white px-4 py-2 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600">
              <Users className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-navy-800">完全1対1</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border-2 border-navy-200 bg-gradient-to-r from-navy-50 to-white px-4 py-2 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-navy-800">プロ+最難関中高大卒講師</span>
          </div>
        </div>



        {/* CTAボタン */}
        <div className="mx-auto flex max-w-md flex-col gap-4">
          <Link
            href="/counseling"
            className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 py-4 px-8 text-lg font-bold text-white shadow-xl transition-all hover:from-green-600 hover:to-green-700 hover:shadow-2xl"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-green-600">
              無料
            </span>
            学習相談に申し込む
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>

          <a
            href="tel:0456209150"
            className="relative flex flex-col items-center justify-center rounded-full bg-white py-4 px-8 shadow-xl transition-all hover:shadow-2xl"
            style={{ border: '2px solid #e5e7eb' }}
          >
            <div className="absolute -top-3 rounded-full bg-red-600 px-4 py-1 text-xs font-bold text-white">
              21時までお気軽にお電話ください
            </div>
            <div className="mt-2 flex items-center gap-2">
              <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-2xl font-bold tracking-wider text-red-600">
                045-620-9150
              </span>
              <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </a>
        </div>

        {/* 中高一貫校リスト - 合格実績と同じスタイル */}
        <IkkanSchoolsSection />
      </section>

      {/* Section 2: PainChecklist - 画面横いっぱい青背景 */}
      <section className="-mx-4 mb-20 md:-mx-8">
        <div className="bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 py-12 px-6 md:py-16 md:px-12">
          <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
            こんなお悩みありませんか？
          </h2>

          <div className="mx-auto max-w-4xl space-y-6">
            {concerns.map((concern, index) => (
              <div key={index} className="flex items-start gap-4 md:gap-6">
                {/* 丸い画像 */}
                <div className="shrink-0">
                  <div className="h-28 w-28 overflow-hidden rounded-full bg-white shadow-lg md:h-32 md:w-32">
                    <Image
                      src={concern.image}
                      alt={concern.title}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* テキスト */}
                <div className="flex-1 text-white">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">{concern.title}</h3>
                  <div className="text-base leading-relaxed text-navy-50 md:text-lg">
                    {concern.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* アップロードされた画像セクション */}
      <div className="-mt-8 mb-12 flex justify-center">
        <Image
          src="/concerns-section-ikkan.png"
          alt="LEFYの個別指導で定期テストの成績UP・難関大学への合格をつかみましょう"
          width={1024}
          height={768}
          className="h-auto w-full max-w-5xl"
        />
      </div>

      {/* Section 4: TwoWays - ステップ型デザイン */}
      <section className="mb-20 mt-20 pt-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-navy-800 md:text-4xl">
            LEFYには<br />
            2つの通い方があります
          </h2>
          <div className="mx-auto mt-3 h-1 w-32 bg-navy-600"></div>
        </div>

        <div className="space-y-12">
          {/* パターン1: 定期テストの成績UP・指定校推薦対策 */}
          <div className="relative mt-12 rounded-xl shadow-lg">
            {/* パターンバッジ - ヘッダーの外側に配置 */}
            <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
              <div className="rounded-full bg-yellow-400 px-5 py-1.5 text-sm font-bold text-navy-800 shadow-md">
                パターン1
              </div>
            </div>
            {/* ヘッダー */}
            <div className="overflow-hidden rounded-t-xl bg-gradient-to-r from-navy-600 to-navy-700 px-6 pt-8 pb-5 md:px-8">
              <h3 className="text-center text-xl font-bold text-white md:text-2xl">
                定期テストの成績UP・指定校推薦対策
              </h3>
            </div>

            {/* コンテンツエリア */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                {/* 左側：テキストコンテンツ */}
                <div>
                  <p className="mb-4 text-base leading-relaxed text-navy-800">
                    指導力の高い講師が在籍しているため、中高一貫校で使用されているテキスト、学校の先生の配布プリントにも柔軟に対応できます。
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-navy-800">取組イメージ</h4>
                    <ul className="space-y-1.5">
                      {[
                        '定期テストに向けて、学校の毎週の授業理解サポート',
                        'LEFYの講師が宿題を設定',
                        '学校の先生の独自プリントにも対応',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-navy-700">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-600 text-xs text-white">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 対応教材バッジ */}
                  <div className="mt-5 space-y-2">
                    <h4 className="text-sm font-bold text-navy-800">対応教材例</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'NEW TREASURE',
                        'Progress in English 21',
                        '新中学問題集',
                        '4STEP',
                        'フォーカスゴールド',
                        '体系数学',
                        'アドバンスα',
                      ].map((material, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 右側：画像 */}
                <div className="order-first md:order-last">
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <Image
                      src="/pattern-ikkan-1.jpg"
                      alt="定期テスト対策イメージ"
                      width={400}
                      height={300}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* パターン2: 大学受験対策 */}
          <div className="relative mt-12 rounded-xl shadow-lg">
            {/* パターンバッジ - ヘッダーの外側に配置 */}
            <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
              <div className="rounded-full bg-yellow-400 px-5 py-1.5 text-sm font-bold text-navy-800 shadow-md">
                パターン2
              </div>
            </div>
            {/* ヘッダー */}
            <div className="overflow-hidden rounded-t-xl bg-gradient-to-r from-rose-600 to-rose-700 px-6 pt-8 pb-5 md:px-8">
              <h3 className="text-center text-xl font-bold text-white md:text-2xl">
                大学受験対策
              </h3>
            </div>

            {/* コンテンツエリア */}
            <div className="bg-gradient-to-br from-rose-50 to-white p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                {/* 左側：テキストコンテンツ */}
                <div>
                  <p className="mb-4 text-base leading-relaxed text-navy-800">
                    経験豊富な社会人講師、および難関中高卒、東大等難関大在籍の大学生、大学院生が指導にあたります。ティーチングだけでなく、合格に必要なことを全体的にサポート。
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-navy-800">取組イメージ</h4>
                    <ul className="space-y-1.5">
                      {[
                        '志望大学、学部の入試に必要な科目、レベルを一緒に確認（進路相談も）',
                        '現状の学力レベルから合格までのロードマップを考える',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-navy-700">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-600 text-xs text-white">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 右側：画像 */}
                <div className="order-first md:order-last">
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <Image
                      src="/pattern-ikkan-2.jpg"
                      alt="大学受験対策イメージ"
                      width={400}
                      height={300}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: LEFYの個別指導の強み - TOMASスタイル */}
      <section className="mb-20">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-navy-800 md:text-4xl">
            LEFYの個別指導の強み
          </h2>
          <p className="text-base text-navy-600">
            完全1対1の"本物"の個別指導を追求しています
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-10">
          <Image
            src="/strengths-ikkan.png"
            alt="LEFY個別指導の様子"
            width={1200}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* 強み1：ハイレベルな講師 */}
          <div className="border border-gray-200 bg-white p-6">
            <div className="mb-4 inline-block bg-red-600 px-3 py-1">
              <span className="text-sm font-bold text-white">強み 1</span>
            </div>

            <h3 className="mb-4 text-lg font-bold text-navy-800">
              ハイレベルな講師
            </h3>
            <div className="space-y-3 text-sm leading-relaxed text-navy-700">
              <p>
                LEFYは品質の高い個別指導を作りたいという思いから創業された塾です。
              </p>
              <p>
                指導にあたる講師は経験豊富な社会人講師と、最難関中高大の大学生／大学院生のみ。指導力、ソフトスキルの両面を基準とし、<span className="font-bold text-red-600">LEFYの講師の採用率は20%未満</span>。
              </p>
            </div>
          </div>

          {/* 強み2：生徒の発話、筆跡から理解を把握 */}
          <div className="border border-gray-200 bg-white p-6">
            <div className="mb-4 inline-block bg-red-600 px-3 py-1">
              <span className="text-sm font-bold text-white">強み 2</span>
            </div>

            <h3 className="mb-4 text-lg font-bold text-navy-800">
              生徒の発話、筆跡から理解を把握
            </h3>
            <div className="space-y-3 text-sm leading-relaxed text-navy-700">
              <p>
                個別指導でも、先生が説明して終わりでは集団授業と何も変わりません。
              </p>
              <p>
                LEFYでは<span className="font-bold text-red-600">生徒からの発話や筆跡から理解状況を把握</span>。これは中学受験に精通した講師にしかできません。
              </p>
            </div>
          </div>

          {/* 強み3：自身も中学受験経験のあるプロがサポート */}
          <div className="border border-gray-200 bg-white p-6">
            <div className="mb-4 inline-block bg-red-600 px-3 py-1">
              <span className="text-sm font-bold text-white">強み 3</span>
            </div>

            <h3 className="mb-4 text-lg font-bold text-navy-800">
              自身も中学受験経験のあるプロがサポート
            </h3>
            <div className="space-y-3 text-sm leading-relaxed text-navy-700">
              <p>
                中学受験の仕組みを知っていても、当事者として中身を知らない限り、的確なアドバイスはできません。
              </p>
              <p>
                LEFYでは、<span className="font-bold text-red-600">自身が中学受験を経験した講師が受験本番までサポート</span>します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: 合格者の声 */}
      <section className="mb-20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-navy-800 md:text-4xl">合格者の声</h2>
          <div className="mx-auto mt-3 h-1 w-32 bg-navy-600"></div>
        </div>

        {/* 桜の画像 */}
        <div className="mb-10">
          <Image
            src="/sakura-success.png"
            alt="合格おめでとうございます"
            width={1200}
            height={400}
            className="h-auto w-full object-cover"
          />
        </div>

        <p className="mb-6 text-base text-navy-600">
          LEFYで夢を叶えた生徒と保護者の声をご紹介します。
        </p>

        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}

          {/* 口コミリンク - Google + 塗選 */}
          <div className="mt-8 rounded-xl border-2 border-navy-200 bg-gradient-to-r from-navy-50 to-white p-6 text-center">
            <h3 className="mb-3 text-lg font-bold text-navy-800">LEFYの評価・口コミ</h3>
            <p className="mb-5 text-sm text-navy-600">
              外部プラットフォームでも多くの保護者様から高評価をいただいています
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              {/* Google口コミ */}
              <Link
                href="https://search.google.com/local/reviews?placeid=ChIJQ4wkdrldGGARis1Spb8hQN4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-navy-700 hover:shadow-xl"
              >
                Google口コミを見る
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>

              {/* 塗選口コミ */}
              <Link
                href="https://bestjuku.com/juku/7448/review/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
              >
                塾選（ジュクセン）で口コミを見る
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section: 大学合格実績 */}
      <section className="mb-20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-navy-800 md:text-4xl">大学合格実績</h2>
          <div className="mx-auto mt-3 h-1 w-32 bg-navy-600"></div>
        </div>

        {/* シンプルなリスト表示 */}
        <div className="mx-auto max-w-3xl rounded-xl border-2 border-navy-100 bg-gradient-to-br from-white to-navy-50 p-8 shadow-md">
          <ul className="space-y-3">
            {universityAchievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-center gap-3 rounded-lg border border-navy-100 bg-white px-5 py-3 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <span className="text-base font-semibold text-navy-800">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section: 成績UP実績 */}
      <section className="mb-20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-navy-800 md:text-4xl">成績UP実績</h2>
          <div className="mx-auto mt-3 h-1 w-32 bg-navy-600"></div>
        </div>

        {/* 横スクロールレイアウト */}
        <div className="relative">
          {/* スクロールインジケーター - 右側 */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 hidden w-16 bg-gradient-to-l from-white to-transparent md:flex items-center justify-end pr-2">
            <svg className="h-6 w-6 text-navy-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
              {gradeImprovements.map((improvement) => (
                <div
                  key={improvement.id}
                  className="w-80 flex-shrink-0 overflow-hidden rounded-xl border-2 border-navy-100 bg-white shadow-md transition-all hover:shadow-xl"
                >
                  {/* ヘッダー */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-white">
                    <h3 className="text-sm font-bold">{improvement.school}</h3>
                    <p className="mt-1 text-xs opacity-90">{improvement.grade}</p>
                  </div>


                  {/* コンテンツ表示 - achievementタイプ or subjectsタイプ */}
                  <div className="p-5 space-y-5">
                    {improvement.achievement ? (
                      /* 英検合格・模試成果などの表示 */
                      <>
                        {/* 成果のメインメッセージ */}
                        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-300 p-6 text-center">
                          <div className="mb-3 flex justify-center">
                            <svg className="h-12 w-12 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold text-orange-700 leading-tight">
                            {improvement.achievement}
                          </h4>
                        </div>

                        {/* ハイライトポイント */}
                        {improvement.highlights && improvement.highlights.length > 0 && (
                          <div className="rounded-lg bg-navy-50 p-4">
                            <h5 className="mb-3 text-sm font-bold text-navy-700">校内順位では</h5>
                            <ul className="space-y-2">
                              {improvement.highlights.map((highlight, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2 text-sm text-navy-700">
                                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-navy-600 text-xs font-bold text-white">
                                    ✓
                                  </span>
                                  <span className="font-semibold">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : improvement.subjects && improvement.subjects.length > 0 ? (
                      /* 既存の点数比較表示 */
                      <>
                        {improvement.subjects.map((subjectData, idx) => {
                          const scoreImprovement = subjectData.after.score - subjectData.before.score;
                          const hasRank = subjectData.before.rank !== undefined;

                          return (
                            <div key={idx} className={idx > 0 ? 'border-t border-navy-100 pt-3' : ''}>
                              {/* 科目名 */}
                              <div className="mb-2 flex items-center justify-center">
                                <span className="rounded-full bg-navy-100 px-3 py-0.5 text-xs font-bold text-navy-800">
                                  {subjectData.subject}
                                </span>
                              </div>

                              {/* スコア比較 */}
                              <div className="mb-2 grid grid-cols-2 gap-2">
                                {/* Before */}
                                <div className="rounded-lg border-2 border-gray-300 bg-gray-50 p-2 text-center">
                                  <div className="mb-0.5 text-xs font-semibold text-gray-600">入塾前</div>
                                  <div className="text-xl font-bold text-gray-700">{subjectData.before.score}点</div>
                                  {hasRank && subjectData.before.rank && subjectData.before.total && (
                                    <div className="mt-0.5 text-xs text-gray-500">
                                      {subjectData.before.rank}位/{subjectData.before.total}人
                                    </div>
                                  )}
                                  {!hasRank && subjectData.before.average && (
                                    <div className="mt-0.5 text-xs text-gray-500">
                                      （平均{subjectData.before.average}点）
                                    </div>
                                  )}
                                </div>

                                {/* After */}
                                <div className="rounded-lg border-2 border-emerald-400 bg-emerald-50 p-2 text-center">
                                  <div className="mb-0.5 text-xs font-semibold text-emerald-700">入塾後</div>
                                  <div className="text-xl font-bold text-emerald-600">{subjectData.after.score}点</div>
                                  {hasRank && subjectData.after.rank && subjectData.after.total && (
                                    <div className="mt-0.5 text-xs text-emerald-600">
                                      {subjectData.after.rank}位/{subjectData.after.total}人
                                    </div>
                                  )}
                                  {!hasRank && subjectData.after.average && (
                                    <div className="mt-0.5 text-xs text-emerald-600">
                                      （平均{subjectData.after.average}点）
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* 成長幅 */}
                              <div className="flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 py-1.5">
                                <svg className="h-3.5 w-3.5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-bold text-orange-700">+{scoreImprovement}点UP</span>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ) : null}

                    {/* 説明文 */}
                    <div className="border-t border-navy-100 pt-4">
                      <p className="text-xs leading-relaxed text-navy-600">{improvement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* スクロールヒント - モバイル */}
          <p className="mt-2 text-center text-xs text-navy-400 md:hidden">← スワイプして他の実績を見る →</p>

          {/* 注記 */}
          <p className="mt-4 text-center text-xs text-navy-500">
            ※個人情報の観点から、点数や偏差値は下一桁を0か5に統一し、概数で表記しています。
          </p>
        </div>
      </section>


      {/* Section 5: Principal（塾長紹介）- テキスト更新 */}
      <section className="mb-20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-navy-800 md:text-4xl">LEFYの塾長</h2>
          <div className="mx-auto mt-3 h-1 w-32 bg-navy-600"></div>
        </div>
        {/* 新しいレイアウト：写真を大きく、より魅力的に */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* 山本航士 */}
          <div className="group overflow-hidden rounded-2xl border-2 border-navy-100 bg-gradient-to-br from-white to-navy-50 shadow-lg transition-all hover:shadow-2xl">
            <div className="p-6">
              <div className="mx-auto mb-5 h-40 w-40 overflow-hidden rounded-2xl border-4 border-navy-200 shadow-xl transition-transform group-hover:scale-105">
                <Image
                  src="/principal-1.jpg"
                  alt="山本航士"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-xl font-bold text-navy-800">山本 航士</h3>
                <div className="mb-3 inline-block rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">
                  代表
                </div>
                <p className="text-sm leading-relaxed text-navy-600">
                  聖光学院高等学校を卒業し、慶應義塾大学経済学部に入学。慶應義塾大学在学時に服部と出会い、共に学生団体を立ち上げ、法人化。大学卒業後は、コンサルティング会社に入社し、退職後、LEFYを創業。
                </p>
              </div>
            </div>
          </div>

          {/* 服部貴哉 */}
          <div className="group overflow-hidden rounded-2xl border-2 border-navy-100 bg-gradient-to-br from-white to-navy-50 shadow-lg transition-all hover:shadow-2xl">
            <div className="p-6">
              <div className="mx-auto mb-5 h-40 w-40 overflow-hidden rounded-2xl border-4 border-navy-200 shadow-xl transition-transform group-hover:scale-105">
                <Image
                  src="/principal-2.jpg"
                  alt="服部貴哉"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-xl font-bold text-navy-800">服部 貴哉</h3>
                <div className="mb-3 inline-block rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700">
                  代表
                </div>
                <p className="text-sm leading-relaxed text-navy-600">
                  神奈川大学附属高等学校を卒業し、慶應義塾大学法学部に入学。慶應義塾大学在学時に山本と出会い、共に学生団体を立ち上げ、法人化。大学卒業後は、東証プライム市場上場企業の総合商社に入社し、LEFYの創業を機に退職。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube動画 */}
        <div className="mt-8 space-y-6">
          <h3 className="text-center text-lg font-bold text-navy-800">LEFYの紹介動画</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {/* 動画1 */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/U_f1u32S9BY"
                  title="LEFY紹介動画1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            {/* 動画2 */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/P8oBH_mJIDo"
                  title="LEFY紹介動画2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Section 6: Teachers */}
      <section className="mb-16">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-navy-800 md:text-3xl">講師は中学受験のプロと<br />最難関中高一貫卒業者のみ</h2>
          <div className="mx-auto mt-3 h-1 w-32 bg-navy-600"></div>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-navy-700">
          プロ講師に加えて、最難関中高一貫校を卒業し、東大など最難関大に在籍する大学生／大学院生が中心です。
          <br />
          1対1だからこそ、相性まで重視して担当を決めます。
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {teacherTypes.map((teacher, index) => (
            <div
              key={index}
              className="rounded-lg border border-navy-100 bg-white p-4 text-center shadow-sm"
            >
              <h4 className="mb-1 text-sm font-bold text-navy-800">{teacher.title}</h4>
              <p className="text-xs leading-relaxed text-navy-600">{teacher.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-navy-500">
          担当は学年・目的・相性に合わせて最適にマッチングします。
        </p>

        {/* 講師紹介 */}
        <div className="mt-8 rounded-xl border-2 border-navy-100 bg-gradient-to-br from-navy-50 to-white p-6">
          <h3 className="mb-6 text-center text-lg font-bold text-navy-800">在籍講師紹介（一部）</h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* 野口先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">野口先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">久留米大附設高校 → 東京大学</p>
                <p>IT系大手日本企業、外資系企業勤務。実家が英語塾だったこともあり、大学時代から塾講師を継続。</p>
                <p className="font-medium text-navy-700">TOEIC 990点</p>
              </div>
            </div>

            {/* 斎藤先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">斎藤先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">栄東中高 → 東京大学 獣医学部</p>
              </div>
            </div>

            {/* 水口先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">水口先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">横浜共立学園中学校 → 横浜緑ヶ丘高校 → 慶應義塾大学文学部</p>
                <p>オランダ エラスムス大学ロッテルダム校 交換留学</p>
                <p>外資系企業を主なクライアントとした税理士事務所で日常的に英語を使用。英語・国語専門担当。</p>
              </div>
            </div>

            {/* 天野先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">天野先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">聖光学院中高 → 東京大学 工学部</p>
              </div>
            </div>

            {/* 鈴木先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">鈴木先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">聖光学院中高 → 東京大学 農学部 獣医学科</p>
              </div>
            </div>

            {/* 白方先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">白方先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">慶應普通部 → 慶應義塾高校 → 慶應 理工学部</p>
                <p>中学受験時：慶應普通部、栄光学園、広尾学園医進・サイエンスコース、慶應中等部に合格</p>
              </div>
            </div>

            {/* 松本先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">松本先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">中高一貫校 数学・理科 現役教員</p>
                <p>25年の教員歴と10年に渡り大手進学教室、予備校等で指導経験あり</p>
              </div>
            </div>

            {/* 小山先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">小山先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">開成中高 → 慶応義塾大学</p>
              </div>
            </div>

            {/* 石岡先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">石岡先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">神奈川県立横浜翠嵐 → 東京大学 理科二類</p>
                <p>※中学受験も経験し、開成中学に合格</p>
              </div>
            </div>


            {/* 佐々木先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">佐々木先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">聖光学院中高 → 東京科学大学（東京工業大学）</p>
                <p>工学院 経営工学系</p>
              </div>
            </div>

            {/* 山本先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">山本先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">栄光学園 → 一橋大学 ソーシャルデータサイエンス学部</p>
              </div>
            </div>

            {/* 初田先生 */}
            <div className="rounded-lg border border-navy-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="mb-2 text-base font-bold text-navy-800">初田先生</h4>
              <div className="space-y-1 text-xs leading-relaxed text-navy-600">
                <p className="font-semibold text-navy-700">女子学院中高 → 早稲田大学法学部</p>
              </div>
            </div>
          </div>

          {/* 注釈 */}
          <p className="mt-6 rounded-lg bg-navy-50 p-4 text-center text-xs leading-relaxed text-navy-700">
            こちらでご紹介した講師は一部で、他にも選ばれた講師が在籍しています。<br />
            生徒様の学年、志望校、性格などに応じて最適な講師を手配しますので、もしご要望がございましたらお気軽にお尋ねください。
          </p>
        </div>
      </section>

      {/* Section 8: Final Inspiring Message + CTA */}
      <section className="-mx-4 mb-16 md:-mx-8">
        <div className="bg-gradient-to-br from-navy-600 to-navy-700 py-12 px-6 text-center md:py-16 md:px-12">
          <h2 className="mb-6 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
            偏差値が伸びるからやる気がでるサイクルを
            <br />
            一緒につくりましょう
          </h2>
          <p className="mx-auto max-w-2xl mb-8 text-base text-navy-50 md:text-lg">
            正しい努力が確実に結果につながる。LEFYでそのサイクルを体感してください。
          </p>

          {/* CTA Box - 白背景で視認性向上 */}
          <div className="mx-auto max-w-3xl rounded-2xl border-4 border-white/20 bg-white p-8 shadow-2xl">
            <h3 className="mb-3 text-xl font-bold text-navy-800">
              お気軽にご相談ください
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-navy-700">
              近年の中学受験は入試問題のレベルが非常に高くなっているため、直前対策だけでは間に合いません。<br className="hidden sm:block" />
              日々の勉強がうまく回らないと思っている間にあっという間に6年生を迎えてしまいます。<br className="hidden sm:block" />
              着実に伸びる勉強サイクルを今すぐ実現しましょう。
            </p>

            {/* CTAボタン - コンパクト版 */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/counseling"
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 py-3 px-6 text-base font-bold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-green-600">
                  無料
                </span>
                学習相談に申し込む
              </Link>

              <a
                href="tel:0456209150"
                className="flex items-center justify-center gap-2 rounded-lg bg-white py-3 px-6 text-base font-bold text-red-600 shadow-lg transition-all hover:bg-gray-50"
                style={{ border: '2px solid #e5e7eb' }}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                045-620-9150
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className="mb-16">
        <SectionHeader title="よくある質問" />
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-lg border border-navy-100 bg-white p-5 shadow-sm"
            >
              <summary className="cursor-pointer text-base font-semibold text-navy-800 transition-colors hover:text-blue-600">
                Q: {faq.q}
              </summary>
              <p className="mt-3 text-base leading-relaxed text-navy-600">A: {faq.a}</p>
            </details>
          ))}
        </div>
      </section>


    </div >
  );
}
