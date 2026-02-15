'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, TrendingUp, ChevronDown, ArrowLeft } from 'lucide-react';

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
    rank?: number;
    total?: number;
    average?: number;
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
  subjects?: SubjectScore[];
  achievement?: string;
  highlights?: string[];
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

// TestimonialCard コンポーネント
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'student' | 'parent'>('student');

  return (
    <div className="rounded-lg border-2 border-navy-100 bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-navy-50"
      >
        <div>
          <h3 className="text-base font-bold text-navy-800">
            {testimonial.studentName}（{testimonial.grade}）
          </h3>
          <p className="mt-1 text-base font-semibold text-navy-600">
            {testimonial.school}
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-navy-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-navy-100 p-3">
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

export default function ResultsIkkanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-white">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-700 via-rose-800 to-slate-900 py-20 px-6 text-center md:py-28">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-rose-200 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-6 flex justify-center gap-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <GraduationCap className="h-12 w-12 text-rose-200 md:h-14 md:w-14" />
            </div>
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            中高一貫校生<br className="md:hidden" />成績UP・大学受験<br />合格実績
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-rose-100 md:text-xl">
            中高一貫校生の定期テスト成績UPから<br className="hidden md:block" />
            難関大学合格まで、着実な成果を実現
          </p>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
            <div className="h-2 w-2 rounded-full bg-rose-200"></div>
            <p className="text-lg font-semibold text-white">LEFY 中高一貫校生専門個別指導</p>
          </div>
        </div>
      </section>

      {/* 大学合格実績セクション */}
      <section className="py-16 px-4 md:py-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mb-3 inline-block rounded-full bg-rose-100 px-4 py-1.5">
              <span className="text-sm font-semibold text-rose-700">UNIVERSITY ACHIEVEMENTS</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-navy-800 md:text-4xl">
              大学合格実績
            </h2>
          </div>

          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-navy-100 bg-gradient-to-br from-white to-navy-50 p-8 shadow-lg">
            <ul className="space-y-3">
              {universityAchievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-navy-100 bg-white px-5 py-3 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-rose-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <span className="text-base font-semibold text-navy-800">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 成績UP実績セクション */}
      <section className="bg-gradient-to-br from-slate-100 to-slate-50 py-16 px-4 md:py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-3 inline-block rounded-full bg-white/80 px-4 py-1.5 shadow-sm">
              <span className="text-sm font-semibold text-navy-700">GRADE IMPROVEMENT</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-navy-800 md:text-4xl">成績UP実績</h2>
          </div>

          {/* 横スクロールレイアウト */}
          <div className="relative">
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 hidden w-16 bg-gradient-to-l from-slate-100 to-transparent md:flex items-center justify-end pr-2">
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

                    {/* コンテンツ */}
                    <div className="p-5 space-y-5">
                      {improvement.achievement ? (
                        <>
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
                        <>
                          {improvement.subjects.map((subjectData, idx) => {
                            const scoreImprovement = subjectData.after.score - subjectData.before.score;
                            const hasRank = subjectData.before.rank !== undefined;

                            return (
                              <div key={idx} className={idx > 0 ? 'border-t border-navy-100 pt-3' : ''}>
                                <div className="mb-2 flex items-center justify-center">
                                  <span className="rounded-full bg-navy-100 px-3 py-0.5 text-xs font-bold text-navy-800">
                                    {subjectData.subject}
                                  </span>
                                </div>

                                <div className="mb-2 grid grid-cols-2 gap-2">
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

                      <div className="border-t border-navy-100 pt-4">
                        <p className="text-xs leading-relaxed text-navy-600">{improvement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-2 text-center text-xs text-navy-400 md:hidden">&larr; スワイプして他の実績を見る &rarr;</p>

            <p className="mt-4 text-center text-xs text-navy-500">
              ※個人情報の観点から、点数や偏差値は下一桁を0か5に統一し、概数で表記しています。
            </p>
          </div>
        </div>
      </section>

      {/* 合格者の声セクション */}
      <section className="py-16 px-4 md:py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <div className="mb-3 inline-block rounded-full bg-rose-100 px-4 py-1.5">
              <span className="text-sm font-semibold text-rose-700">VOICES</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-navy-800 md:text-4xl">合格者の声</h2>
          </div>

          <p className="mb-6 text-base text-navy-600 text-center">
            LEFYで夢を叶えた生徒と保護者の声をご紹介します。
          </p>

          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 実績一覧に戻るリンク + フッター */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 text-center">
        <div className="mb-4">
          <Link href="/results" className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 transition-colors hover:text-navy-900">
            <ArrowLeft className="h-4 w-4" />
            実績一覧に戻る
          </Link>
        </div>
        <p className="text-sm text-slate-500">&copy; 2026 LEFY. All rights reserved.</p>
        <div className="mt-4">
          <a href="https://lefy.jp/" className="text-sm font-medium text-navy-700 transition-colors hover:text-navy-900">
            ホームページへ戻る
          </a>
        </div>
      </footer>
    </div>
  );
}
