import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { appendRowToSheet, formatCounselingData } from '@/lib/sheets';

export async function POST(request: Request) {
  // Initialize Resend client here to avoid build-time errors
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();

    // 電話番号のフォーマット
    const formatPhone = (phone1: string, phone2: string, phone3: string) => {
      return `${phone1}-${phone2}-${phone3}`;
    };

    // メール本文（HTML）
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h2 { color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background-color: #f3f4f6; padding: 12px; text-align: left; font-weight: bold; width: 180px; border: 1px solid #e5e7eb; }
          td { padding: 12px; border: 1px solid #e5e7eb; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>【学習相談】申し込みがありました</h2>
          
          <table>
            <tr>
              <th>生徒氏名</th>
              <td>${body.studentLastName} ${body.studentFirstName}</td>
            </tr>
            <tr>
              <th>生徒氏名（かな）</th>
              <td>${body.studentLastNameKana} ${body.studentFirstNameKana}</td>
            </tr>
            <tr>
              <th>保護者氏名</th>
              <td>${body.parentLastName} ${body.parentFirstName}</td>
            </tr>
            <tr>
              <th>保護者氏名（かな）</th>
              <td>${body.parentLastNameKana} ${body.parentFirstNameKana}</td>
            </tr>
            <tr>
              <th>学年</th>
              <td>${body.grade}</td>
            </tr>
            <tr>
              <th>学校名</th>
              <td>${body.schoolName || '（記載なし）'}</td>
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td>${body.email}</td>
            </tr>
            <tr>
              <th>電話番号</th>
              <td>${formatPhone(body.phone1, body.phone2, body.phone3)}</td>
            </tr>
          </table>

          <h3 style="color: #1e3a8a; margin-top: 30px;">希望日時</h3>
          <table>
            <tr>
              <th>第1希望</th>
              <td>${body.firstChoiceDate} ${body.firstChoiceStartTime}〜${body.firstChoiceEndTime}</td>
            </tr>
            <tr>
              <th>第2希望</th>
              <td>${body.secondChoiceDate} ${body.secondChoiceStartTime}〜${body.secondChoiceEndTime}</td>
            </tr>
            <tr>
              <th>第3希望</th>
              <td>${body.thirdChoiceDate} ${body.thirdChoiceStartTime}〜${body.thirdChoiceEndTime}</td>
            </tr>
          </table>

          <h3 style="color: #1e3a8a; margin-top: 30px;">ご相談内容</h3>
          <table>
            <tr>
              <td>${body.message || '（記載なし）'}</td>
            </tr>
          </table>

          <div class="footer">
            送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
          </div>
        </div>
      </body>
      </html>
    `;

    // 管理者への通知メール
    const notificationData = await resend.emails.send({
      from: 'LEFY LP <notice@send.lefy.jp>',
      to: process.env.NOTIFICATION_EMAIL || 'notice@lefy.jp',
      subject: '【LEFY LP】学習相談の申し込み',
      html: htmlContent,
    });

    console.log('Notification email sent:', notificationData);

    // 申込者への自動返信メール
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; line-height: 1.8; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h2 { color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; }
          .box { background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>お問い合わせありがとうございます</h2>
          
          <p>${body.parentLastName} ${body.parentFirstName} 様</p>
          
          <p>
            この度はLEFYにお問い合わせいただき、誠にありがとうございます。<br>
            以下の内容で学習相談の申し込みを受け付けました。
          </p>

          <div class="box">
            <strong>■ 受付内容</strong><br>
            生徒氏名: ${body.studentLastName} ${body.studentFirstName} 様<br>
            学年: ${body.grade}<br>
            第1希望日時: ${body.firstChoiceDate} ${body.firstChoiceStartTime}〜${body.firstChoiceEndTime}
          </div>

          <p>
            担当者より2営業日以内にご連絡させていただきます。<br>
            今しばらくお待ちくださいませ。
          </p>

          <div class="footer">
            ━━━━━━━━━━━━━━━━━━<br>
            <strong>LEFY 個別指導塾</strong><br>
            電話: 045-620-9150<br>
            メール: info@lefy.jp<br>
            ━━━━━━━━━━━━━━━━━━
          </div>
        </div>
      </body>
      </html>
    `;

    const autoReplyData = await resend.emails.send({
      from: 'LEFY <info@send.lefy.jp>',
      to: body.email,
      subject: '【LEFY】学習相談の申し込みを受け付けました',
      html: autoReplyHtml,
    });

    console.log('Auto-reply email sent:', autoReplyData);

    // Google Sheetsに保存
    const sheetId = process.env.COUNSELING_SHEET_ID;
    console.log('[API] Checking Google Sheets save...', {
      hasSheetId: !!sheetId,
      sheetIdValue: sheetId,
      sheetIdLength: sheetId?.length || 0,
      sheetIdTrimmed: sheetId?.trim()
    });

    if (sheetId) {
      console.log('[API] Formatting data for Google Sheets...');
      const rowData = formatCounselingData(body);
      console.log('[API] Calling appendRowToSheet...');
      await appendRowToSheet(sheetId.trim(), rowData);
      console.log('[API] Finished appendRowToSheet call');
    } else {
      console.log('[API] No COUNSELING_SHEET_ID found, skipping Google Sheets save');
    }

    return NextResponse.json(
      { success: true, message: 'お申し込みありがとうございます' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing counseling form:', error);
    return NextResponse.json(
      { success: false, message: '送信に失敗しました' },
      { status: 500 }
    );
  }
}
