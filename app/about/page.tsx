'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Target, Calendar, Users, MessageCircle, BookOpen, TrendingUp, Clock, User, Award, GraduationCap, Star, ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/lefy/section-header';
import { CTASection } from '@/components/lefy/cta-section';
import { JukenFlowDiagnosis } from '@/components/lefy/juke-flow-diagnosis';

// 大手塾名データ（市進を削除）
const cramSchools = [
  'SAPIX', 'Gnoble', '日能研', '四谷大塚', '早稲田アカデミー', '希学園', '浜学園'
];

// 年度別・学校種別合格実績データ
interface SchoolCategory {
  boys: string[];      // 男子校
  girls: string[];     // 女子校
  coed: string[];      // 共学
}

const resultsByYear: Record<2026 | 2025 | 2024 | 2023, SchoolCategory> = {
  2026: {
    boys: ['海陽', '立教新座', '高輪', 'サレジオ学院', '聖光学院'],
    girls: ['淑徳与野', '捜真女学校', '不二聖心女子学院', 'フェリス女学院', '湘南白百合', '聖セシリア女子中学校', '東洋英和', '清泉', '横浜共立', '鎌倉女子'],
    coed: ['栄東', '埼玉栄', '宮崎日大', '佐久長聖', '明大世田谷', '山手学院', '関東学院', '神奈川大学附属', '東京大学附属', '横浜創英', '青陵', '桐蔭', '品川翔英', '三田国際科学学園（IC）', '日大日吉', '横須賀学院']
  },
  2025: {
    boys: [
      '開成', '浅野', '聖光学院', 'サレジオ学院', '逗子開成',
      '鎌倉学園', '静岡聖光', '藤嶺学園藤沢', '武相'
    ],
    girls: [
      '香蘭', '淑徳与野'
    ],
    coed: [
      '愛光', '青山学院横浜英和', '市川', '開智', '神奈川大学附属',
      '関東学院', '桐蔭学園', '桐光学園', '埼玉栄', '栄東(東大クラス特待・難関大)',
      '佐久長聖(特待C含む)', '東京都市大学等々力(特選)',
      '日本大学', '日本大学藤沢', '三田国際(ISC、MSTC)',
      '八雲学園', '山手学院(特待含む)', '横浜創英', '早稲田佐賀'
    ]
  },
  2024: {
    boys: [
      '栄光学園', 'サレジオ学院', '逗子開成'
    ],
    girls: [],
    coed: [
      '神奈川大学附属', '佐久長聖', '佐久長聖（特待B）',
      '中央大学附属横浜', '桐蔭学園（特待）', '森村学園（特待）', '山手学院'
    ]
  },
  2023: {
    boys: [
      '静岡聖光'
    ],
    girls: [
      'フェリス女学院', '田園調布学園（午後算数）'
    ],
    coed: [
      '佐久長聖（特待A）', '桐光学園', '関東学院', '宝仙学園（特待）'
    ]
  }
};

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
    id: 'tk',
    studentName: 'T.K君',
    school: '栄光学園',
    grade: '精華小学校',
    studentVoice: `僕には、3ヶ月のブランクがありました。その時、知り合いの薦めでレフィーに入りました。

レフィーの先生は、僕がミスをしても温かく見守ってくれ、僕が欠点に気づきやすいようにうまくまとめてくれました。

僕はそれをノート化して、入試前の最後の1ヶ月、過去問をやる時に見ながら役立てました。

先生方は癖のある栄光の算数にもちゃんと対応・サポートしてくれたため、合格することができました。レフィーの先生方に感謝しています。`,
    parentVoice: `反抗期に入って子供が受験に意味をみいだせず、いよいよ勉強時間が大切になってくる5年の冬にとうとう歩みを止めてしまいました。

大手塾の勉強をすべてやらなくなり、3ヶ月が淡々と過ぎていきました。

結果、前から苦手意識のあった算数の成績が低下し始めました。さすがにこのままではまずいと思い知り合いに相談。LEFYの門をたたきました。

先生はよくヒアリングしてくださり、息子の様子を見ながら慎重に勉強をスタートしてくださいました。息子は歳の近い先生とすぐに息が合ったようで、次第に算数が好きになっていきました。

息子は大変面倒くさがり屋でかつ、軽微なミスの多い子でしたので、その癖直しも大変でした。先生の豊富なアイデアで少しずつ自分の直さなければならないところを意識していった気がします。

また担当してくださった先生方のおかげで、算数の楽しさのみならず数学への興味まで導いてくださいました。

『栄光の算数って面白いね』というのが初めて過去問に取り組んだ息子の感想です。

これによって自然と中学校で学ぶことについて考え、受験を前向きに考えられるようになりました。

これからも道のりは長いですが、

先生が繋げてくださった道を栄光学園でさらに広げていきたいと思います。

本当にお世話になりました。

ありがとうございました。`
  },
  {
    id: 'kk',
    studentName: 'K.K君',
    school: '逗子開成',
    grade: '私立小学校',
    studentVoice: `成績が思うように伸びずにいた6年の夏期講習前から、LEFYへ通い始めました。

LEFYの先生方は自分の解き方を尊重しつつも、より良い解き方を教えてくれました。

苦手なところも最後は出来るようになり、自信にもつながりました。

授業以外の自習の時にも、わからないところの質問が出来たことはとても良かったです。

入塾してから受験本番が終わるまでずっと励ましてくれたこと、僕にとって心の支えとなりました。

LEFYの先生方に本当に感謝しています。ありがとうございました。`,
    parentVoice: `「個別塾は嫌い！自分の欠点ばかり指摘するから等」頑なに個別塾へ入塾することを拒んでいた子どもの考えを払拭してくれたのがLEFYでした。

大手塾に通っていたものの成績がなかなか思うように伸びず、親の言うことは基本聞かない我が子。

果たしてどこまでやれるのか、そもそも早々にギブアップしてしまうかも等、不安な気持ちで入塾いたしましたが、

入塾の際の丁寧なカウンセリングから始まり、定期的な面談以外にもメール等子どもの様子の共有やこちらからの相談にものっていただき、安心して通塾することが出来ました。

細やかなサポートの中に、我が家にとって自習が出来たことも大きなポイントにもなりました。

自宅ではどうしても気が散ってしまい、図書館や近所のカフェなど少しでも集中出来る環境をと試行錯誤しておりましたが、

LEFYでの自習は、自分で時間を決めて取り組み、尚且つ合間に先生に質問が出来たこと、有難い環境でした。

中学受験を経験された先生やこの業界に精通された先生方からの指導は、子どもの気持ちに寄り添い、共感しつつも苦手分野を克服することが出来、受験本番中までメンタル面含めてサポートいただきました。

子どもは経験ある先生方ご自身の当時の学校生活を聞くこともあり、入学後の中学校から大学生活までイメージし、さらに頑張ろうと思える目標にもなりました。

小学生が3年以上長い期間取り組む中学受験。親もその経験がない中、LEFYの先生方のサポートがなければ、

この受験を乗り越えることが出来なかったと、子どもの様子を見て痛感しております。

「個別塾は嫌い！」から今では今後も通塾したい塾になりました。

中学受験は終わりましたが、学ぶことはこれで終わりではないので今後もご指導いただきたいと考えております。 本当にありがとうございました。`
  },
  {
    id: 'ku',
    studentName: 'K.U.君',
    school: '開成・聖光学院',
    grade: '精華小学校',
    studentVoice: `僕は６年生の夏休み明けに算数のスランプに陥り、塾のマンスリーテストでも点が取れなくなってしまいました。問題が解けず算数が嫌いになっていました。

このような状態では集団授業より個別指導で算数を見てもらったほうが良いのではと思い、友人も通っていたLEFYに通う事にしました。

LEFYは自習室も完備され、落ち着いて勉強することができ、先生の教え方も優しく、僕がミスをしても温かく指摘してくれました。

入試直前期には第一志望校の過去問対策をしてもらい、僕の欠点を直すための色々なアドバイスを的確にしてくれ、入試の前日にもミスを防ぐための対策をメールしてくれました。そのおかげで入試本番では算数が良くでき、開成中学と聖光学院のダブルで合格ができました。LEFYの先生にはとても感謝しています。`,
    parentVoice: `LEFYには6年生の10月から入試までの4カ月間お世話になりました。

夏休み明けから算数の成績が急降下し、大手塾のクラスも２つ落ちし、息子自身も算数わからない！やりたくない！と拒否反応が強くなっておりました。算数が得意な周りの子達がスラスラ解いているのに、自分は解けないと悩んでいたため、環境を変え個別で算数を教えていただけるところを探し、入試までのギリギリのタイミングでLEFYに入塾しました。

LEFYでは大手塾のテキストで解けない問題の解説や、志望校の過去問の解説などサポートをお願いしました。息子は通い始めてすぐに、「LEFYの先生は僕の気持ちに寄り添ってくれる」と嬉しそうに報告してくれ、10月末以降からの模試では算数の点数が急回復しました。入試直前には、先生からミスを減らすための解き方をアドバイスいただき、その解き方を入試本番で実践でき合格を勝ち取ることができました。

短期間でここまで息子を引き上げてもらえたことに、感謝の気持ちでいっぱいです。
本当にありがとうございました。`
  },
  {
    id: 'mk',
    studentName: 'M.K.さん',
    school: '三田国際学園中学校（ISC、MSTC）',
    grade: '私立小学校',
    studentVoice: `私は私立小学校に通っているのですが、算数が４年生くらいから一気に難しくなって困っていました。
当時は集団塾に通っていたのですが、算数の先生の説明が理解しづらく、質問もしづらかったため、わからない問題がどんどん積み重なっていきました。

そんな時、小学校の友達が通っていると聞き、LEFYを知りました。
最初に学習相談で伺ったとき、先生の教え方がとても分かりやすくて「ここで教えてもらいたい！」と思ったのをよく覚えています。
実際に通い始めると、私の苦手な箇所を的確に見抜いてくださり、授業でつまずいた問題をひとつひとつクリアにしていくことができました。
入試直前には志望校の出題傾向に似た問題を出すほかの学校の過去問に挑戦し、効果的に対策を進めるよう提案をしていただきました。

特に私を担当してくださったY先生は、厳しい中にも面白さがある方で、私との相性がとても良かったと思います。要点を押さえてツッコミを入れてくださるので、苦手な箇所でも楽しく学習することができました。
おかげさまで無事に第一志望校に合格することができました。今後、中高での学習や大学受験で困った時には、ぜひまたLEFYの先生方に教えてもらいたいと思っています。
本当にありがとうございました。`,
    parentVoice: `Y先生の適切かつ的確なご指導には、心より感謝しております。
娘は自分で書いている通り、LEFYに通い始めてから算数への理解がぐっと深まったと感じます。

最初のうちは対面でご指導いただいていたのですが、我が家から通うのが難しくなった高学年以降はオンラインでお願いするようになりました。
書画カメラを準備し、古いPCやiPadを使って手探りで始めましたが、先生と娘の間でしっかりとした信頼関係ができていたおかげで、オンラインでもスムーズに授業を進めていただけました。
授業中、時折聞こえてくる先生の鋭いツッコミと優しいアドバイスは、少しおっとりしている娘には良い刺激になったようです。
直前期も変わらず同じテンションでご指導いただいたおかげで、娘は本番でも緊張せず落ち着いて受験に臨めたと思います。

おかげさまで第一志望校に合格し、親としても本当に嬉しく、感謝の気持ちでいっぱいです。
娘が言うように、これからまた学習面で悩んだときにはLEFYを頼らせていただきたいと思っております。
卒業後も時々お伺いすることがあるかと思いますが、今後ともどうぞよろしくお願い申し上げます。`
  },
  {
    id: 'sy',
    studentName: 'S.Y.君',
    school: '日本大学藤沢中学校',
    grade: '横浜市立川上北小学校',
    studentVoice: `僕はLEFYに入る前に他の塾に通っていました。

その時は苦手単元が分からず困っていましたが、LEFYではそこを指摘してくださったので「ここが苦手ポイントなんだな」と気付くことができました。
先生方の指導内容がとても丁寧で分かりやすく、LEFYだから日大藤沢に合格することができました。中学に入学しても通い続けたいです。

指導してくださった先生方、僕を合格させてくれて本当にありがとうございました。`,
    parentVoice: `塾のカリキュラムを上手く回せず親子で心身共に疲弊していた5年生の秋、LEFYに出会いました。
今までどんどん進むカリキュラムをこなすのに精一杯で、理解に繋がらずどうしたら良いのか迷走していました。
LEFYでは個人の出来ているところと課題を分析して授業内容、家庭学習のスケジュールまで丁寧に対応して下さいました。
都度現状を家庭と共有し、課題のアップデートをして頂いたので親の精神的負担がとても軽かったです。
そして何より息子の個性に寄り添っていただいたことで、追い込みの勉強に耐え抜く力と自習する力をつけていただきました。
受験当日息子は自ら自走しチャレンジし続けました。

LEFYの先生方のお陰で親子共に感無量の受験となりました。本当に有難うございました。`
  },
  {
    id: 'mm',
    studentName: 'M.M.君',
    school: '横浜創英中学校',
    grade: '横浜市立みなとみらい本町小学校',
    studentVoice: `僕は4年生の終わりから集団塾に通い、5年生からは個別指導塾に通っていましたが、社会以外は苦手で全く成績が上がりませんでした。このままではダメだと思い、6年生の10月からレフィーにも通うことにしました。
レフィーに通い始めてからは、今まで理解できなかった国語と算数の問題がどんどん解けるようになっていき、同時に通っていた他の個別指導塾の先生にも12月頃から急にできるようになったとびっくりされました。

受験した2校ともに合格することができたのはレフィーの先生方のおかげだと感謝しています。
受験は終わりましたが、3月からまたレフィーに通います！
これからもよろしくお願いします！！`,
    parentVoice: `息子は運動が大好きで勉強はめっきり苦手なタイプなので、集団塾では授業についていけず、できない子を伸ばすというような個別指導塾にも期待を込めて通わせてみましたが全く伸びませんでした。
塾に行っているというだけで勉強した気になり、他に習いごともしていたため自宅学習もままならない状態で、6年生の9月の模試でも偏差値30台をとり、どこの学校にも合格するには絶望的な結果で精神的にも追い込まれていました。

そんな息子が6年生の10月からレフィーに通うようになり、あんなに苦手だった国語と算数が通う毎に伸びていき本当に驚きました。
同じ問題でも、レフィーの先生の説明は他の塾の先生とは違い、とてもわかりやすかったそうです。

受験直前の4ヶ月という短い期間のなかで、理解できていなかったところが多くあったにも関わらず、それを丁寧につぶしてくださり、自信を持って試験に臨めるところまで導いてくださったレフィーの先生方には、親子共々心から感謝の気持ちでいっぱいです！！
本当にありがとうございました！`
  },
  {
    id: 'sw',
    studentName: 'S.W.さん',
    school: '香蘭中学校',
    grade: '精華小',
    studentVoice: `私は算数や理科が苦手でしたが、先生が丁寧に優しく教えてくださったおかげで、月に一度のテストの成績が急激に上がりました。その後は成績が安定し、無事に志望校に合格することができました。`,
    parentVoice: `中学受験は、先生方のサポートのおかげで無事に終えることができました。振り返れば短い期間でしたが、まるでジェットコースターに乗っているような日々でした。そんな中、lefyでY先生に出会ってからはようやく落ち着いて過ごせるようになり、感謝の気持ちでいっぱいです。

娘はある大手塾に通っていましたが、先生からのサポートがもともと少なく、6年生になるとさらに不足を感じるようになりました。志望校の相談や過去問の採点においても、十分なフォローがなく物足りませんでした。算数の偏差値も不安定でしたが、塾の先生に相談しても望むような答えが返ってこないばかりか、保護者としての不安な気持ちも理解してもらえませんでした。

そんな時に出会ったのがlefyのY先生です。初回の面談で即入室を決めました。入室してからの約1年という短い期間でしたが、娘の算数に対する苦手意識は少しずつ薄れて自信が持てるようになり、偏差値も安定していきました。教室の先生方は、定期的に面談を行い、親子の日々の様子を細かく把握してくださっていました。

志望校を決める際、通っていた大手塾では娘が希望する学校を積極的に応援してもらえず、先生が考えた学校ばかりを勧められ、正直嫌な思いをしました。しかし、lefyでY先生に相談したところ、「娘さんの気持ちを尊重し、挑戦してみましょう。全力でサポートしますのでご安心ください」と言っていただき、とても安心できました。

先生方の細やかな気遣いのおかげで、受験生活をスムーズに終えることができ、ギスギスした日々も少なく済みました。親子ともに心のケアがとても重要であることを改めて感じました。また、この受験を通じて子どもを信じる大切さを学びました。

lefyの先生方には心より感謝しています。本当にありがとうございました。`
  },
  {
    id: 'nm',
    studentName: 'N.Mさん',
    school: 'フェリス女学院',
    grade: '私立関東学院小学校',
    studentVoice: `LEFYには入試本番の３カ月前から通い、算数と理科の苦手分野の対策をしてもらいました。通い始めたころは、志望校別模試でも算数と理科があまり良い結果がでず、不安な状況が続いていましたが、１月ごろにはフェリスの過去問でも算数で点数を稼げるようなレベルになりました。また、多くの過去問の解説をしてもらい、とても役に立ちました。
難しい問題をたくさん解きましたが、とくに灘の算数の問題を解いたことが印象に残っています。みなさんも受験頑張ってください。`,
    parentVoice: `入試前３カ月という直前とも言える時期に、短期間で娘の苦手範囲やレベルを把握し、ご指導下さり、ありがとうございました。弱点に対する嫌悪感が減り、自信を持って入試を迎えることができました。
両親ともに中学受験の経験がなく、学習面、精神面ともにサポートできない分を補っていただき、ありがとうございました。
また、田園調布学園をはじめ、算数１科目で受験できる学校を複数検討していましたが、算数１科目入試の過去問は解説が掲載されていないことが多く、対策に悩んでいました。
これらの解説サポートをしていただけたことは非常に助かった点です。`
  },
  {
    id: 'ty',
    studentName: 'T.Yさん',
    school: '桐光学園',
    grade: '私立S小学校',
    studentVoice: `苦手単元を習得できるまで何度も繰り返し教えてくれたので、徐々に理解できるようになり、自信につながりました。自習の合間に一緒に志望校の動画を見ながら、合格した後の楽しい学校生活を想像することで、受験に対してのやる気を起こさせてくれました。
先生方が心優しく、学習面だけでなく、自習や授業の合間に学校生活や趣味の話を聞いてくれてリラックスしながら学習することができました。また、自習室が広くて居心地がよく、家で勉強するよりも集中できました。受験生のみなさんも、基礎をしっかりかため、苦手単元は早めに克服したほうがいいです。受験当日にも学力は伸びるので、最後まで勉強をあきらめないでください。`,
    parentVoice: `集団塾に通っていたのですが、６年の10月になっても苦手科目が克服できない状況に思い悩んでいたときにレフィーに出会いました。先生方に親身になってご相談にのっていただいたことで、息子が入試までにやるべきことが明確になり、それを達成するためにはレフィーでご指導いただくことが最善策であると考え、入塾することに決めました。

入塾したのが10月中旬と入試まで短期間しかなかったため、苦手科目に絞ってご指導いただけたことがよかったです。勉強に中々前向きに取り組むことができなかった息子の性格に寄り添っていただくことでモチベーションがあがり、レフィーで過ごす授業時間や自習時間は大変ながらも楽しく勉強できる時間となったようです。志望校選択時も時間をかけてアドバイスいただいたおかげで多数の学校より合格をいただけたと思っております。

ただ教えるという形だけの塾ではなく一人ひとりに合った指導方針のもと的確にご指導いただけることがよかったです。また先生方とやりとりさせていただく中で絶大な信頼を寄せることができ、親子ともに勉強面で精神面でも助けていただきました。定期的な面談だけではなく、お電話やメールで指導内容や息子の様子などを随時ご連絡いただくなど、日々の細やかなサポートに感謝しておりました。`
  }
];

// 悩みチェックリスト
// お悩みデータ（3つに集約）
const concerns = [
  {
    image: '/concern-1.png',
    title: '集団塾のペースに追いつけない',
    highlightText: '集団塾のペースについていけない',
    description: '毎月のテストも復習したいが、毎週の宿題で手一杯。すべてやりきれないが、何を捨てて、どれには絶対に取り組むべきなのかの取捨選択が難しい。着実に偏差値が伸びる学習サイクルを作りたい。',
  },
  {
    image: '/concern-2.png',
    title: 'お子さんが親の言うことを聞いてくれない',
    highlightText: 'お子さんが親の言うことを聞いてくれない',
    description: '学年が上がるにつれて、お子さんはなかなか親の言うことを素直に受け入れてくれなくなってしまうもの。宿題をやってほしいだけなのに喧嘩となり、親のストレスもたまってしまう。',
  },
  {
    image: '/concern-3.png',
    title: '親の負担が大きい／親が共働き',
    highlightText: '親の負担が大きい／親が共働き',
    description: '学年が上がると中学受験の内容は大人でも理解が難しいものがたくさん。また、親が仕事をしていると、毎週の塾の宿題の実施状況だけでも追うのが難しいのに、中身までフォローする余裕がない。',
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

export default function AboutPage() {
  // 年度選択の状態管理
  const [selectedYear, setSelectedYear] = useState<2026 | 2025 | 2024 | 2023>(2026);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">

      {/* Section 1: Hero Banner - 画面横いっぱい */}
      <section className="-mx-4 mb-12 md:-mx-8">
        <Image
          src="/hero-banner.png"
          alt="大手集団塾での偏差値を着実に伸ばしたい方へ - LEFY"
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
            <span className="text-sm font-bold text-navy-800">中学受験専門</span>
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

        {/* 説明テキスト */}
        <div className="mb-6 space-y-3 text-base leading-relaxed text-navy-700">
          <p className="text-center">
            <span className="font-semibold text-navy-800">SAPIX・グノーブル・日能研・四谷大塚・早稲田アカデミー・希学園・浜学園</span>
            など、集団塾の学習サイクルに合わせます。
          </p>
          <p className="mx-auto max-w-2xl rounded-lg bg-navy-50 p-3 text-center text-base">
            <span className="font-semibold text-navy-700">LEFYのみの個別指導もOK。</span>
            <br />
            集団塾が合わないタイプのお子様には個別指導だけの最短ルートも設計します。
          </p>
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

        {/* 大手塾名バッジ行 - グリッドレイアウトで統一 */}
        <div className="mt-10 rounded-xl border-2 border-navy-100 bg-gradient-to-r from-navy-50 to-white p-6">
          <h3 className="mb-5 text-center text-base font-semibold text-navy-700">
            LEFYの塾生が通っている大手集団塾
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {cramSchools.map((school) => (
              <div
                key={school}
                className="flex items-center justify-center rounded-lg bg-gradient-to-r from-navy-600 to-navy-700 px-4 py-3.5 text-center text-sm font-bold text-white shadow-md transition-all hover:from-navy-700 hover:to-navy-800 hover:shadow-lg"
              >
                {school}
              </div>
            ))}
          </div>
        </div>
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
          src="/concerns-section.png"
          alt="LEFYの個別指導で"
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
          {/* パターン1: LEFYを併用し、集団塾の偏差値UP */}
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
                LEFYを併用し、集団塾の偏差値UP
              </h3>
            </div>

            {/* コンテンツエリア */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                {/* 左側：テキストコンテンツ */}
                <div>
                  <p className="mb-4 text-base leading-relaxed text-navy-800">
                    お通いの集団塾のテキストを使ってサポートします。必要に応じて追加テキストや過去問も扱います。
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {['SAPIX', 'Gnoble', '日能研', '四谷大塚', '早稲田アカデミー', '希学園', '浜学園'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-navy-600 px-3 py-1 text-xs font-semibold text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-navy-800">取組イメージ</h4>
                    <ul className="space-y-1.5">
                      {[
                        '宿題の取捨選択',
                        'クラスアップに向け毎月のテスト得点最大化',
                        '志望校特化対策',
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
                </div>

                {/* 右側：画像 */}
                <div className="order-first md:order-last">
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <Image
                      src="/pattern-1.jpg"
                      alt="集団塾との併用イメージ"
                      width={400}
                      height={300}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* パターン2: LEFYオーダーメイド受験 */}
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
                LEFYオーダーメイド受験
              </h3>
            </div>

            {/* コンテンツエリア */}
            <div className="bg-gradient-to-br from-rose-50 to-white p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                {/* 左側：テキストコンテンツ */}
                <div>
                  <p className="mb-4 text-base leading-relaxed text-navy-800">
                    お子さまの性格・タイプ・志望校に合わせて最適な学習プランを設計します
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {['習慣づくり', '土台構築', '志望校対策'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-navy-800">取組イメージ</h4>
                    <ul className="space-y-1.5">
                      {[
                        'お子さまがストレスを感じない適度なレベル感の授業',
                        '着実に消化できる宿題',
                        '完全1対1で一つずつ完璧に身に着けていく',
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
                      src="/pattern-2.jpg"
                      alt="オーダーメイド受験イメージ"
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
            src="/strengths-hero.jpg"
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

      {/* Section: 合格実績 */}
      <section className="-mx-4 mb-20 md:-mx-8">
        <div className="bg-gradient-to-br from-pink-50 via-pink-100 to-rose-50 py-12 px-6 md:py-16 md:px-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-navy-800 md:text-4xl">合格実績</h2>
            <div className="mx-auto mt-3 h-1 w-32 bg-navy-600"></div>
          </div>
          <p className="mb-6 text-center text-base text-navy-800">
            LEFYの生徒たちが合格した学校の一覧です。
          </p>

          {/* 年度選択ボタン */}
          <div className="relative mb-6">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex justify-center gap-3 min-w-max px-4">
                {([2026, 2025, 2024, 2023] as const).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`flex-shrink-0 rounded-lg px-6 py-2.5 text-base font-semibold transition-all ${selectedYear === year
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-white/70 text-rose-800 hover:bg-white'
                      }`}
                  >
                    {year}年
                  </button>
                ))}
              </div>
            </div>
            {/* スクロールインジケーター - 右側 */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-pink-100 to-transparent flex items-center justify-end pr-2 md:hidden">
              <svg className="h-5 w-5 text-rose-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* 選択された年度の合格校 - カテゴリ別表示 */}
          <div className="mx-auto max-w-6xl space-y-6">
            {/* 男子校セクション */}
            {resultsByYear[selectedYear].boys.length > 0 && (
              <div>
                <h4 className="mb-3 text-sm font-semibold text-blue-700">男子校</h4>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {resultsByYear[selectedYear].boys.map((school: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded border-2 border-blue-400 bg-white px-2 py-1.5 text-center text-sm font-semibold text-navy-800 shadow-sm transition-all hover:border-blue-600 hover:shadow-md"
                    >
                      {school}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 女子校セクション */}
            {resultsByYear[selectedYear].girls.length > 0 && (
              <div>
                <h4 className="mb-3 text-sm font-semibold text-fuchsia-700">女子校</h4>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {resultsByYear[selectedYear].girls.map((school: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded border-2 border-fuchsia-500 bg-white px-2 py-1.5 text-center text-sm font-semibold text-navy-800 shadow-sm transition-all hover:border-fuchsia-600 hover:shadow-md"
                    >
                      {school}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 共学セクション */}
            {resultsByYear[selectedYear].coed.length > 0 && (
              <div>
                <h4 className="mb-3 text-sm font-semibold text-green-700">共学</h4>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {resultsByYear[selectedYear].coed.map((school: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded border-2 border-green-400 bg-white px-2 py-1.5 text-center text-sm font-semibold text-navy-800 shadow-sm transition-all hover:border-green-600 hover:shadow-md"
                    >
                      {school}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 3.5: 診断フローチャート */}
      <section className="mb-16">
        <JukenFlowDiagnosis />
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
                  src="https://www.youtube.com/embed/TDDp59h-fmQ"
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
                  src="https://www.youtube.com/embed/nTHk_M8VvV4"
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
