import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'mdbaizedhasans@gmail.com',
      pass: 'jn7jnAPss4f63QBp6D',
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'mdbaizedhasans@gmail.com', // sender address
    to: 'mdsadhin488@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });
};
