import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('SMTP_HOST'),
      port: Number(this.config.get<string>('SMTP_PORT')),
      secure: false,
      auth: {
        user: this.config.get<string>('SMTP_USER'),
        pass: this.config.get<string>('SMTP_KEY'),
      },
    });
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const verificationUrl = `${this.config.get<string>('APP_URL')}/auth/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: `"${this.config.get<string>('FROM_NAME')}" <${this.config.get<string>('FROM_EMAIL')}>`,
      to,
      subject: 'Xác thực email của bạn - How Play',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Xác thực email</h2>
          <p>Cảm ơn bạn đã đăng ký tài khoản How Play!</p>
          <p>Vui lòng click vào nút bên dưới để xác thực email:</p>
          <a href="${verificationUrl}"
             style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px;">
            Xác thực email
          </a>
          <p>Hoặc copy link này vào trình duyệt:</p>
          <p>${verificationUrl}</p>
          <p>Link hết hạn sau 24 giờ.</p>
        </div>
      `,
    });
  }
}
