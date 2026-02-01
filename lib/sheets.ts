import { google } from 'googleapis';

// サービスアカウント認証（Base64エンコードされた認証情報から）
const getCredentials = () => {
    const base64Credentials = process.env.GOOGLE_CREDENTIALS_BASE64;
    if (!base64Credentials) {
        throw new Error('GOOGLE_CREDENTIALS_BASE64 environment variable is not set');
    }
    const jsonString = Buffer.from(base64Credentials, 'base64').toString('utf8');
    return JSON.parse(jsonString);
};

// 遅延初期化（ビルド時エラー回避）
let sheetsClient: ReturnType<typeof google.sheets> | null = null;

const getSheets = () => {
    if (!sheetsClient) {
        const auth = new google.auth.GoogleAuth({
            credentials: getCredentials(),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        sheetsClient = google.sheets({ version: 'v4', auth });
    }
    return sheetsClient;
};

/**
 * スプレッドシートに行を追加する
 */
export async function appendRowToSheet(spreadsheetId: string, rowData: string[]) {
    try {
        console.log('[Sheets] Appending row to sheet:', spreadsheetId);

        const response = await getSheets().spreadsheets.values.append({
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
    firstChoiceTimeSlot: string;
    secondChoiceDate: string;
    secondChoiceTimeSlot: string;
    thirdChoiceDate: string;
    thirdChoiceTimeSlot: string;
    subject?: string;
    lessonContentPreference?: string;
    lefyDecideDetails?: string;
    specifyDetails?: string;
    email: string;
    phone1: string;
    phone2: string;
    phone3: string;
    message?: string;
    availableSchedule?: { [key: string]: boolean };
    feedback?: string;
}): string[] {
    const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    const phone = `${body.phone1}-${body.phone2}-${body.phone3}`;

    // 通塾可能時間帯のフォーマット
    const formatAvailableSchedule = (scheduleObj: { [key: string]: boolean } | undefined) => {
        if (!scheduleObj || Object.keys(scheduleObj).length === 0) return '';
        const selectedSlots = Object.entries(scheduleObj)
            .filter(([_, isSelected]) => isSelected)
            .map(([slotId]) => slotId.replace('schedule-', ''))
            .join(', ');
        return selectedSlots || '';
    };

    return [
        timestamp,  // A列: 申込時刻
        body.studentLastName,  // B列: 生徒姓
        body.studentFirstName,  // C列: 生徒名
        body.studentLastNameKana,  // D列: 生徒姓(かな)
        body.studentFirstNameKana,  // E列: 生徒名(かな)
        body.parentLastName,  // F列: 保護者姓
        body.parentFirstName,  // G列: 保護者名
        body.parentLastNameKana,  // H列: 保護者姓(かな)
        body.parentFirstNameKana,  // I列: 保護者名(かな)
        body.grade,  // J列: 学年
        body.schoolName || '',  // K列: 学校名
        body.email,  // L列: メールアドレス
        phone,  // M列: 電話番号
        body.subject || '',  // N列: 希望科目
        body.lessonContentPreference || '',  // O列: 授業内容
        formatAvailableSchedule(body.availableSchedule),  // P列: 連絡可能時間帯
        body.feedback || '',  // Q列: フィードバック
        body.firstChoiceDate,  // R列: 第1希望日
        body.firstChoiceTimeSlot || '',  // S列: 第1希望時間
        body.secondChoiceDate,  // T列: 第2希望日
        body.secondChoiceTimeSlot || '',  // U列: 第2希望時間
        body.thirdChoiceDate,  // V列: 第3希望日
        body.thirdChoiceTimeSlot || '',  // W列: 第3希望時間
        body.message || '',  // X列: その他要望
        body.lefyDecideDetails || body.specifyDetails || '',  // Y列: 授業内容詳細
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
    const phone = `${body.phone1}-${body.phone2}-${body.phone3}`;

    return [
        timestamp,  // A列: 申込時刻
        body.studentLastName,  // B列: 生徒姓
        body.studentFirstName,  // C列: 生徒名
        body.studentLastNameKana,  // D列: 生徒姓(かな)
        body.studentFirstNameKana,  // E列: 生徒名(かな)
        body.parentLastName,  // F列: 保護者姓
        body.parentFirstName,  // G列: 保護者名
        body.parentLastNameKana,  // H列: 保護者姓(かな)
        body.parentFirstNameKana,  // I列: 保護者名(かな)
        body.grade,  // J列: 学年
        body.schoolName || '',  // K列: 学校名
        body.email,  // L列: メールアドレス
        phone,  // M列: 連絡先番号
        body.firstChoiceDate,  // N列: 第1希望日
        `${body.firstChoiceStartTime}〜${body.firstChoiceEndTime}`,  // O列: 第1希望時間
        body.secondChoiceDate,  // P列: 第2希望日
        `${body.secondChoiceStartTime}〜${body.secondChoiceEndTime}`,  // Q列: 第2希望時間
        body.thirdChoiceDate,  // R列: 第3希望日
        `${body.thirdChoiceStartTime}〜${body.thirdChoiceEndTime}`,  // S列: 第3希望時間
        body.message || '',  // T列: 相談内容
    ];
}
