import nodemailer from 'nodemailer';

// const Transporter = nodemailer.createTransport({
//   host: 'smtp.mail.ru',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'dendon1234@mail.ru',
//     pass: 'YYJXqBHgn2A1D53yjiXd',
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

const Transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'denis25792804',
    pass: 'apoboqbbcxpmvskc',
  },
});

export default {
  async sendEmail(
    destinationEmail: string,
    mailSubject: string,
    mailHtml: string
  ): Promise<boolean> {
    const mailOptions = {
      from: '"VLAD" <denis25792804@yandex.com>',
      to: destinationEmail,
      subject: mailSubject,
      html: mailHtml,
    };

    return new Promise((res, rej) => {
      Transporter.sendMail(mailOptions, (err) => {
        console.log(err);
        res(!!!err);
      });
    });
  },
};
