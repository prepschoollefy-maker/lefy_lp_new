import { google } from 'googleapis';
import path from 'path';

// サービスアカウント認証
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'lefy-lp-f519b691d0a6.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * スプレッドシートに行を追加する
 */
export async function appendRowToSheet(spreadsheetId: string, rowData: string[]) {
    try {
        console.log('[Sheets] Appending row to sheet:', spreadsheetId);

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:Z',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [rowData],
            },
        });

        console.log('[Sheets] Row appended successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('[Sheets] Error appending row:', error);
        throw error;
    }
}

/**
 * 体験授業フォームのデータをシート用の配列に変換する
 */
export function formatTrialLessonData(body: {
    studentLastName: string;
    studentFirstName: string;
    studentLastNameKana: string;
    studentFirstNameKana: string;
    parentLastName: string;
    parentFirstName: string;
    parentLastNameKana: string;
    parentFirstNameKana: string;
    relationship: string;
    relationshipOther?: string;
    grade: string;
    schoolName?: string;
    firstChoiceDate: string;
    firstChoiceStartTime: string;
    firstChoiceEndTime: string;
    secondChoiceDate: string;
    secondChoiceStartTime: string;
    secondChoiceEndTime: string;
    thirdChoiceDate: string;
    thirdChoiceStartTime: string;
    thirdChoiceEndTime: string;
    subject?: string;
    lessonContentPreference?: string;
    lefyDecideDetails?: string;
    specifyDetails?: string;
    email: string;
    phone1: string;
    phone2: string;
    phone3: string;
    message?: string;
    availableSlots?: string[];
    feedback?: string;
}): string[] {
    const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    const relationship = body.relationship === 'その他'
        ? body.relationshipOther || 'その他'
        : body.relationship;
    const phone = `${body.phone1}-${body.phone2}-${body.phone3}`;

    // 通塾可能時間帯のフォーマット
    const formatAvailableSlots = (slots: string[] | undefined) => {
        if (!slots || slots.length === 0) return '';
        const slotsByDay: { [key: string]: string[] } = {};
        slots.forEach(slot => {
            const [day, time] = slot.split('_');
            if (!slotsByDay[day]) slotsByDay[day] = [];
            slotsByDay[day].push(time);
        });
        return Object.entries(slotsByDay)
            .map(([day, times]) => `${day}: ${times.join(', ')}`)
            .join(' / ');
    };

    return [
        timestamp,
        `${body.studentLastName} ${body.studentFirstName}`,
        `${body.studentLastNameKana} ${body.studentFirstNameKana}`,
        `${body.parentLastName} ${body.parentFirstName}`,
        `${body.parentLastNameKana} ${body.parentFirstNameKana}`,
        relationship,
        body.grade,
        body.schoolName || '',
        body.email,
        phone,
        `${body.firstChoiceDate} ${body.firstChoiceStartTime}〜${body.firstChoiceEndTime}`,
        `${body.secondChoiceDate} ${body.secondChoiceStartTime}〜${body.secondChoiceEndTime}`,
        `${body.thirdChoiceDate} ${body.thirdChoiceStartTime}〜${body.thirdChoiceEndTime}`,
        body.subject || '',
        body.lessonContentPreference || '',
        body.lefyDecideDetails || body.specifyDetails || '',
        formatAvailableSlots(body.availableSlots),
        body.feedback || '',
        body.message || '',
    ];
}

/**
 * 学習相談フォームのデータをシート用の配列に変換する
 */
export function formatCounselingData(body: {
    studentLastName: string;
    studentFirstName: string;
    studentLastNameKana: string;
    studentFirstNameKana: string;
    parentLastName: string;
    parentFirstName: string;
    parentLastNameKana: string;
    parentFirstNameKana: string;
    relationship: string;
    relationshipOther?: string;
    grade: string;
    schoolName?: string;
    firstChoiceDate: string;
    firstChoiceStartTime: string;
    firstChoiceEndTime: string;
    secondChoiceDate: string;
    secondChoiceStartTime: string;
    secondChoiceEndTime: string;
    thirdChoiceDate: string;
    thirdChoiceStartTime: string;
    thirdChoiceEndTime: string;
    email: string;
    phone1: string;
    phone2: string;
    phone3: string;
    message?: string;
}): string[] {
    const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    const relationship = body.relationship === 'その他'
        ? body.relationshipOther || 'その他'
        : body.relationship;
    const phone = `${body.phone1}-${body.phone2}-${body.phone3}`;

    return [
        timestamp,
        `${body.studentLastName} ${body.studentFirstName}`,
        `${body.studentLastNameKana} ${body.studentFirstNameKana}`,
        `${body.parentLastName} ${body.parentFirstName}`,
        `${body.parentLastNameKana} ${body.parentFirstNameKana}`,
        relationship,
        body.grade,
        body.schoolName || '',
        body.email,
        phone,
        `${body.firstChoiceDate} ${body.firstChoiceStartTime}〜${body.firstChoiceEndTime}`,
        `${body.secondChoiceDate} ${body.secondChoiceStartTime}〜${body.secondChoiceEndTime}`,
        `${body.thirdChoiceDate} ${body.thirdChoiceStartTime}〜${body.thirdChoiceEndTime}`,
        body.message || '',
    ];
}
