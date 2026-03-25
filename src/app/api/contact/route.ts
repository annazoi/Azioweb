import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, email, phone, message } = await req.json();

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `New message from ${firstName} ${lastName}`,
            html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
					<h2 style="color: #818cf8; margin-bottom: 24px;">📬 New Contact Form Submission</h2>
					<table style="width: 100%; border-collapse: collapse;">
						<tr style="border-bottom: 1px solid #1e293b;">
							<td style="padding: 12px 0; color: #94a3b8; font-weight: bold; width: 140px;">First Name</td>
							<td style="padding: 12px 0;">${firstName}</td>
						</tr>
						<tr style="border-bottom: 1px solid #1e293b;">
							<td style="padding: 12px 0; color: #94a3b8; font-weight: bold;">Last Name</td>
							<td style="padding: 12px 0;">${lastName}</td>
						</tr>
						<tr style="border-bottom: 1px solid #1e293b;">
							<td style="padding: 12px 0; color: #94a3b8; font-weight: bold;">Email</td>
							<td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #818cf8;">${email}</a></td>
						</tr>
						<tr style="border-bottom: 1px solid #1e293b;">
							<td style="padding: 12px 0; color: #94a3b8; font-weight: bold;">Phone</td>
							<td style="padding: 12px 0;">${phone || '—'}</td>
						</tr>
						<tr>
							<td style="padding: 12px 0; color: #94a3b8; font-weight: bold; vertical-align: top;">Message</td>
							<td style="padding: 12px 0; white-space: pre-wrap;">${message}</td>
						</tr>
					</table>
				</div>
			`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email send error:', error);
        return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }
}
