"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();
const Nodemailer = async ({ receipients, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", //smtp.forwardemail.net
    //   service: "Outlook365",
    // host: "smtp.office365.com",
    port: 587, //587 995 993 465
    secure: false,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Fidelity Tradex" <${process.env.NODEMAILER_EMAIL}>`, // sender address
      to: receipients, // list of receivers
      subject: subject, // Subject line
      //text: "Hello world?", // plain text body
      html: message, // html body
    });

    return "success";
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }

  main().catch(console.error);
};

module.exports = Nodemailer;
