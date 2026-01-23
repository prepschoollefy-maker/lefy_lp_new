import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, grade, message } = body;

        // メール送信のログ（実際のメール送信は後で実装）
        console.log('Counseling form submission:', {
            name,
            email,
            phone,
            grade,
            message,
            timestamp: new Date().toISOString(),
        });

        // 実際のメール送信機能は、nodemailerやResendなどのサービスを使用して実装する必要があります
        // 以下は実装例のコメントです：
        /*
        const nodemailer = require('nodemailer');
        
        const transporter = nodemailer.createTransport({
          // メールサーバーの設定
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
    
        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: 'info@lefy.jp',
          subject: '【LEFY LP】学習カウンセリング申し込み',
          text: `
    学習カウンセリングの申し込みがありました。
    
    ■ お名前
    ${name}
    
    ■ メールアドレス
    ${email}
    
    ■ 電話番号
    ${phone}
    
    ■ 学年
    ${grade}
    
    ■ ご相談内容
    ${message || '（記載なし）'}
    
    送信日時: ${new Date().toLocaleString('ja-JP')}
          `,
          html: `
            <h2>学習カウンセリングの申し込み</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px; background-color: #f5f5f5; font-weight: bold; width: 150px;">お名前</td>
                <td style="padding: 12px;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px; background-color: #f5f5f5; font-weight: bold;">メールアドレス</td>
                <td style="padding: 12px;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px; background-color: #f5f5f5; font-weight: bold;">電話番号</td>
                <td style="padding: 12px;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px; background-color: #f5f5f5; font-weight: bold;">学年</td>
                <td style="padding: 12px;">${grade}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background-color: #f5f5f5; font-weight: bold; vertical-align: top;">ご相談内容</td>
                <td style="padding: 12px;">${message || '（記載なし）'}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">送信日時: ${new Date().toLocaleString('ja-JP')}</p>
          `,
        });
        */

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
