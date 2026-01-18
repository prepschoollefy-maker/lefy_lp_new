import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Target, Calendar, Users, MessageCircle, BookOpen, TrendingUp, Clock, User, Award, GraduationCap, Star } from 'lucide-react';
import { SectionHeader } from '@/components/lefy/section-header';
import { CTASection } from '@/components/lefy/cta-section';
import { JukenFlowDiagnosis } from '@/components/lefy/juke-flow-diagnosis';

// 大手塾名データ（市進を削除）
const cramSchools = [
  'SAPIX', 'Gnoble', '日能研', '四谷大塚', '希学園', '浜学園', '早稲アカ'
];

// 悩みチェックリスト
const concerns = [
  '宿題が多くて、直し・復習が崩れる',
  'テスト直しをしても、次の点数に活きない',
  '算数が「分かったつもり」で止まり、類題で落ちる',
  '親が管理しないと回らない／家庭が疲れる',
  '何を捨てて何をやるべきか分からない',
  '志望校と優先順位が曖昧で不安',
  '集団のペースが合わないことがある',
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
    q: '大手塾に通っていますが、併用できますか？',
    a: 'はい。SAPIX/グノーブル/日能研/四谷大塚/希学園/浜学園など、集団塾の学習サイクルに合わせて宿題・直し・優先順位を整えます。',
  },
  {
    q: '集団塾に通っていなくても大丈夫ですか？',
    a: 'もちろんです。LEFY中心でも、現状から逆算して合格までのルートを設計します。集団が合う・合わないは相性なので、お子さまに合う進め方を一緒に作ります。',
  },
  {
    q: '宿題は増えますか？',
    a: '増やすことが目的ではありません。目標と負担を見ながら「点数に直結する順」に整えます。結果的に、家庭学習が回りやすくなる形を目指します。',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-navy-500 transition-colors hover:text-navy-700"
      >
        <ArrowLeft className="h-4 w-4" />
        トップに戻る
      </Link>

      {/* Section 1: Hero */}
      <section className="mb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 左側 */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-navy-400">
              <Clock className="h-3.5 w-3.5" />
              読む目安 6分
            </div>
            <h1 className="mb-6 text-3xl font-bold leading-tight text-navy-800 sm:text-4xl">
              大手集団塾での<br />
              <span className="text-blue-600">偏差値を着実に</span>
              <br />
              伸ばしたい方へ
            </h1>
            <div className="mb-6 space-y-3 text-sm leading-relaxed text-navy-700">
              <p>
                <span className="font-semibold text-navy-800">SAPIX・グノーブル・日能研・四谷大塚・希学園・浜学園</span>
                など、集団塾の学習サイクルに合わせます。
              </p>
              <p className="rounded-lg bg-blue-50 p-3 text-sm">
                <span className="font-semibold text-blue-700">LEFYのみの個別指導もOK。</span>
                <br />
                集団塾が合わないタイプのお子様には個別指導だけの最短ルートも設計します。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
              >
                無料相談を予約する
              </Link>
              <Link
                href="https://lin.ee/P0lR1LD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-line px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-line-dark"
              >
                <MessageCircle className="h-4 w-4" />
                LINEで相談する
              </Link>
            </div>
          </div>

          {/* 右側：3つのミニカード - デザイン改善 */}
          <div className="space-y-4">
            <div className="group rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-md transition-all hover:border-blue-300 hover:shadow-lg">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy-800">中学受験専門</h3>
              </div>
              <p className="text-sm leading-relaxed text-navy-700">
                中学受験のプロが手厚いサポートで着実に成績を伸ばす
              </p>
            </div>
            <div className="group rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-md transition-all hover:border-blue-300 hover:shadow-lg">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy-800">完全1対1</h3>
              </div>
              <p className="text-sm leading-relaxed text-navy-700">
                手元と考え方を見て修正
              </p>
            </div>
            <div className="group rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-md transition-all hover:border-blue-300 hover:shadow-lg">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy-800">講師層</h3>
              </div>
              <p className="text-sm leading-relaxed text-navy-700">
                プロ講師＋最難関中高一貫卒→東大等の学生/院生中心
              </p>
            </div>
          </div>
        </div>

        {/* 大手塾名バッジ行 - 大きく分かりやすく、横スクロールなし */}
        <div className="mt-10 rounded-xl border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6">
          <h3 className="mb-4 text-center text-sm font-semibold text-navy-700">
            大手集団塾との併用実績
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {cramSchools.map((school) => (
              <span
                key={school}
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-base font-bold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
              >
                {school}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: PainChecklist */}
      <section className="mb-16">
        <SectionHeader title="こんなお悩みはありませんか？" icon={CheckCircle2} />
        <p className="mb-5 text-sm text-navy-600">
          1つでも当てはまれば、回し方を整えるだけで伸びやすくなります
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {concerns.map((concern, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-navy-100 bg-white p-4 shadow-sm"
            >
              {/* 青色に変更 */}
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <p className="text-sm text-navy-700">{concern}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Value3Cards */}
      <section className="mb-16">
        <SectionHeader title="LEFYがやること" icon={BookOpen} />
        <div className="grid gap-6 sm:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="rounded-lg border border-navy-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-md">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-navy-800">{value.title}</h3>
                <p className="mb-4 text-xs text-navy-500">{value.subtitle}</p>
                <ul className="space-y-2">
                  {value.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-navy-700">
                      {/* 青色に変更 */}
                      <span className="mt-1 text-blue-600">●</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3.5: 診断フローチャート - 新規追加 */}
      <section className="mb-16">
        <JukenFlowDiagnosis />
      </section>

      {/* Section 4: TwoWays */}
      <section className="mb-16">
        <SectionHeader title="LEFYは2つの通い方があります" />
        <p className="mb-6 text-sm text-navy-600">
          実際には、併用のご家庭が多い一方で、LEFY中心で進めるケースもあります。どちらも自然な選択です。
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* 左：集団塾併用 - 青色ベースに変更 */}
          <div className="rounded-lg border-2 border-blue-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                集団塾併用
              </span>
              {/* 文言変更 */}
              <h3 className="mt-2 text-lg font-bold text-navy-800">集団塾での偏差値UP</h3>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {['SAPIX', 'Gnoble', '日能研', '四谷', '希', '浜'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ul className="mb-4 space-y-2">
              <li className="flex items-start gap-2 text-sm text-navy-700">
                <span className="mt-1 text-blue-600">▸</span>
                宿題の整理と取捨選択
              </li>
              <li className="flex items-start gap-2 text-sm text-navy-700">
                <span className="mt-1 text-blue-600">▸</span>
                マンスリー/組分け等の直しを得点化
              </li>
              <li className="flex items-start gap-2 text-sm text-navy-700">
                <span className="mt-1 text-blue-600">▸</span>
                算数の穴補強と解法の安定
              </li>
              <li className="flex items-start gap-2 text-sm text-navy-700">
                <span className="mt-1 text-blue-600">▸</span>
                志望校特訓/過去問の優先順位づけ
              </li>
            </ul>
            <p className="text-xs italic text-navy-600">
              "回る"だけで、点数のブレが減っていきます。
            </p>
          </div>

          {/* 右：LEFY中心 - オレンジ系に変更 */}
          <div className="rounded-lg border-2 border-orange-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <span className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                LEFY中心
              </span>
              <h3 className="mt-2 text-lg font-bold text-navy-800">オーダーメイド受験</h3>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {['習慣づくり', '土台', '志望校対策'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ul className="mb-4 space-y-2">
              <li className="flex items-start gap-2 text-sm text-navy-700">
                <span className="mt-1 text-orange-600">▸</span>
                現状診断→合格までの最短ルート設計
              </li>
              <li className="flex items-start gap-2 text-sm text-navy-700">
                <span className="mt-1 text-orange-600">▸</span>
                習慣→土台→志望校対策の順で積み上げ
              </li>
              <li className="flex items-start gap-2 text-sm text-navy-700">
                <span className="mt-1 text-orange-600">▸</span>
                知識・手順の"ピース"を整理して再構築
              </li>
              <li className="flex items-start gap-2 text-sm text-navy-700">
                <span className="mt-1 text-orange-600">▸</span>
                小さな成功体験で自信と再現性を作る
              </li>
            </ul>
            <p className="text-xs italic text-navy-600">
              親の管理負担が減り、お子さまが自走しやすくなります。
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Principal（塾長紹介）- テキスト更新 */}
      <section className="mb-16">
        <SectionHeader title="LEFYの塾長" icon={User} />
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-center rounded-lg border border-navy-100 bg-white p-6 text-center shadow-sm">
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-blue-100">
              <Image
                src="/principal-1.jpg"
                alt="山本航士"
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mb-3 text-lg font-bold text-navy-800">山本 航士</h3>
            <p className="text-xs leading-relaxed text-navy-600">
              聖光学院高等学校を卒業し、慶應義塾大学経済学部に入学。慶應義塾大学在学時に服部と出会い、共に学生団体を立ち上げ、法人化。大学卒業後は、コンサルティング会社に入社し、退職後、LEFYを創業。
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-navy-100 bg-white p-6 text-center shadow-sm">
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-blue-100">
              <Image
                src="/principal-2.jpg"
                alt="服部貴哉"
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mb-3 text-lg font-bold text-navy-800">服部 貴哉</h3>
            <p className="text-xs leading-relaxed text-navy-600">
              神奈川大学附属高等学校を卒業し、慶應義塾大学法学部に入学。慶應義塾大学在学時に山本と出会い、共に学生団体を立ち上げ、法人化。大学卒業後は、東証プライム市場上場企業の総合商社に入社し、LEFYの創業を機に退職。
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Teachers */}
      <section className="mb-16">
        <SectionHeader
          title="講師は「中学受験のプロ」と「最難関卒の伴走者」"
          icon={Users}
        />
        <p className="mb-6 text-sm leading-relaxed text-navy-700">
          プロ講師に加えて、最難関中高一貫校を卒業し、東大など最難関大に在籍する大学生／大学院生が中心です。
          <br />
          1対1だからこそ、相性まで重視して担当を決めます。
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {teacherTypes.map((teacher, index) => (
            <div
              key={index}
              className="rounded-lg border border-navy-100 bg-white p-5 text-center shadow-sm"
            >
              <h4 className="mb-2 text-sm font-bold text-navy-800">{teacher.title}</h4>
              <p className="text-xs leading-relaxed text-navy-600">{teacher.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-navy-500">
          担当は学年・目的・相性に合わせて最適にマッチングします。
        </p>
      </section>

      {/* Section 7: Support */}
      <section className="mb-16">
        <SectionHeader title="授業だけで終わらせない、「ダブル伴走」" />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-navy-100 bg-white p-5 text-center shadow-sm">
            <h4 className="mb-2 text-sm font-bold text-navy-800">2名以上担当制</h4>
            <p className="text-xs text-navy-600">授業担当＋学習設計担当</p>
          </div>
          <div className="rounded-lg border border-navy-100 bg-white p-5 text-center shadow-sm">
            <h4 className="mb-2 text-sm font-bold text-navy-800">定期報告/面談</h4>
            <p className="text-xs text-navy-600">状況と方針を共有</p>
          </div>
          <div className="rounded-lg border border-navy-100 bg-white p-5 text-center shadow-sm">
            <h4 className="mb-2 text-sm font-bold text-navy-800">次の打ち手を明確に</h4>
            <p className="text-xs text-navy-600">次週の最優先を決める</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-navy-600">
          "何をどこまでやるか"が明確になると、ご家庭の不安が減ります。
        </p>
      </section>

      {/* Section 8: Steps */}
      <section className="mb-16">
        <SectionHeader
          title="無料相談で、次の2週間の「回し方」を仮で作ります"
          icon={MessageCircle}
        />
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          {consultationSteps.map((step) => (
            <div
              key={step.number}
              className="rounded-lg border border-navy-100 bg-white p-5 text-center shadow-sm"
            >
              <div className="mb-3 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-lg font-bold text-white">
                  {step.number}
                </div>
              </div>
              <h4 className="mb-1 text-sm font-semibold text-navy-800">{step.title}</h4>
              <p className="text-xs text-navy-600">{step.description}</p>
            </div>
          ))}
        </div>
        <p className="mb-6 text-center text-sm font-semibold text-blue-700">
          "来週から何をどう進めるか"が具体的に分かります。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
          >
            無料相談を予約する
          </Link>
          <Link
            href="https://lin.ee/P0lR1LD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-line px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-line-dark"
          >
            <MessageCircle className="h-4 w-4" />
            LINEで相談する
          </Link>
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
              <summary className="cursor-pointer text-sm font-semibold text-navy-800 transition-colors hover:text-blue-600">
                Q: {faq.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-navy-600">A: {faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Section 10: Final CTA */}
      <CTASection variant="compact" />
    </div>
  );
}
