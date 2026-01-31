'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { DateField } from '@/components/forms/DateField';

export default function CounselingPage() {
    const [formData, setFormData] = useState({
        studentLastName: '',
        studentFirstName: '',
        studentLastNameKana: '',
        studentFirstNameKana: '',
        parentLastName: '',
        parentFirstName: '',
        parentLastNameKana: '',
        parentFirstNameKana: '',

        grade: '',
        schoolName: '',
        availableSchedule: {},
        firstChoiceDate: '',
        firstChoiceStartTime: '',
        firstChoiceEndTime: '',
        secondChoiceDate: '',
        secondChoiceStartTime: '',
        secondChoiceEndTime: '',
        thirdChoiceDate: '',
        thirdChoiceStartTime: '',
        thirdChoiceEndTime: '',
        subject: '',
        lessonContentPreference: '',
        lefyDecideDetails: '',
        specifyDetails: '',
        email: '',
        emailConfirm: '',
        phone1: '',
        phone2: '',
        phone3: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [emailError, setEmailError] = useState('');

    // 時間選択肢生成（13:00-21:00、30分刻み）
    const timeOptions = [];
    for (let hour = 13; hour <= 21; hour++) {
        timeOptions.push(`${hour}:00`);
        if (hour < 21) {
            timeOptions.push(`${hour}:30`);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // メールアドレス一致チェック
        if (formData.email !== formData.emailConfirm) {
            setEmailError('メールアドレスが一致しません');
            return;
        }
        setEmailError('');


        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send-trial-lesson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert('送信に失敗しました。もう一度お試しください。');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('送信に失敗しました。もう一度お試しください。');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        // メールアドレス確認のエラーをクリア
        if (e.target.name === 'email' || e.target.name === 'emailConfirm') {
            setEmailError('');
        }
    };

    if (isSubmitted) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-16">
                <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-8 text-center">
                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
                    <h2 className="mb-3 text-2xl font-bold text-navy-800">お申し込みありがとうございます</h2>
                    <p className="mb-6 text-navy-600">
                        体験授業のお申し込みを受け付けました。<br />
                        担当者より3営業日以内にご連絡させていただきます。
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg bg-navy-600 px-6 py-3 font-bold text-white transition-all hover:bg-navy-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        トップページに戻る
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-2 py-8 md:px-4">
            <Link
                href="/"
                className="mb-6 inline-flex items-center gap-1 text-sm text-navy-500 transition-colors hover:text-navy-700"
            >
                <ArrowLeft className="h-4 w-4" />
                トップに戻る
            </Link>

            {/* ヘッダー */}
            <section className="mb-8 text-center">
                <h1 className="mb-3 text-3xl font-bold text-navy-800 md:text-4xl">
                    体験授業
                </h1>
                <div className="mx-auto mt-3 h-1 w-32 bg-navy-600"></div>
                <p className="mt-6 text-base text-navy-600">
                    お子さまの学習状況や目標に合わせて、最適な学習プランをご提案いたします。<br />
                    無料でご相談いただけますので、お気軽にお申し込みください。
                </p>
            </section>

            {/* フォーム */}
            <section className="rounded-2xl border-2 border-navy-200 bg-white p-3 shadow-lg md:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 生徒ご本人の氏名 */}
                    <div>
                        <label className="mb-2 block text-sm font-bold text-navy-800">
                            生徒ご本人の氏名 <span className="text-red-600">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="studentLastName"
                                value={formData.studentLastName}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="姓"
                            />
                            <input
                                type="text"
                                name="studentFirstName"
                                value={formData.studentFirstName}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="名"
                            />
                        </div>
                    </div>

                    {/* 生徒ご本人の氏名（フリガナ） */}
                    <div>
                        <label className="mb-2 block text-sm font-bold text-navy-800">
                            生徒ご本人の氏名（フリガナ） <span className="text-red-600">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="studentLastNameKana"
                                value={formData.studentLastNameKana}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="セイ"
                            />
                            <input
                                type="text"
                                name="studentFirstNameKana"
                                value={formData.studentFirstNameKana}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="メイ"
                            />
                        </div>
                    </div>

                    {/* 保護者様の氏名 */}
                    <div>
                        <label className="mb-2 block text-sm font-bold text-navy-800">
                            保護者様の氏名 <span className="text-red-600">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="parentLastName"
                                value={formData.parentLastName}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="姓"
                            />
                            <input
                                type="text"
                                name="parentFirstName"
                                value={formData.parentFirstName}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="名"
                            />
                        </div>
                    </div>

                    {/* 保護者様の氏名（フリガナ） */}
                    <div>
                        <label className="mb-2 block text-sm font-bold text-navy-800">
                            保護者様の氏名（フリガナ） <span className="text-red-600">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="parentLastNameKana"
                                value={formData.parentLastNameKana}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="セイ"
                            />
                            <input
                                type="text"
                                name="parentFirstNameKana"
                                value={formData.parentFirstNameKana}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="メイ"
                            />
                        </div>
                    </div>


                    {/* 学年 */}
                    <div>
                        <label htmlFor="grade" className="mb-2 block text-sm font-bold text-navy-800">
                            学年 <span className="text-red-600">*</span>
                        </label>
                        <select
                            id="grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                        >
                            <option value="">選択してください</option>
                            <option value="小学1年生">小学1年生</option>
                            <option value="小学2年生">小学2年生</option>
                            <option value="小学3年生">小学3年生</option>
                            <option value="小学4年生">小学4年生</option>
                            <option value="小学5年生">小学5年生</option>
                            <option value="小学6年生">小学6年生</option>
                            <option value="中学1年生">中学1年生</option>
                            <option value="中学2年生">中学2年生</option>
                            <option value="中学3年生">中学3年生</option>
                            <option value="高校1年生">高校1年生</option>
                            <option value="高校2年生">高校2年生</option>
                            <option value="高校3年生">高校3年生</option>
                            <option value="その他">その他</option>
                        </select>
                    </div>

                    {/* 学校名 */}
                    <div>
                        <label htmlFor="schoolName" className="mb-2 block text-sm font-bold text-navy-800">
                            学校名
                        </label>
                        <input
                            type="text"
                            id="schoolName"
                            name="schoolName"
                            value={formData.schoolName}
                            onChange={handleChange}
                            className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                            placeholder="例： 横浜市立○○小学校"
                        />
                    </div>

                    {/* 希望日入力の説明 */}
                    <div className="rounded-lg bg-blue-50 p-4">
                        <p className="text-sm text-navy-700">
                            各希望日ごとに、お越しいただける時間帯をご入力ください。所要時間は30分から1時間程度です。<br />
                            <span className="text-xs text-navy-600">例：2026/1/1 15:00～18:00</span>
                        </p>
                    </div>

                    {/* 第1希望日 */}
                    <div className="rounded-lg bg-navy-50 p-3 md:p-4">
                        <label className="mb-3 block text-sm font-bold text-navy-800">
                            第1希望日 <span className="text-red-600">*</span>
                        </label>
                        <div className="space-y-3">
                            <DateField
                                label=""
                                name="firstChoiceDate"
                                value={formData.firstChoiceDate}
                                onChange={(v) => setFormData({ ...formData, firstChoiceDate: v })}
                                required
                            />
                            <div className="flex items-center gap-2">
                                <select
                                    name="firstChoiceStartTime"
                                    value={formData.firstChoiceStartTime}
                                    onChange={handleChange}
                                    required
                                    className="flex-1 rounded-lg border-2 border-navy-200 px-2 py-3 text-sm text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                >
                                    <option value="">--:--</option>
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                <span className="shrink-0 text-sm text-navy-600">～</span>
                                <select
                                    name="firstChoiceEndTime"
                                    value={formData.firstChoiceEndTime}
                                    onChange={handleChange}
                                    required
                                    className="flex-1 rounded-lg border-2 border-navy-200 px-2 py-3 text-sm text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                >
                                    <option value="">--:--</option>
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 第2希望日 */}
                    <div className="rounded-lg bg-navy-50 p-3 md:p-4">
                        <label className="mb-3 block text-sm font-bold text-navy-800">
                            第2希望日 <span className="text-red-600">*</span>
                        </label>
                        <div className="space-y-3">
                            <DateField
                                label=""
                                name="secondChoiceDate"
                                value={formData.secondChoiceDate}
                                onChange={(v) => setFormData({ ...formData, secondChoiceDate: v })}
                                required
                            />
                            <div className="flex items-center gap-2">
                                <select
                                    name="secondChoiceStartTime"
                                    value={formData.secondChoiceStartTime}
                                    onChange={handleChange}
                                    required
                                    className="flex-1 rounded-lg border-2 border-navy-200 px-2 py-3 text-sm text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                >
                                    <option value="">--:--</option>
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                <span className="shrink-0 text-sm text-navy-600">～</span>
                                <select
                                    name="secondChoiceEndTime"
                                    value={formData.secondChoiceEndTime}
                                    onChange={handleChange}
                                    required
                                    className="flex-1 rounded-lg border-2 border-navy-200 px-2 py-3 text-sm text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                >
                                    <option value="">--:--</option>
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 第3希望日 */}
                    <div className="rounded-lg bg-navy-50 p-3 md:p-4">
                        <label className="mb-3 block text-sm font-bold text-navy-800">
                            第3希望日 <span className="text-red-600">*</span>
                        </label>
                        <div className="space-y-3">
                            <DateField
                                label=""
                                name="thirdChoiceDate"
                                value={formData.thirdChoiceDate}
                                onChange={(v) => setFormData({ ...formData, thirdChoiceDate: v })}
                                required
                            />
                            <div className="flex items-center gap-2">
                                <select
                                    name="thirdChoiceStartTime"
                                    value={formData.thirdChoiceStartTime}
                                    onChange={handleChange}
                                    required
                                    className="flex-1 rounded-lg border-2 border-navy-200 px-2 py-3 text-sm text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                >
                                    <option value="">--:--</option>
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                <span className="shrink-0 text-sm text-navy-600">～</span>
                                <select
                                    name="thirdChoiceEndTime"
                                    value={formData.thirdChoiceEndTime}
                                    onChange={handleChange}
                                    required
                                    className="flex-1 rounded-lg border-2 border-navy-200 px-2 py-3 text-sm text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                >
                                    <option value="">--:--</option>
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 科目 */}
                    <div>
                        <label htmlFor="subject" className="mb-2 block text-sm font-bold text-navy-800">
                            科目 <span className="text-red-600">*</span>
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                        >
                            <option value="">選択してください</option>
                            <option value="算数">算数</option>
                            <option value="国語">国語</option>
                            <option value="理科">理科</option>
                            <option value="社会">社会</option>
                        </select>
                    </div>

                    {/* 体験授業で扱ってほしい内容 */}
                    <div>
                        <label htmlFor="lessonContentPreference" className="mb-2 block text-sm font-bold text-navy-800">
                            体験授業で扱ってほしい内容 <span className="text-red-600">*</span>
                        </label>
                        <select
                            id="lessonContentPreference"
                            name="lessonContentPreference"
                            value={formData.lessonContentPreference}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                        >
                            <option value="">選択してください</option>
                            <option value="LEFYに決めてほしい">LEFYに決めてほしい</option>
                            <option value="指定する">指定する</option>
                        </select>

                        {/* LEFYに決めてほしい場合の詳細 */}
                        {formData.lessonContentPreference === 'LEFYに決めてほしい' && (
                            <textarea
                                name="lefyDecideDetails"
                                value={formData.lefyDecideDetails}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="mt-3 w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="現在お通いの集団塾、および毎月のテストの成績をご入力ください。"
                            />
                        )}

                        {/* 指定する場合の詳細 */}
                        {formData.lessonContentPreference === '指定する' && (
                            <textarea
                                name="specifyDetails"
                                value={formData.specifyDetails}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="mt-3 w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="ご指定内容をご記載ください。例：サピックスのデイリーサポート"
                            />
                        )}
                    </div>

                    {/* ご入塾後、ご通塾可能な曜日と時間帯 */}
                    <div>
                        <label className="mb-3 block text-sm font-bold text-navy-800">
                            体験授業後のフィードバック <span className="text-red-600">*</span>
                        </label>
                        <select
                            required
                            className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                        >
                            <option value="">選択してください</option>
                        </select>
                    </div>

                    {/* ご入塾後、ご通塾可能な曜日と時間帯 */}
                    <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4">
                        <p className="mb-4 text-sm text-navy-700">
                            ご入塾後、ご通塾可能な曜日と時間帯を複数ご選択ください。
                        </p>
                        <p className="mb-4 text-xs text-blue-700">
                            ※ご入塾後に担当する講師の体験授業を担当するためです
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="bg-blue-100">
                                        <th className="border border-navy-200 px-2 py-2.5 text-left text-xs font-semibold text-navy-700 sm:px-3">時間帯</th>
                                        <th className="border border-navy-200 px-2 py-2.5 text-center text-xs font-semibold text-navy-700 sm:px-3">月</th>
                                        <th className="border border-navy-200 px-2 py-2.5 text-center text-xs font-semibold text-navy-700 sm:px-3">火</th>
                                        <th className="border border-navy-200 px-2 py-2.5 text-center text-xs font-semibold text-navy-700 sm:px-3">水</th>
                                        <th className="border border-navy-200 px-2 py-2.5 text-center text-xs font-semibold text-navy-700 sm:px-3">木</th>
                                        <th className="border border-navy-200 px-2 py-2.5 text-center text-xs font-semibold text-navy-700 sm:px-3">金</th>
                                        <th className="border border-navy-200 px-2 py-2.5 text-center text-xs font-semibold text-navy-700 sm:px-3">土</th>
                                        <th className="border border-navy-200 px-2 py-2.5 text-center text-xs font-semibold text-navy-700 sm:px-3">日</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {[
                                        { time: '12:30-13:50', weekdays: false, sat: true, sun: true },
                                        { time: '14:00-15:20', weekdays: false, sat: true, sun: true },
                                        { time: '15:30-16:50', weekdays: true, sat: true, sun: true },
                                        { time: '17:00-18:20', weekdays: true, sat: true, sun: true },
                                        { time: '18:30-19:50', weekdays: true, sat: true, sun: true },
                                        { time: '20:00-21:20', weekdays: true, sat: true, sun: false },
                                    ].map((row, index) => (
                                        <tr key={index} className="hover:bg-blue-50">
                                            <td className="border border-navy-200 bg-gray-50 px-2 py-2.5 text-xs font-medium text-navy-700 sm:px-3">{row.time}</td>
                                            {['月', '火', '水', '木', '金'].map((day) => {
                                                const isDisabled = !row.weekdays;
                                                const checkboxId = `schedule-${row.time}-${day}`;
                                                return (
                                                    <td key={day} className="border border-navy-200 px-2 py-2 text-center">
                                                        {isDisabled ? (
                                                            <span className="text-gray-400">×</span>
                                                        ) : (
                                                            <input
                                                                type="checkbox"
                                                                id={checkboxId}
                                                                onChange={(e) => {
                                                                    setFormData({
                                                                        ...formData,
                                                                        availableSchedule: {
                                                                            ...formData.availableSchedule,
                                                                            [checkboxId]: e.target.checked
                                                                        }
                                                                    });
                                                                }}
                                                                className="h-4 w-4 cursor-pointer rounded border-navy-300 text-navy-600 focus:ring-navy-500"
                                                            />
                                                        )}
                                                    </td>
                                                );
                                            })}
                                            {['土', '日'].map((day) => {
                                                const isDisabled = (day === '土' && !row.sat) || (day === '日' && !row.sun);
                                                const checkboxId = `schedule-${row.time}-${day}`;
                                                return (
                                                    <td key={day} className="border border-navy-200 px-2 py-2 text-center">
                                                        {isDisabled ? (
                                                            <span className="text-gray-400">×</span>
                                                        ) : (
                                                            <input
                                                                type="checkbox"
                                                                id={checkboxId}
                                                                onChange={(e) => {
                                                                    setFormData({
                                                                        ...formData,
                                                                        availableSchedule: {
                                                                            ...formData.availableSchedule,
                                                                            [checkboxId]: e.target.checked
                                                                        }
                                                                    });
                                                                }}
                                                                className="h-4 w-4 cursor-pointer rounded border-navy-300 text-navy-600 focus:ring-navy-500"
                                                            />
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-4 text-xs text-navy-600">
                            体験授業の候補日を3つ教えてください。
                        </p>
                    </div>

                    {/* メールアドレス */}
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-bold text-navy-800">
                            メールアドレス <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                            placeholder="example@email.com"
                        />
                    </div>

                    {/* メールアドレス（確認用） */}
                    <div>
                        <label htmlFor="emailConfirm" className="mb-2 block text-sm font-bold text-navy-800">
                            メールアドレス（確認用） <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="email"
                            id="emailConfirm"
                            name="emailConfirm"
                            value={formData.emailConfirm}
                            onChange={handleChange}
                            required
                            className={`w-full rounded-lg border-2 px-4 py-3 text-navy-800 transition-colors focus:outline-none ${emailError ? 'border-red-500 focus:border-red-500' : 'border-navy-200 focus:border-navy-600'
                                }`}
                            placeholder="example@email.com"
                        />
                        {emailError && (
                            <p className="mt-2 text-sm text-red-600">{emailError}</p>
                        )}
                    </div>

                    {/* 電話番号 */}
                    <div>
                        <label className="mb-2 block text-sm font-bold text-navy-800">
                            電話番号 <span className="text-red-600">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="tel"
                                name="phone1"
                                value={formData.phone1}
                                onChange={handleChange}
                                required
                                maxLength={5}
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="090"
                            />
                            <span className="text-navy-600">-</span>
                            <input
                                type="tel"
                                name="phone2"
                                value={formData.phone2}
                                onChange={handleChange}
                                required
                                maxLength={4}
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="1234"
                            />
                            <span className="text-navy-600">-</span>
                            <input
                                type="tel"
                                name="phone3"
                                value={formData.phone3}
                                onChange={handleChange}
                                required
                                maxLength={4}
                                className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                                placeholder="5678"
                            />
                        </div>
                    </div>

                    {/* 質問したい内容・要望など */}
                    <div>
                        <label htmlFor="message" className="mb-2 block text-sm font-bold text-navy-800">
                            質問したい内容・要望など
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full rounded-lg border-2 border-navy-200 px-4 py-3 text-navy-800 transition-colors focus:border-navy-600 focus:outline-none"
                            placeholder="ご質問やご要望などがございましたら、こちらにご記入ください。"
                        />
                    </div>

                    {/* 送信ボタン */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy-600 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-navy-700 hover:shadow-xl disabled:opacity-50"
                    >
                        <Send className="h-5 w-5" />
                        {isSubmitting ? '送信中...' : '体験授業を申し込む'}
                    </button>
                </form>

                {/* 注意事項 */}
                <div className="mt-6 rounded-lg bg-navy-50 p-4">
                    <p className="text-xs text-navy-600">
                        ※ 送信いただいた内容は、info@lefy.jp へ通知されます。<br />
                        ※ 3営業日以内に担当者よりご連絡させていただきます。<br />
                        ※ 無料カウンセリング後、入塾を強くお勧めすることはありません。
                    </p>
                </div>
            </section>
        </div>
    );
}
