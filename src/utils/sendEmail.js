import nodemailer from 'nodemailer';  
import {env} from '../config/environment.js'

const sendEmail = async (email) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.MAIL_USERNAME,
      pass: env.MAIL_PASSWORD
    },
  });

  let info = await transporter.sendMail({
    from: `"Phạm Anh Tú" <${env.MAIL_USERNAME}>`, // sender address
    to: email, // list of receivers
    subject: "Tạo tài khoản thành công", // Subject line
    text: "Chúc mừng bạn đã đăng ký tài khoản thành công, hãy truy cập MagicPost để sử dụng dịch vụ", // plain text body
    html: "<b>Chúc mừng bạn đã đăng ký tài khoản thành công, hãy truy cập MagicPost để sử dụng dịch vụ</b>", // html body
  });

  return info
}

export default sendEmail