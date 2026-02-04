'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Award, CheckCircle, ChevronDown } from 'lucide-react';

// 年度別・学校種別合格実績データ（aboutページから再利用）
interface SchoolCategory {
    boys: string[];      // 男子校
    girls: string[];     // 女子校
    coed: string[];      // 共学
}

const resultsByYear: Record<2026 | 2025 | 2024 | 2023, SchoolCategory> = {
    2026: {
        boys: ['海陽', '立教新座', '高輪', 'サレジオ学院', '聖光学院', '桐光'],
        girls: ['淑徳与野', '捜真女学校', '不二聖心女子学院', 'フェリス女学院', '湘南白百合', '聖セシリア女子中学校', '東洋英和', '清泉', '横浜共立', '鎌倉女子'],
        coed: ['栄東', '埼玉栄', '宮崎日大', '佐久長聖', '明大世田谷', '山手学院', '関東学院', '神奈川大学附属', '東京大学附属', '横浜創英', '青陵', '桐蔭', '品川翔英', '三田国際科学学園（IC）', '日大日吉', '横須賀学院']
    },
    2025: {
        boys: ['開成', '浅野', '聖光学院', 'サレジオ学院', '逗子開成', '鎌倉学園', '静岡聖光', '藤嶺学園藤沢', '武相'],
        girls: ['香蘭', '淑徳与野'],
        coed: ['愛光', '青山学院横浜英和', '市川', '開智', '神奈川大学附属', '関東学院', '桐蔭学園', '桐光学園', '埼玉栄', '栄東(東大クラス特待・難関大)', '佐久長聖(特待C含む)', '東京都市大学等々力(特選)', '日本大学', '日本大学藤沢', '三田国際(ISC、MSTC)', '八雲学園', '山手学院(特待含む)', '横浜創英', '早稲田佐賀']
    },
    2024: {
        boys: ['栄光学園', 'サレジオ学院', '逗子開成'],
        girls: [],
        coed: ['神奈川大学附属', '佐久長聖', '佐久長聖（特待B）', '中央大学附属横浜', '桐蔭学園（特待）', '森村学園（特待）', '山手学院']
    },
    2023: {
        boys: ['静岡聖光'],
        girls: ['フェリス女学院', '田園調布学園（午後算数）'],
        coed: ['佐久長聖（特待A）', '桐光学園', '関東学院', '宝仙学園（特待）']
    }
};

// 合格者の声データ（aboutページから取得、中高一貫校生・大学受験ページのものは除く）
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

// TestimonialCard コンポーネント（aboutページと同じ）
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

export default function ResultsPage() {
    const [selectedYear, setSelectedYear] = useState<2026 | 2025 | 2024 | 2023>(2026);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-white">
            {/* ヒーローセクション */}
            <section className="relative overflow-hidden bg-gradient-to-br from-navy-700 via-navy-800 to-slate-900 py-20 px-6 text-center md:py-28">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#D9EEEF] blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-white blur-3xl"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-4xl">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-2xl bg-[#D9EEEF]/20 p-4 backdrop-blur-sm">
                            <Award className="h-12 w-12 text-[#D9EEEF] md:h-14 md:w-14" />
                        </div>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                        LEFYの合格実績一覧
                    </h1>

                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
                        小規模な個別指導塾から開成、聖光学院、栄光学園、フェリス女学院など、<br className="hidden md:block" />
                        難関校への合格者を輩出
                    </p>

                    <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
                        <div className="h-2 w-2 rounded-full bg-[#D9EEEF]"></div>
                        <p className="text-lg font-semibold text-white">LEFY 中学受験専門個別指導</p>
                    </div>
                </div>
            </section>

            {/* 合格実績セクション */}
            <section className="py-16 px-4 md:py-20 md:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <div className="mb-3 inline-block rounded-full bg-[#D9EEEF]/30 px-4 py-1.5">
                            <span className="text-sm font-semibold text-navy-700">ACHIEVEMENTS</span>
                        </div>
                        <h2 className="mb-4 text-3xl font-bold text-navy-800 md:text-4xl">
                            合格実績
                        </h2>
                    </div>

                    <div className="mb-10">
                        <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                            {([2026, 2025, 2024, 2023] as const).map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`flex-shrink-0 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${selectedYear === year
                                        ? 'bg-navy-700 text-white shadow-lg shadow-navy-700/20'
                                        : 'bg-white text-slate-600 shadow-sm hover:bg-slate-50'
                                        }`}
                                >
                                    {year}年度
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                        {resultsByYear[selectedYear].boys.length > 0 && (
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                                    <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-600">男子校</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {resultsByYear[selectedYear].boys.map((school: string, index: number) => (
                                        <div key={index} className="group relative overflow-hidden rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-white px-3 py-3.5 text-center text-sm font-medium text-navy-800 shadow-sm transition-all hover:border-blue-400 hover:shadow-md">
                                            <CheckCircle className="absolute -right-1 -top-1 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                            {school}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {resultsByYear[selectedYear].girls.length > 0 && (
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="h-1 w-1 rounded-full bg-pink-500"></div>
                                    <h4 className="text-sm font-semibold uppercase tracking-wide text-pink-600">女子校</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {resultsByYear[selectedYear].girls.map((school: string, index: number) => (
                                        <div key={index} className="group relative overflow-hidden rounded-lg border border-pink-200 bg-gradient-to-br from-pink-50 to-white px-3 py-3.5 text-center text-sm font-medium text-navy-800 shadow-sm transition-all hover:border-pink-400 hover:shadow-md">
                                            <CheckCircle className="absolute -right-1 -top-1 h-5 w-5 text-pink-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                            {school}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {resultsByYear[selectedYear].coed.length > 0 && (
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="h-1 w-1 rounded-full bg-emerald-500"></div>
                                    <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">共学</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {resultsByYear[selectedYear].coed.map((school: string, index: number) => (
                                        <div key={index} className="group relative overflow-hidden rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white px-3 py-3.5 text-center text-sm font-medium text-navy-800 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md">
                                            <CheckCircle className="absolute -right-1 -top-1 h-5 w-5 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                            {school}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 合格者の声セクション */}
            <section className="bg-gradient-to-br from-slate-100 to-slate-50 py-16 px-4 md:py-20 md:px-8">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-12 text-center">
                        <div className="mb-3 inline-block rounded-full bg-white/80 px-4 py-1.5 shadow-sm">
                            <span className="text-sm font-semibold text-navy-700">VOICES</span>
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

            {/* フッター */}
            <footer className="border-t border-slate-200 bg-white py-8 px-4 text-center">
                <p className="text-sm text-slate-500">© 2026 LEFY 中学受験専門個別指導. All rights reserved.</p>
                <div className="mt-4">
                    <Link href="/" className="text-sm font-medium text-navy-700 transition-colors hover:text-navy-900">
                        ホームページへ戻る
                    </Link>
                </div>
            </footer>
        </div>
    );
}
