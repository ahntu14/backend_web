import nodemailer from 'nodemailer';
import { env } from '../config/environment.js';

export const sendRegisterEmail = async (email) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: env.MAIL_USERNAME,
            pass: env.MAIL_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: `"Phạm Anh Tú" <${env.MAIL_USERNAME}>`,
        to: email,
        subject: 'Tạo tài khoản thành công',
        text: 'Chúc mừng bạn đã đăng ký tài khoản thành công, hãy truy cập website để sử dụng dịch vụ',
        html: '<b>Chúc mừng bạn đã đăng ký tài khoản thành công, hãy truy cập website để sử dụng dịch vụ</b>',
    });

    return info;
};

export const rePassWord = async (email) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: env.MAIL_USERNAME,
            pass: env.MAIL_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: `"Phạm Anh Tú" <${env.MAIL_USERNAME}>`,
        to: email,
        subject: 'Tạo lại mật khẩu',
        text: 'Mật khẩu mới của bạn là 123456789, hãy thay đổi mật khẩu để khi sử dụng.',
        html: '<b>Mật khẩu mới của bạn là 123456789, hãy thay đổi mật khẩu để khi sử dụng.</b>',
    });

    return info;
};

export const SuccessEmail = async (email) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: env.MAIL_USERNAME,
            pass: env.MAIL_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: `"Phạm Anh Tú" <${env.MAIL_USERNAME}>`,
        to: email,
        subject: 'Tạo lại mật khẩu thành công',
        text: 'Tạo lại mật khẩu thành công, hãy đăng nhập để sử dụng',
        html: '<b>Tạo lại mật khẩu thành công, hãy đăng nhập để sử dụng</b>',
    });

    return info;
};
