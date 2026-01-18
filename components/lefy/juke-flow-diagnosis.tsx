'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, RotateCcw } from 'lucide-react';

// フローデータ定義
const flowData = {
    title: '個別指導塾の検討・使い方フローチャート',
    nodes: [
        {
            id: 'q1',
            type: 'question',
            question: '中学受験で初めて塾に通う小3（新小4）ですか？',
            options: [
                { label: 'はい', next: 'r1' },
                { label: 'いいえ', next: 'q2' },
            ],
        },
        {
            id: 'q2',
            type: 'question',
            question: '大手集団塾に現在ご通塾で、塾内模試の偏差値は65以上ですか？',
            note: '※最難関校への実績が豊富な塾では65、幅広い層を対象とした塾では68程度',
            options: [
                { label: 'はい', next: 'r2' },
                { label: 'いいえ', next: 'q3' },
            ],
        },
        {
            id: 'q3',
            type: 'question',
            question: '大手集団塾に現在ご通塾で、塾内模試の偏差値は58から63ですか？',
            note: '※最難関校への実績が豊富な塾では58-63、幅広い層を対象とした塾では60-65程度',
            options: [
                { label: 'はい', next: 'r3' },
                { label: 'いいえ', next: 'q4' },
            ],
        },
        {
            id: 'q4',
            type: 'question',
            question: '大手集団塾に現在ご通塾で、塾内模試の偏差値は50から58ですか？',
            options: [
                { label: 'はい', next: 'r4' },
                { label: 'いいえ（50未満）', next: 'q50' },
            ],
        },
        {
            id: 'q50',
            type: 'question',
            question: '（50未満の場合）状況に近いものを選んでください',
            options: [
                {
                    label: '特定科目が弱く、偏差値が40後半／共働きで十分なサポートが難しい',
                    next: 'r50a',
                },
                {
                    label: 'ハイレベルな塾に通っているが、授業・宿題についていけない',
                    next: 'r50b',
                },
                {
                    label: '塾についていけず偏差値40前後以下／親が教えると喧嘩になりやすい',
                    next: 'r50c',
                },
            ],
        },
        // 結果ノード
        {
            id: 'r1',
            type: 'result',
            headline: 'まずは大手集団塾がおすすめ',
            body: '初めて中学受験の塾に通う場合は、基本的には大手集団塾に通塾することをおすすめします。',
            short: '基礎〜標準の学習サイクルを作りやすいです。',
        },
        {
            id: 'r2',
            type: 'result',
            headline: '集団塾メインで最難関校も狙えます',
            body: '集団塾だけで最難関校を狙えます。特定科目が弱い場合は個別指導塾を検討してもよいでしょう。',
            short: '弱点科目だけ個別で補強すると安定します。',
        },
        {
            id: 'r3',
            type: 'result',
            headline: '最難関校を狙うなら"伸ばし方"の工夫が必要',
            body: '最難関校を狙うには要努力です。志望校次第で個別指導塾を検討しましょう。',
            short: '志望校と現状に合わせて、併用の有無を決めましょう。',
        },
        {
            id: 'r4',
            type: 'result',
            headline: '個別（or家庭教師）でワンランク上を狙いやすい',
            body: '個別指導や家庭教師を利用するとワンランク上の学校を狙うことができるでしょう。',
            short: '弱点と学習の回し方を整えるのが効果的です。',
        },
        {
            id: 'r50a',
            type: 'result',
            headline: '個別の"併用"がおすすめ',
            body: '特定の科目が弱く、全体の偏差値が40後半程度。親も共働きで十分なサポートができていない。',
            short: '個別指導塾の併用を検討しましょう。',
        },
        {
            id: 'r50b',
            type: 'result',
            headline: '個別の"利用"をおすすめ（転塾も視野）',
            body: 'ハイレベルな塾に通っていて、授業、宿題についていけない。',
            short: '個別指導塾の利用を検討しましょう。状況次第で転塾も検討しましょう。',
        },
        {
            id: 'r50c',
            type: 'result',
            headline: '個別だけで進めるのも選択肢',
            body: '塾の授業に全然ついていけず、偏差値が40前後以下。親が教えようとしても喧嘩になってしまうことが多い。',
            short: '個別指導塾だけで中学受験をすることも選択肢です。',
        },
    ],
};

export function JukenFlowDiagnosis() {
    const [currentNodeId, setCurrentNodeId] = useState<string>('q1');

    const currentNode = flowData.nodes.find((node) => node.id === currentNodeId);

    const handleReset = () => {
        setCurrentNodeId('q1');
    };

    const handleOption = (nextId: string) => {
        setCurrentNodeId(nextId);
    };

    if (!currentNode) {
        return null;
    }

    const isResult = currentNode.type === 'result';

    return (
        <div className="rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg md:p-8">
            <h3 className="mb-6 text-center text-xl font-bold text-navy-800 sm:text-2xl">
                {flowData.title}
            </h3>

            {!isResult ? (
                // 質問表示
                <div className="space-y-6">
                    <div className="rounded-lg border border-blue-200 bg-white p-6 shadow-sm">
                        <h4 className="mb-4 text-lg font-semibold leading-relaxed text-navy-800">
                            {currentNode.question}
                        </h4>
                        {currentNode.note && (
                            <p className="mb-4 text-xs text-navy-500">{currentNode.note}</p>
                        )}
                        <div className="flex flex-col gap-3">
                            {currentNode.options?.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOption(option.next)}
                                    className="rounded-lg border-2 border-blue-600 bg-white px-6 py-3 text-left text-sm font-semibold text-blue-700 transition-all hover:bg-blue-600 hover:text-white"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-lg border border-navy-100 bg-navy-50 p-4 text-center">
                        <p className="text-sm text-navy-600">
                            選択肢をクリックすると、あなたに合った方針が表示されます
                        </p>
                    </div>
                </div>
            ) : (
                // 結果表示
                <div className="space-y-6">
                    <div className="rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-md">
                        <div className="mb-4 flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                                ✓
                            </div>
                            <div>
                                <h4 className="mb-2 text-xl font-bold text-blue-700">
                                    {currentNode.headline}
                                </h4>
                                <p className="mb-3 text-sm leading-relaxed text-navy-700">
                                    {currentNode.body}
                                </p>
                                <p className="text-sm italic text-navy-600">{currentNode.short}</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3">
                        <p className="text-center text-sm font-semibold text-navy-700">
                            次のステップ
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/contact"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
                            >
                                無料相談を予約する
                            </Link>
                            <Link
                                href="https://lin.ee/P0lR1LD"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-line px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-line-dark"
                            >
                                <MessageCircle className="h-4 w-4" />
                                LINEで相談する
                            </Link>
                        </div>
                        <button
                            onClick={handleReset}
                            className="mx-auto flex items-center gap-2 rounded-lg border border-navy-300 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition-all hover:bg-navy-50"
                        >
                            <RotateCcw className="h-4 w-4" />
                            もう一度診断する
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
