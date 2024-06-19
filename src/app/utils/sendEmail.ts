import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'mdbaizedhasans@gmail.com',
      pass: 'inks zdex ecso vofm',
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'mdbaizedhasans@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 30 minutes', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
