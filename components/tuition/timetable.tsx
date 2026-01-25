'use client';

import { SectionHeader } from '@/components/lefy/section-header';

const timetableData = [
    { time: '12:30-13:50', weekday: '×', saturday: '×', sunday: '○', session: '○' },
    { time: '14:00-15:20', weekday: '×', saturday: '○', sunday: '○', session: '○' },
    { time: '15:30-16:50', weekday: '×', saturday: '○', sunday: '○', session: '○' },
    { time: '17:00-18:20', weekday: '○', saturday: '○', sunday: '○', session: '△' },
    { time: '18:30-19:50', weekday: '○', saturday: '○', sunday: '○', session: '△' },
    { time: '20:00-21:20', weekday: '○', saturday: '○', sunday: '×', session: '△' },
];

const legends = [
    { symbol: '○', label: '受講可能', color: 'text-green-600', bg: 'bg-green-600' },
    { symbol: '×', label: '受講不可', color: 'text-red-600', bg: 'bg-red-600' },
    { symbol: '△', label: '要相談', color: 'text-orange-600', bg: 'bg-orange-600' },
];

export function Timetable() {
    return (
        <div className="bg-white">
            <SectionHeader title="時間割" />

            {/* Legend */}
            <div className="mb-8 flex flex-wrap items-center gap-5 border-b border-gray-200 pb-6">
                {legends.map((legend) => (
                    <div key={legend.symbol} className="flex items-center gap-3">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${legend.bg} text-base font-bold text-white`}>
                            {legend.symbol}
                        </span>
                        <span className="text-base font-medium text-navy-700">{legend.label}</span>
                    </div>
                ))}
            </div>

            {/* Timetable - Desktop */}
            <div className="hidden overflow-hidden border-2 border-gray-300 sm:block">
                <table className="w-full">
                    <thead>
                        <tr className="bg-navy-600">
                            <th className="border-r border-gray-300 bg-white px-8 py-5 text-left text-base font-bold text-navy-800">
                                時間帯
                            </th>
                            <th className="border-r border-white/20 px-8 py-5 text-center text-base font-bold text-white">
                                平日（月～金）
                            </th>
                            <th className="border-r border-white/20 px-8 py-5 text-center text-base font-bold text-white">
                                土曜日
                            </th>
                            <th className="border-r border-white/20 px-8 py-5 text-center text-base font-bold text-white">
                                日曜日
                            </th>
                            <th className="px-8 py-5 text-center text-base font-bold text-white">
                                講習期間
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetableData.map((row, index) => (
                            <tr
                                key={row.time}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            >
                                <td className="border-r border-gray-300 px-8 py-6 text-base font-semibold text-navy-800">
                                    {row.time}
                                </td>
                                <td className="border-r border-gray-200 px-8 py-6 text-center">
                                    <span className={`text-3xl font-bold ${row.weekday === '○' ? 'text-green-600' :
                                            row.weekday === '×' ? 'text-red-600' : 'text-orange-600'
                                        }`}>
                                        {row.weekday}
                                    </span>
                                </td>
                                <td className="border-r border-gray-200 px-8 py-6 text-center">
                                    <span className={`text-3xl font-bold ${row.saturday === '○' ? 'text-green-600' :
                                            row.saturday === '×' ? 'text-red-600' : 'text-orange-600'
                                        }`}>
                                        {row.saturday}
                                    </span>
                                </td>
                                <td className="border-r border-gray-200 px-8 py-6 text-center">
                                    <span className={`text-3xl font-bold ${row.sunday === '○' ? 'text-green-600' :
                                            row.sunday === '×' ? 'text-red-600' : 'text-orange-600'
                                        }`}>
                                        {row.sunday}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <span className={`text-3xl font-bold ${row.session === '○' ? 'text-green-600' :
                                            row.session === '×' ? 'text-red-600' : 'text-orange-600'
                                        }`}>
                                        {row.session}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Timetable - Mobile */}
            <div className="overflow-x-auto sm:hidden">
                <div className="min-w-[650px] overflow-hidden border-2 border-gray-300">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-navy-600">
                                <th className="border-r border-gray-300 bg-white px-5 py-4 text-left text-sm font-bold text-navy-800">
                                    時間帯
                                </th>
                                <th className="border-r border-white/20 px-4 py-4 text-center text-sm font-bold text-white">
                                    平日<br />(月～金)
                                </th>
                                <th className="border-r border-white/20 px-4 py-4 text-center text-sm font-bold text-white">
                                    土
                                </th>
                                <th className="border-r border-white/20 px-4 py-4 text-center text-sm font-bold text-white">
                                    日
                                </th>
                                <th className="px-4 py-4 text-center text-sm font-bold text-white">
                                    講習<br />期間
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {timetableData.map((row, index) => (
                                <tr
                                    key={row.time}
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    <td className="border-r border-gray-300 px-5 py-4 text-sm font-semibold text-navy-800">
                                        {row.time}
                                    </td>
                                    <td className="border-r border-gray-200 px-4 py-4 text-center">
                                        <span className={`text-xl font-bold ${row.weekday === '○' ? 'text-green-600' :
                                                row.weekday === '×' ? 'text-red-600' : 'text-orange-600'
                                            }`}>
                                            {row.weekday}
                                        </span>
                                    </td>
                                    <td className="border-r border-gray-200 px-4 py-4 text-center">
                                        <span className={`text-xl font-bold ${row.saturday === '○' ? 'text-green-600' :
                                                row.saturday === '×' ? 'text-red-600' : 'text-orange-600'
                                            }`}>
                                            {row.saturday}
                                        </span>
                                    </td>
                                    <td className="border-r border-gray-200 px-4 py-4 text-center">
                                        <span className={`text-xl font-bold ${row.sunday === '○' ? 'text-green-600' :
                                                row.sunday === '×' ? 'text-red-600' : 'text-orange-600'
                                            }`}>
                                            {row.sunday}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-xl font-bold ${row.session === '○' ? 'text-green-600' :
                                                row.session === '×' ? 'text-red-600' : 'text-orange-600'
                                            }`}>
                                            {row.session}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Note */}
            <div className="mt-6 border-l-4 border-blue-500 bg-blue-50 p-5">
                <p className="text-base leading-relaxed text-navy-700">
                    <span className="font-semibold">※ ご注意：</span>◯の時間帯でご受講可能です。ただし、学校が終わる時間等によっては、△、×の箇所でも対応できる可能性がございますので、お気軽にご相談ください。
                </p>
            </div>
        </div>
    );
}
